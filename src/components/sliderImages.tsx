import React, { useState } from "react";
import type { Data } from "./types";
import { FaMinus, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const SliderImages = ({ data }: Data) => {
  const filteredArticles = data.filter((item) => {
    return (
      item.author &&
      item.description &&
      item.createdAt &&
      item.title &&
      item.url &&
      item.image
    );
  });


  console.log(filteredArticles)

  const [expandedIndex, setExpandedIndex] = useState(0);

  const handleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? 0 : index);
  };

  return (
    <section className="h-[600px] text-white flex flex-col rounded-2xl my-[100px] container relative overflow-hidden">
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-cover">
        <img
          src={filteredArticles[expandedIndex].image}
          alt={filteredArticles[0].title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70  py-10">
          <h1 className="text-4xl font-blog pl-10 pr-3  text-start relative w-fit    ">Blogs
            <span className="w-2 h-2 absolute bg-white right-0 bottom-2 rounded-full"></span>
          </h1>
          <div className="flex justify-between gap-5 py-10 px-5">
            {filteredArticles.slice(0, 3).map((item, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col gap-5 border-r-2 px-5"
                initial={{ width: "100%" }}
                animate={{ width: expandedIndex === idx ? "100%" : "60%" }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-white border-2 px-4 py-2 rounded-full w-fit">
                  {item.author}
                </p>
                <h1
                  className={`font-bebas text-white text-3xl ${
                    expandedIndex === idx ? "text-3xl " : ""
                  }`}
                >
                  {item.title}
                </h1>
                {expandedIndex === idx && (
                  <p className="text-md font-blog text-white text-md">
                    {item.description}
                  </p>
                )}
                <button
                  onClick={() => handleExpand(idx)}
                  className={`h-12 w-12 rounded-full bg-gray-200/15 text-center items-center flex justify-center
                      `}
                >
                  {expandedIndex === idx ? <FaMinus /> : <FaPlus />}
                </button>
              </motion.div>
            ))}
            <div className="absolute bottom-10 left-10 space-x-2">
            <button className="text-4xl font-bebas  text-white">
                Astro Blog
            </button>
                <button  className=" rounded-full bg-white right-0   w-4 h-4"></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderImages;
