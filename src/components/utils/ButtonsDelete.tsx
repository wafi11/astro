import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faHeart as solidHeart, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

interface Props {
  commentId?: string | null;
  replyId?: string | null;
}

const deleteUrl = async (id: string, type: string) => {
  try {
    const res = await fetch(`/api/${type}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }) 
    });
    if (!res.ok) {
      throw new Error(`Failed to delete ${type}`);
    }
    const data = await res.json();
    console.log(data)
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const ButtonDelete = ({  commentId, replyId }: Props) => {
  const [state, setState] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      if (commentId) {
        await deleteUrl(commentId, 'comments');
      } else if (replyId) {
        await deleteUrl(replyId, 'reply');
      }
      window.location.reload()
      console.log('Success');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="text-center">
      <button
        className={`py-4 text-lg cursor-pointer border-none rounded ${
          state ? 'text-red-500' : 'text-red-900'
        }`}
        onClick={() => {
          setState(!state);
          handleClick();
        }}
      >
        <FontAwesomeIcon icon={state ? faDeleteLeft : faTrashAlt} />
      </button>
    </div>
  );
};

export default ButtonDelete;
