import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../lib/Config';
import { actions } from 'astro:actions';

type FormType = {
    author: string,
    image: File | null,
    category: string,
    title: string,
    description: string,
}

interface Props {
    initialData? : FormType
    id? : string
}

const FormBlogClient = ({id,initialData} : Props) => {


    const [formData, setFormData] = useState({
        author: '',
        image: null,
        category: '',
        title: '',
        description: '',
    });
    useEffect(() => {
        if (initialData) {
            setFormData(prevData => ({
            ...prevData,
                    author: initialData.author,
                    image: initialData.image,
                    category: initialData.category,
                    title: initialData.title,
                    description: initialData.description,
                }));       }
      }, [initialData,id]);

      console.log(formData)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prevData) => ({
        ...prevData,
        image: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = '';
    if (formData.image) {
      const storageRef = ref(storage, `images/${formData.image.name}`);
      await uploadBytes(storageRef, formData.image);
      imageUrl = await getDownloadURL(storageRef);
    }
    const form = new FormData();
    form.append('author', formData.author);
    form.append('image', imageUrl);
    form.append('category', formData.category);
    form.append('title', formData.title);
    form.append('description', formData.description);
    try {
        let response
        if (id){
            form.append('id', id);
            response = await actions.updateBlog.safe(form);   
        }else {
            response = await actions.blog.safe(form);
        }
        const { data: responseData, error } = response;
        if (responseData) {
          alert(responseData);
        }
        if (error) {
          console.log(error.message);
        }   
     } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen pt-[70px]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl mb-6">{id ? "Update Blog" :  "Create Blog"}</h2>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 mb-2">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 mb-2">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 mb-2">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="Separate categories with commas"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default FormBlogClient;
