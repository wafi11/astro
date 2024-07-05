import type { Data } from "../types";



const ContentMid = ({ data }: Data) => {
  const filteredArticles = data.filter((item) => {
    return item.author  && item.description && item.description && item.title && item.url && item.image
  });
  const images = "https://images.unsplash.com/photo-1612550761236-e813928f7271?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzc2luZXNzfGVufDB8fDB8fHww"
  const slicesData = filteredArticles.slice(0,4)

  return (
<section className="sm:grid-cols-1 md:grid-cols-3 grid lg:grid-cols-5 gap-5 px-10 ">
      <div className="col-span-3 grid grid-cols-1 md:grid-cols-2  h-auto gap-5 pb-[50px] w-full ">
      {slicesData.map((item, index) => (
        <div key={index} className=" border p-2 mt-2 w-full flex flex-col gap-3 shadow-md rounded-[24px] ">
          <img src={item.image || images} alt={item.title} className="w-full h-32 object-cover rounded-[16px] p-1" />
          <h2 className="text-xl font-bold bebas ">{item.title}</h2>
          <p className="text-gray-500">{item.description}</p>
          <p className="text-sm text-gray-400">By {item.author} on {new Date(item.createdAt).toLocaleDateString()}</p>
          <a href={`/blog/${item.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
            Read more
          </a>
          <div className="flex gap-4">
          </div>
        </div>
      ))}
    </div>
      <div className="col-span-3 md:col-span-2 w-full relative bebas px-0 lg:px-8">
            <h3 className="text-4xl py-2 border-y-2 border-black w-full">Most Popular</h3>
            {filteredArticles.slice(4,8).map((item, idx) => (
                <div key={idx} className="p-4 mt-4 flex gap-4">
                    <img src={item.image || images} alt={item.title} className="w-20 h-20 object-cover" />
                    <div className="flex-col flex">
                    <h2 className="text-xl font-medium">{item.title}</h2>
                    <p className="text-sm text-gray-400 tracking-wider">By {item.author} | {new Date(item.createdAt).toLocaleDateString()}</p>
                    <a href={`/blog/${item.id}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                    Read more
                    </a>
                    </div>
                </div>
        ))}
      </div>
      </section>
  );
};

export default ContentMid;
