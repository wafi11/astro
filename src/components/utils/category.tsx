import React from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { motion } from 'framer-motion';

const topic = [
  {
    "nama": "apple",
    "image": "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBob25lfGVufDB8fDB8fHww"
  },
  {
    "nama": "microsoft",
    "image": "https://images.unsplash.com/photo-1530133532239-eda6f53fcf0f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWljcm9zb2Z0fGVufDB8fDB8fHww"
  },
  {
    "nama": "bitcoin",
    "image": "https://images.unsplash.com/photo-1519162584292-56dfc9eb5db4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Yml0Y29pbnxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    "nama": "tesla",
    "image": "https://images.unsplash.com/photo-1620891549027-942fdc95d3f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVzbGF8ZW58MHx8MHx8fDA%3D"
  },
  {
    "nama": "samsung",
    "image": "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "nama": "google",
    "image": "https://images.unsplash.com/photo-1616499452581-cc7f8e3dd3c9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Z29vZ2xlfGVufDB8fDB8fHww"
  },
];

const Category = () => {
  return (
    <div className="w-full text-start pt-[100px] items-center container py-10 gap-5">
      <h1 className="text-4xl font-bebas py-5">Explore Our Topics</h1>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-2"
        >
          {topic.map((item, index) => (
            <div key={index} className="bg-gray-200 w-full flex flex-col p-4  group h-[300px] rounded-xl">
              <h3 className="font-bebas font-bold text-2xl items-center text  uppercase ">
                {item.nama}
              </h3>
              <button 
                className=" " >
                  <a href={`/explore?query=${item.nama}`} className='flex blog font-bold  items-center gap-4'>
                Read Now <FaArrowRight className='group-hover:rotate-90 transition duration-300 focus:rotate-90'/>
                  </a>
              </button>
              <div className="flex-grow flex items-end ">
                <img src={item.image} alt={item.nama} className="h-[150px] w-full object-cover rounded-xl" />
              </div>
            </div>
          ))}
        </motion.div>
    </div>
  );
};

export default Category;


