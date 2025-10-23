import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets, dummyChats } from '../assets/assets';
import moment from 'moment';

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
    const { chats: contextChats, setSelectedChat, theme, setTheme, user, navigate } = useAppContext();
    const [search, setSearch] = useState('');


    const chats = (contextChats?.length > 0 ? contextChats : dummyChats) || [];

    return (
        <div
            className={`flex flex-col h-screen min-w-72 p-5 dark:bg-gradient-to-b from-[#242124]/30 
      to-[#000000]/30 border-r border-[#ba97db]/30 backdrop-blur-3xl transition-all duration-500
      max-md:absolute left-0 z-10 ${!isMenuOpen ? 'max-md:-translate-x-full' : ''}`}
        >
            <img
                src={theme === 'dark' ? assets.logo_full : assets.logo_full_dark}
                alt='Logo'
                className='w-full max-w-48 cursor-pointer'
                onClick={() => {
                    if (navigate) navigate('/');
                    setIsMenuOpen(false);
                }}
            />

            {/* New Chat Button */}
            <button
                className='flex justify-center items-center w-full py-2 mt-10
        text-white bg-gradient-to-r from-[#3D81F6] to-[#5BC0BE] text-sm rounded-md cursor-pointer'
            >
                <span className='mr-2 text-xl'>+</span>
                New Chat
            </button>

            {/* Search Conversation */}
            <div className='flex items-center gap-2 p-3 mt-4 border border-gray-400 dark:border-white/20 rounded-md'>
                <img src={assets.search_icon} className='w-4 dark:invert' alt='Search' />
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search Conversation'
                    className='text-xs placeholder:text-gray-400 outline-none flex-1'
                />
            </div>

            {/* Recent Chats */}
            {chats.length > 0 && <p className='mt-4 text-sm'>Recent Chats</p>}

            <div className='flex-1 overflow-y-auto mt-3 text-sm space-y-3'>
                {chats
                    .filter((chat) => {
                        const content = chat.messages?.[0]?.content || chat.name || '';
                        return content.toLowerCase().includes(search.toLowerCase());
                    })
                    .map((chat) => (
                        <div
                            key={chat._id}
                            onClick={() => {
                                if (navigate) navigate('/');
                                setSelectedChat(chat);
                                setIsMenuOpen(false);
                            }}
                            className='p-2 px-4 dark:bg-[#57317C]/10 border border-gray-300 dark:border-[#80609F]/15 rounded-md cursor-pointer flex justify-between group'
                        >
                            <div>
                                <p className='truncate w-full'>
                                    {chat.messages?.length > 0 ? chat.messages[0].content.slice(0, 32) : chat.name}
                                </p>
                                <p className='text-xs text-gray-500 dark:text-[#B1A6C0]'>
                                    {chat.updatedAt ? moment(chat.updatedAt).fromNow() : ''}
                                </p>
                            </div>
                            <img
                                src={assets.bin_icon}
                                className='hidden group-hover:block w-4 cursor-pointer dark:invert'
                                alt='Delete'
                            />
                        </div>
                    ))}
            </div>

            {/* Community Images */}
            <div
                onClick={() => {
                    if (navigate) navigate('/community');
                    setIsMenuOpen(false);
                }}
                className='flex items-center gap-2 p-3 mt-6 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-105 transition-all'
            >
                <img src={assets.gallery_icon} className='w-4.5 dark:invert' alt='Gallery' />
                <div className='flex flex-col text-sm'>
                    <p>Community Images</p>
                </div>
            </div>

            {/* Credit Purchase */}
            <div
                onClick={() => {
                    if (navigate) navigate('/credits');
                    setIsMenuOpen(false);
                }}
                className='flex items-center gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-105 transition-all'
            >
                <img src={assets.diamond_icon} className='w-4.5 dark:invert' alt='Credits' />
                <div className='flex flex-col text-sm'>
                    <p>Credits : {user?.credits || 0}</p>
                    <p className='text-xs text-gray-400'>Purchase credits to use Convogpt</p>
                </div>
            </div>

            {/* Dark Mode Toggle */}
            <div className='flex items-center justify-between gap-2 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md'>
                <div className='flex items-center gap-2 text-sm'>
                    <img src={assets.theme_icon} className='w-4 dark:invert' alt='Theme' />
                    <p>Dark mode</p>
                </div>
                <label className='relative inline-flex cursor-pointer'>
                    <input
                        type='checkbox'
                        className='sr-only peer'
                        checked={theme === 'dark'}
                        onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    />
                    <div className='w-9 h-5 bg-gray-400 rounded-full peer-checked:dark:bg-primary transition-all'></div>
                    <span className='absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4'></span>
                </label>
            </div>

            {/* User Account Button */}
            <div className='flex items-center gap-3 p-3 mt-4 border border-gray-300 dark:border-white/15 rounded-md cursor-pointer hover:scale-105 transition-all group'>
                <img src={assets.user_icon} className='w-5 invert dark:invert-0' alt='' />
                <p className='flex-1 text-sm dark:text-primary truncate'>
                    {user ? user.name : 'Login Your account'}
                </p>
                {user && <img src={assets.logout_icon} className='h-5 cursor-pointer invert dark:invert-0' />}
            </div>

            {/* Close Sidebar on mobile */}
            <img
                onClick={() => setIsMenuOpen(false)}
                src={assets.close_icon}
                className='absolute top-3 right-3 w-5 h-5 cursor-pointer md:hidden not-dark:invert'
                alt=''
            />
        </div>
    );
};

export default Sidebar;
