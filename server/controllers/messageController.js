import axios from 'axios';
import Chat from '../models/Chat.js';
import User from '../models/User.js';
import imagekit from '../configs/imageKit.js';
import openai from '../configs/openai.js';


// Text-based AI Chat message Controller
export const textMessageController = async (req, res) => {

    try {

        const userId = req.user._id;

        //check Credits
        if (req.user.credits < 1) {

            return res.json({ success: false, message: "You don't have enough credits to use this feature!" });
        }


        const { chatId, prompt } = req.body;

        const chat = await Chat.findOne({ userId, _id: chatId });
        chat.messages.push({
            role: "user", content: prompt, timestamp: Date.now(),
            isImage: false
        });

        const { choices } = await openai.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const reply = { ...choices[0].message, timestamp: Date.now(), isImage: false }
        res.json({ success: true, reply });

        chat.messages.push(reply);
        await chat.save();
        await User.updateOne({ _id: userId }, { $inc: { credits: -1 } });


    } catch (error) {

        res.json({ success: false, message: error.message });

    }

}
// Image-based AI Chat message Controller
export const imageMessageController = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check Credits
        if (req.user.credits < 2) {
            return res.json({
                success: false,
                message: "You don't have enough credits to use this feature!",
            });
        }

        const { prompt, chatId, isPublished } = req.body;

        // Find chat
        const currentChat = await Chat.findOne({ userId, _id: chatId });
        if (!currentChat) {
            return res.json({ success: false, message: "Chat not found" });
        }

        // Push user message
        currentChat.messages.push({
            role: "user",
            content: prompt,
            timestamp: Date.now(),
            isImage: false,
        });

        // Encode prompt
        const encodedPrompt = encodeURIComponent(prompt);

        // Construct ImageKit AI generation URL
        const generatedImageURL = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/convogpt/${Date.now()}.png?tr=w-800,h-800`;

        // Trigger generation
        const aiImageResponse = await axios.get(generatedImageURL, {
            responseType: "arraybuffer",
        });

        // Check if response is a real image
        if (!aiImageResponse.headers['content-type'].includes('image')) {
            return res.json({
                success: false,
                message: "Generated content is not a valid image",
            });
        }

        // Convert to Base64
        const base64Image = Buffer.from(aiImageResponse.data).toString('base64');

        // Upload to ImageKit
        const uploadResponse = await imagekit.upload({
            file: base64Image,
            fileName: `${Date.now()}.png`,
            folder: "quickgpt",
            useUniqueFileName: true,
            isBase64: true, // Important: tells ImageKit it's Base64
        });

        // Create reply
        const reply = {
            role: "assistant",
            content: uploadResponse.url,
            timestamp: Date.now(),
            isImage: true,
            isPublished,
        };

        // Respond to user
        res.json({ success: true, reply });

        // Save to chat
        currentChat.messages.push(reply);
        await currentChat.save();

        // Deduct user credits
        await User.updateOne({ _id: userId }, { $inc: { credits: -2 } });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


//API to get published images
export const getPublishedImages = async (req, res) => {

    try {

        const publishedImages = await Chat.aggregate([

            { $unwind: "$messages" },
            {
                $match: {
                    "messages.isImage": true,
                    "messages.isPublished": true
                }
            },
            {
                $project: {
                    _id: 0,
                    imageUrl: "$messages.content",
                    userName: "$userName"
                }
            }


        ]);

        res.json({ success: true, images: publishedImages.reverse() });


    } catch (error) {

        return res.json({ success: false, message: error.message });
    }

}