import React, { useState } from 'react';
import { IoSearchCircle } from 'react-icons/io5';
import { motion } from 'framer-motion';

const Search = () => {
    const [input, setInput] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInput(newValue);
    };

    const handleClick = () => {
        window.location.href = `/search?q=${input}`;
    };

    return (
        <div className='flex items-center w-full md:w-[400px] relative'>
            <input 
                type="text" 
                value={input}
                onChange={handleInputChange} 
                placeholder="Search..."
                className='px-4 py-2 w-full md:w-[500px] rounded-full focus:outline-none' 
            />
            <motion.button 
                className='absolute right-0 text-gray-300'
                whileHover={{ scale: 1.1 }} // Animasi saat hover menggunakan Framer Motion
                whileTap={{ scale: 0.9 }}   // Animasi saat tombol ditekan menggunakan Framer Motion
                onClick={handleClick}
            >
                <IoSearchCircle size={40} />
            </motion.button>
        </div>
    );
}

export default Search;
