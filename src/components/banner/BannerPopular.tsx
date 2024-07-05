import React from 'react'
import { motion } from 'framer-motion'
import type { Data } from '../types';

const BannerPopular = ({ data }: Data) => {
    const filteredArticles = data.filter((item) => {
        return item.author && item.description && item.createdAt && item.title && item.url && item.image;
    });

    return (
        <section className="mb-[50px] bg-[#EEEDEB] h-screen  w-full text-[#2D2D2D] overflow-hidden ">
            <div className="px-10 py-5 grid grid-cols-6 gap-4 items-center h-full">
                <motion.div 
                    className='col-span-3 w-full flex flex-col gap-5 font-bebas '
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className='font-blog text-xl '>{filteredArticles[0].author}</h3>
                    <p className='font-bold text-3xl '>{filteredArticles[0].title}</p>
                    <p className='font-blog text-xl '>{filteredArticles[0].description}</p>
                    <motion.img 
                        src={filteredArticles[0].image} 
                        alt="/" 
                        className='w-full h-[400px] object-cover'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    />
                </motion.div>
                <div className='grid gap-2 col-span-3 items-center'>
                    <motion.h1 
                        className='text-xl font-bold font-blog '
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Recent Post
                    </motion.h1>
                    {
                        filteredArticles.slice(1, 3).map((item, index) => (
                            <motion.div 
                                key={item.title} 
                                className='border-t-2 border-[#2D2D2D] flex justify-between '
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 * (index + 1), duration: 0.5 }}
                            >
                                <div className='grid gap-4 pt-2'>
                                    <h4 className='text-md font-blog'>{item.author}</h4>
                                    <h4 className='text-3xl font-bebas'>{item.title}</h4>
                                    <h4 className='text-md font-blog'>{item.description}</h4>
                                </div>
                                <motion.img 
                                    src={item.image} 
                                    alt="/" 
                                    className='w-[200px] h-[100px] pt-2'
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 * (index + 1), duration: 0.5 }}
                                />
                            </motion.div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default BannerPopular;
