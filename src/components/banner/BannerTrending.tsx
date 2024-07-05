import React, {  useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import {motion} from 'framer-motion'
import type { Data } from '../types';



export enum Category {
  national = 'national',
  world = 'world',
  crime = 'Crime',
  politics  = 'Politics',
  health = 'Health',
  sports = 'sports',
}

const categories = Object.values(Category);

const BannerTrending = ({ data ,categorys }: Data) => {
  const [index, setIndex] = useState(0);

  const datas = data[index];
  console.log(datas)
  const getNextIndex = () => {
    setIndex((prevIndex) => (prevIndex + 1) % data.length);
  };


  return (
    <div className=" grid grid-cols-5 h-screen w-full relative">
      <div className="col-span-5 md:col-span-2 bg-neutral-900 flex flex-col justify-center items-center px-4 gap-10">
        <div className="space-y-4">
          <p className="text-gray-200 text-md text-left font-blog font-bold flex gap-2 items-center">
            {datas.title}
            <span className="rounded-full bg-gray-300 w-2 h-2"></span>
            <span className="text-md">{datas.category}</span>
          </p>
          <h1 className="text-6xl font-bebas text-gray-400"> {datas.description.length > 100 ? `${datas.description.slice(0, 100)}...` : datas.description}
          </h1>
          <h3 className="text-2xl font-bebas text-gray-600">{datas.category}</h3>
          <a
              href={datas.url || '/'}
              className="rounded-full flex items-center gap-4 w-fit px-4 py-2 font-blog bg-gray-300/45 text-white border-blue-800/15 hover:bg-blue-800/45 hover:border-white/20 border-2"
            >
              Read More 
            </a>        
          </div>
        <div className="flex justify-end w-full">
            <button
              onClick={getNextIndex}
              className="rounded-2xl flex items-center gap-4 w-fit px-4 py-2 font-blog  text-white "
                >
              Next <FaArrowRight />
            </button>
        </div>
      </div>
      <div className="col-span-3 md:block hidden h-screen w-full ">
        <img
          src={datas.image}
          alt={datas.title}
          className="h-full w-full object-cover  -z-10"
        />
      </div>
      <div className='h-[60px] text-black absolute bottom-0 z-10  flex w-full'>
        <div className='container bg-gray-100 rounded-t-xl flex justify-between items-center'>
          <h1 className='text-2xl font-bebas font-bold'>Astro Blogs </h1>
          <div className=" text-black grid-cols-8 grid font-bebas gap-4 items-end place-content-end">
            {categories.map((item) => (
              <motion.div
              key={item}
              className='relative w-full '
            >
              <a
                href={`trending?category=${item}`}
                className=' relative z-50 hover:border-b-4 hover:border-black duration-200'
              >
                {item}
              </a>
            </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerTrending;
