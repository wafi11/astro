import React from 'react'
import type { Data } from '../types'
import { Image } from 'astro:assets'

const Banner = ({data} : Data) => {
  return (
    <div className="pt-[80px] bg-gray-500 h-fit py-5 w-full  grid grid-cols-5">
       {/* <div className="col-span-1 font-bebas text-gray-300 relative h-full">
        <h1 className=" left-0 leading-none text-[210px] h-fit font-bold rotate-90 lg:block hidden">
          EXPLORE
        </h1>
      </div>
    <div className=" text-white container col-span-5 sm:col-span-4 font-bebas relative">
        <h1 className="text-7xl  pt-7 font-bold">
            {data.articles[9].title}
        </h1>
        <p className="text-2xl text-gray-900">{data.articles[9].author}</p>
        <p className="text-2xl">{data.articles[9].description}</p>
        <div className="flex justify-end items-center gap-4 py-4 mt-5 border-y-4 border-gray-300">
          <img src={data.articles[9].urlToImage} className="w-[400px] h-[180px] object-cover " />
          <img src={data.articles[9].urlToImage} className="w-[400px] h-[180px] object-cover sm:block hidden" />
        </div>
    </div> */}
</div>
  )
}

export default Banner
