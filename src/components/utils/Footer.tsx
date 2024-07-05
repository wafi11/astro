import React, { useEffect} from "react";
import { FaFacebook } from "react-icons/fa";
import Lenis from "lenis";
import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const data = [
  {
    nama: "General",
    sub: [
      { nama: "Home", link: "/" },
      { nama: "About", link: "/about" },
      { nama: "Contact", link: "/contact" },
    ],
  },
  {
    nama: "Blog",
    sub: [
      { nama: "Hot News", link: "/hotnews" },
      { nama: "Trending", link: "/trending" },
      { nama: "Popular", link: "/popular" },
    ],
  },
  {
    nama: "Social Link",
    icons: [
      {
        nama: <FaFacebook aria-label="Facebook" />,
        link: "https://www.facebook.com",
      },
      {
        nama: <FaXTwitter aria-label="Twitter" />,
        link: "https://www.twitter.com",
      },
      {
        nama: <FaInstagram aria-label="Instagram" />,
        link: "https://www.instagram.com",
      },
      {
        nama: <FaLinkedin aria-label="LinkedIn" />,
        link: "https://www.linkedin.com",
      },
    ],
  },
];

const Footer = () => {
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative ">
      <div className="h-[500px] sticky bottom-0">
        <div className="px-8 pt-12 bg-gray-900 w-full flex flex-col justify-between">
          <div className="grid grid-cols-5 gap-10 px-10">
            <div className="flex gap-10 col-span-3">
              {data.slice(0, 2).map((item, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <h3 className="uppercase text-white">{item.nama}</h3>
                  {item.sub.map((subItem, subIdx) => (
                    <a
                      key={subIdx}
                      href={subItem.link}
                      className="text-white hover:underline"
                    >
                      {subItem.nama}
                    </a>
                  ))}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 col-span-2 text-white">
              <h3 className="text-2xl bebas ">
                Astro Blog
              </h3>
              <div className="flex gap-4">
                {data[2].icons.map((item, idx) => (
                  <a key={idx} href={item.link} className="text-white text-2xl">
                    {item.nama}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end mt-10">
            <h1 className="text-[14vw] text-white">Astro Blog</h1>
            <p className="text-white">Copyright &copy; 2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
