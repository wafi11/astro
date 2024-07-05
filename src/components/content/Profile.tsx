import { useState } from 'react';

interface Props {
  date: string;
}

interface Comment {
  id: string;
  text: string;
  blogId: string;
  createdAt: Date;
}

interface Collection {
  id: string;
  collect: boolean;
  blogId: string;
  blog : {
    title : string,
  }
}

interface Data {
  name: string;
  image: string;
  collections: Collection[];
  comments: Comment[];
}

interface ProfileProps {
  data: Data;
}

const FormatDate = ({ date }: Props) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

  return <span>{formattedDate}</span>;
};

const Profile = ({ data }: ProfileProps) => {
    if(!data){
        return null
    }
  const [activeTab, setActiveTab] = useState<'comments' | 'collections'>('comments');

  const showComments = () => setActiveTab('comments');
  const showCollections = () => setActiveTab('collections');

  return (
    <section className="pt-[70px] h-full w-full container grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="col-span-2 py-5">
        <img
          src={data.image}
          width={200}
          height={200}
          alt="/"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-4 py-5 justify-center">
        <h1 className="text-3xl font-bold font-blog bg-black text-white w-fit px-4 py-2">
          Profile Page
        </h1>
        <p className="text-3xl font-bebas px-4 py-2">name : {data.name}</p>
        <div className="flex gap-4 text-xl font-medium font-bebas">
          <button
            className={`bg-black text-white px-4 py-2 ${activeTab === 'comments' ? 'bg-opacity-75' : ''}`}
            onClick={showComments}
          >
            Comment
          </button>
          <button
            className={`bg-black text-white px-4 py-2 ${activeTab === 'collections' ? 'bg-opacity-75' : ''}`}
            onClick={showCollections}
          >
            Collection
          </button>
        </div>
        <div className="h-[300px] w-full bg-gray-400 duration-300 overflow-y-auto">
          {activeTab === 'comments' &&
            data.comments.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 font-blog text-md bg-gray-200 hover:bg-neutral-400 px-4 py-3"
              >
                <a href={`/blog/${item.blogId}`}>
                  <p>{item.text}</p>
                  <FormatDate date={item.createdAt.toISOString()} />
                </a>
              </div>
            ))}
          {activeTab === 'collections' &&
            data.collections.map((item) => (
              <div
                key={item.id}
                className="flex flex-col  font-blog text-md bg-gray-200 hover:bg-neutral-400 px-4 py-3"
              >
                <a href={`/blog/${item.blogId}`}>
                  <p>Collection Name: {item.blog.title}</p>
                </a>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Profile;
