import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import useUserProfile from '../../layouts/classProfile';

interface Props {
  commentId: string;
}

const fetchData = async (type : string,commentId: string) => {
  try {
    const res = await fetch(`/api/likes/${type}/${commentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addLike = async (type : string,commentId: string,userId : string) => {
  try {
    const res = await fetch(`/api/likes/${type}/${commentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Id: commentId ,userId}),
    });
    if (!res.ok) {
      throw new Error('Failed to add like');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const removeLike = async (type : string,likeId: string) => {
  try {
    const res = await fetch(`/api/likes/${type}/${likeId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error('Failed to remove like');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};



export const Buttonlike = ({ commentId, }: Props) => {
  const [liked, setLiked] = useState<boolean>(false);
  const { userProfile } = useUserProfile();
  const [likeId, setLikeId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const response = await fetchData('comments',commentId);
      if (response) {
        setLiked(response[0]?.likes || false);
        setLikeId(response[0]?.id || null);
        console.log(response)
      }
    };
    fetchDataAsync();
  }, [commentId]);

  const handleClick = async () => {
    try {
      if (liked) {
        await removeLike('comments',likeId);
      } else {
        const data = await addLike('comments',commentId,userProfile.id);
        setLikeId(data.id)
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  return (
    <div className="p-2 text-center">
      <button
        className={`px-4 py-2 text-lg cursor-pointer border-none rounded ${
          liked ? 'text-red-500' : 'text-gray-500'
        }`}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} />
      </button>
    </div>
  );
};

export const ButtonlikeReply = ({ commentId ,}: Props) => {
  const { userProfile } = useUserProfile();
  const [liked, setLiked] = useState<boolean>(false);
  const [likeId, setLikeId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const response = await fetchData('reply',commentId);
      if (response) {
        setLiked(response[0]?.likes || false);
        setLikeId(response[0]?.id || null);
      }
    };
    fetchDataAsync();
  }, [commentId]);

  const handleClick = async () => {
    try {
      if (liked) {
        await removeLike('reply',likeId);
      } else {
        const data = await addLike('reply',commentId,userProfile.id);
        setLikeId(data.id); 
      }
      setLiked(!liked);
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  return (
    <div className="p-2 text-center">
      <button
        className={`px-4 py-2 text-lg cursor-pointer border-none rounded ${
          liked ? 'text-red-500' : 'text-gray-500'
        }`}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={liked ? solidHeart : regularHeart} />
      </button>
    </div>
  );
};
