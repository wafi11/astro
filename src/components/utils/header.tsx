import React, { Fragment, useEffect, useState } from "react";
import "../../styles/global.css";
import { motion } from "framer-motion";
import { IoSearch } from "react-icons/io5";
import { FaBars, FaTimes } from "react-icons/fa";
import { Category } from "../banner/BannerTrending";
import Search from "./Search";
import useUserProfile from "../../layouts/classProfile";

const data = [
  { nama: "Home", link: "/home" },
  {
    nama: "Category",
    link: "/category",
    subMenu: [
      { nama: Category.national },
      { nama: Category.politics },
      { nama: Category.health },
      { nama: Category.sports },
      { nama: Category.world },
    ],
  },
  { nama: "Trending", link: "/trending" },
  { nama: "Popular", link: "/popular" },
];

const handleLogout = async () => {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
    });
    if (!res.ok) {
      throw new Error("Internal Serser Erorr");
    }
    alert("Berhasil");
  } catch {
    console.log("Internal Server Errorr");
  }
};

const Headers = () => {
  const [currentPath, setCurrentPath] = useState("");
  const [showing, setShowing] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { userProfile } = useUserProfile();

  const handleClick = () => {
    setShowing((prev) => !prev);
  };

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const borderVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <header className="fixed w-full z-50 bg-gray-100 py-3 text-black">
      <motion.div
        className="flex justify-between items-center px-10 "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex items-center text-xl space-x-20 bebas font-bold text-center ">
          <div className="flex gap-2 text-4xl">
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <FaTimes size={24} />
              ) : (
                <FaBars size={24} className="mb-2" />
              )}
            </button>
            <motion.h1 className="" variants={itemVariants}>
              Astro
            </motion.h1>
            <motion.h1 className="" variants={itemVariants}>
              Blog
            </motion.h1>
          </div>
          <div
            className={`md:flex items-center gap-3 ${
              mobileMenuOpen ? "block" : "hidden"
            }`}
          >
            {data.map((item) => (
              <motion.div
                key={item.link}
                className="relative text-2xl py-2  text-center w-fit  bebas hidden md:block "
                transition={{ duration: 0.2 }}
                variants={itemVariants}
                onMouseEnter={() => setHoveredItem(item.link)}
                onMouseLeave={() => setHoveredItem(null)}
              >
               <motion.a
                    href={item.link}
                    variants={borderVariants}
                    className={`block w-full px-4 py-2 hover:border-b-2  hover:ring-b-black ${
                      currentPath === item.link ? "bg-[#BBE9FF]" : ""
                    }`}
                  >
                    {item.nama}
                  </motion.a>
                {hoveredItem === item.link && item.subMenu && (
                  <div className="absolute shadow-md w-full flex flex-col rounded-md  z-50 left-0">
                    {item.subMenu.map((subItem) => (
                      <a
                        key={subItem.nama}
                        href={`category?cat=${subItem.nama}`}
                        className="px-4 py-2 bg-gray-200"
                      >
                        {subItem.nama}
                      </a>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:block hidden">
          <Search />
        </div>
        {userProfile ? (
          <button
            className="rounded-full w-10 h-10 ring-2 ring-gray-200 shadow-xl"
            onClick={handleClick}
          >
            <img
              src={"/src/assets/placeholder.jpg"}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </button>
        ) : (
          <a
            href="/"
            className="rounded-md px-4 py-2 border-[3px] border-black hover:bg-black hover:text-white w-fit text-xl font-bebas items-center"
          >
            Login
          </a>
        )}
        {showing && (
          <div className="absolute top-16 w-40 bg-gray-400 shadow-md rounded-md z-50 right-0">
            <div className="p-4 grid gap-4 font-bebas">
              <a
                href="/profile"
                className="hover:bg-gray-200 hover:border-gray-200 border-2 bg-gray-300 border-gray-200 rounded-md px-1"
              >
                User Profile
              </a>
              <button
                onClick={handleLogout}
                className="hover:bg-gray-200 hover:border-gray-200 border-2 bg-gray-300 border-gray-200 rounded-md px-1"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </motion.div>
      {mobileMenuOpen && (
        <Fragment>
          <div
            className="fixed bg-black/50 inset-0 z-10 w-full h-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          ></div>
          <motion.div
            className="fixed top-0 left-0 w-[300px] h-full bg-gray-100 z-40 p-4 md:w-[400px]"
            initial={{ width: 0 }}
            animate={{ width: "300px", height: "100vh" }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="uppercase p-2 text-3xl font-bebas">Astro blog</h1>
            <Search />
            <div className="flex flex-col leading-none py-4">
              {data.map((item) => (
                <motion.div
                  key={item.link}
                  className="relative text-xl text-center w-full bebas"
                  whileHover={{ background: "#BBE9FF" }}
                  onMouseEnter={() => setHoveredItem(item.link)}
                  onMouseLeave={() => setHoveredItem(null)}
                  transition={{ duration: 0.2 }}
                  variants={itemVariants}
                >
                  <motion.a
                    href={item.link}
                    variants={borderVariants}
                    className={`block w-full px-4 py-2 border-2 border-blue-200 ${
                      currentPath === item.link ? "bg-[#BBE9FF]" : ""
                    }`}
                  >
                    {item.nama}
                  </motion.a>
                  {hoveredItem === item.link && item.subMenu && (
                    <div className="mt-2 z-10">
                      {item.subMenu.map((subItem) => (
                        <a
                          key={subItem.nama}
                          href={`category?cat=${subItem.nama}`}
                          className="block px-4 py-2 hover:bg-gray-200"
                        >
                          {subItem.nama}
                        </a>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </Fragment>
      )}
    </header>
  );
};

export default Headers;
