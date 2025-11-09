'use client';

import { useState, useEffect } from 'react';
import { FaBars } from "react-icons/fa6";
import { X } from 'lucide-react'; // ✅ Lucide X icon
import { usePathname } from "next/navigation"; 
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'About', 'Services', 'Contact', 'Blogs'];

  const getHref = (item) => {
    if (item === "Home") return "/";
    if (item === "Services") return "/#myservscroll";
    return `/${item.toLowerCase()}`;
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled
        ? `bg-[#0b2556] shadow-md ${isHome ? 'pt-[5em]' : 'pt-[1em]'}`
        : `bg-gradient-to-b from-black/70 to-transparent ${isHome ? 'pt-[7em]' : 'pt-[3em]'}`
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-28 flex items-center justify-between">

        {/* PC NAV */}
        <div className="hidden md:flex w-full items-center justify-between">
          <a href="/">
            <img
              src="https://res.cloudinary.com/dn23oe6gg/image/upload/v1762023367/897bba68-1092-4b61-bca9-a5bf4dea9633-removebg-preview_1_aqlphi.png"
              alt="Logo"
              width={scrolled ? 130 : 160}
              height={scrolled ? 90 : 75}
              className="object-contain transition-all duration-300"
            />
          </a>
          <ul className="flex space-x-10 items-center">
            {navItems.map((item) => (
              <li key={item}>
                <a href={getHref(item)} className={`mynavhov font-bold text-lg text-white`}>
                  {item}
                </a>
              </li>
            ))}
            <li>
              {user ? (
                <a href="/profile" className="text-xl px-4 py-2 flex items-center text-white">
                  <FaUserCircle size={24} className="mr-2" /> {user.name}
                </a>
              ) : (
                <a href="/login" className="text-xl font-semibold px-6 py-3 rounded-lg mt-6"
                   style={{ backgroundColor: "#2c9fd5", color: "white" }}>
                  Login
                </a>
              )}
            </li>
          </ul>
        </div>

        {/* MOBILE NAV */}
        <div className="flex md:hidden justify-between items-center w-full myMobnav">
          <a href="/">
            <img
              src="https://res.cloudinary.com/dn23oe6gg/image/upload/v1762023367/897bba68-1092-4b61-bca9-a5bf4dea9633-removebg-preview_1_aqlphi.png"
              alt="Logo"
              className="object-contain w-48 h-28 sm:w-56 sm:h-32 transition-all duration-300"
            />
          </a>

          <button onClick={() => setMenuOpen(prev => !prev)} className="text-3xl focus:outline-none z-50">
            {menuOpen ? <X color="black" size={32} /> : <FaBars className="text-white" />}
          </button>
        </div>

      </div>

      {/* MOBILE OVERLAY MENU */}
      <div className={`fixed top-0 left-0 w-full h-full bg-white z-40 flex flex-col items-center justify-center transition-all duration-300 ${
        menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        {navItems.map((item) => (
          <a key={item} href={getHref(item)} onClick={() => setMenuOpen(false)}
             className="text-xl text-gray-800 font-semibold mb-6 hover:text-blue-600">
            {item}
          </a>
        ))}
        {user ? (
          <a href="/profile" className="text-xl px-4 py-2 flex items-center">
            <FaUserCircle size={24} className="mr-2" /> {user.name}
          </a>
        ) : (
          <a href="/login" className="text-xl font-semibold px-6 py-3 rounded-lg mt-6"
             style={{ backgroundColor: "#2c9fd5", color: "white" }}>
            Login
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
