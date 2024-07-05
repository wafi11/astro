import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {  useEffect, useState } from 'react';
import useUserProfile from '../../layouts/classProfile';

interface Props {
  blogId: string;
}

const addCollection = async (blogId: string, userId: string) => {
  try {
    const res = await fetch(`/api/collections`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ blogId, userId }),
    });
    if (!res.ok) {
      throw new Error('Failed to add to collection');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const removeCollection = async (id: string) => {
  try {
    const res = await fetch(`/api/collections`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) {
      throw new Error('Failed to remove from collection');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const ButtonCollection = ({ blogId }: Props) => {
  const { userProfile } = useUserProfile();
  const [save, setSave] = useState<boolean>(false);
  const [saveId, setSaveId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollectionStatus = async () => {
      try {
        const res = await fetch(`/api/collect/${blogId}`);
        if (res.ok) {
          const data = await res.json();
          setSave(data[0].collect || false);
          setSaveId(data[0].id || null);
        console.log(data)        }
      } catch (error) {
        console.error('Error fetching collection status:', error);
      }
    };

    if (userProfile?.id) {
      fetchCollectionStatus();
    }
  }, [blogId, userProfile]);

  const handleClick = async () => {
    try {
      if (save) {
        await removeCollection(saveId);
      } else {
        const saves = await addCollection(blogId, userProfile.id);
        setSaveId(saves.id)

    }
      setSave(!save);
    } catch (error) {
      console.error('Error updating collection status:', error);
    }
  };

  return (
    <div className="p-2 text-center">
      <button
        className={`px-4 py-2 text-lg cursor-pointer border-none rounded ${
          save ? 'text-red-500' : 'text-gray-900'
        }`}
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faBookmark} />
      </button>
    </div>
  );
};

export default ButtonCollection;
