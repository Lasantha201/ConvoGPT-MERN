import React, { useState, useEffect } from 'react' // ✅ Added useEffect
import { dummyPublishedImages } from '../assets/assets'

const Community = () => {

    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchImages = async () => {
        setImages(dummyPublishedImages)
        setLoading(false)
    }

    useEffect(() => {
        fetchImages()
    }, [])


    if (loading) return <p className='text-center text-gray-600'>Loading...</p>

    return (
        <div className='p-6 pt-12 xl:px-20 w-full mx-auto h-full overflow-y-scroll'>
            <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-[#a8e6e4]'>
                Community Images
            </h2>

            {images.length > 0 ? (
                <div className='flex flex-wrap max-sm:justify-center gap-5'>
                    {images.map((item, index) => (
                        <a
                            key={index}
                            href={item.imageUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='relative group block rounded-lg overflow-hidden border border-gray-200 dark:border-[#299995] shadow-sm hover:shadow-md transition-shadow duration-300'
                        >
                            <img
                                src={item.imageUrl}
                                alt=''
                                className='w-full h-40 md:h-50 2xl:h-62 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out'
                            />
                            <p
                                className='absolute bottom-0 right-0 text-xs bg-black/50 backdrop-blur text-white px-4 py-1 rounded-tl-md opacity-0 group-hover:opacity-100 transition duration-300'
                            >
                                Created by {item.userName}
                            </p>
                        </a>
                    ))}
                </div>
            ) : (
                <p className='text-center text-gray-600 dark:text-[#a8e6e4] mt-10'>
                    No Images available.
                </p>
            )}
        </div>
    )
}

export default Community;
