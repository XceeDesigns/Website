import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Nav from './Nav';
import './App.css';

function Header({filter , background }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  function toggleSearch() {
    setIsSearchOpen(!isSearchOpen);
  }

  function closeSearch() {
    setIsSearchOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen); 
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className={`fixed top-0 left-0 w-full transition-all duration-300 z-[20] ${isScrolled ? 'h-14 py-4 shadow-md' : 'h-16 py-12'} ${background} flex justify-between px-8 items-center`}>
        <Logo filter={filter} />
        <div className='flex justify-between gap-4 px-4'>
          <Nav textColor={'text-gray-700 hover:text-black'} className="hidden md:block" />
          <IoIosSearch className={`${filter} h-10 w-6 cursor-pointer`} onClick={toggleSearch} />
          <RxHamburgerMenu
            className={`${filter} h-10 w-6 md:hidden cursor-pointer`}
            onClick={toggleMenu}
          />
        </div>
      </div>
      <div className={`absolute top-0 z-20 w-full transition-opacity duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}>
        {isSearchOpen && (
          <div className='bg-white px-8 py-4 border-b-2 flex items-center'>
            <input
              type="text"
              className='flex-grow h-16 bg-transparent px-4 py-2'
              placeholder='Search...'
            />
            <RxCross2 className='h-10 w-10 cursor-pointer' onClick={closeSearch} />
          </div>
        )}
      </div>
      <div className={`absolute top-16 z-10 w-full ${isMenuOpen ? 'menu-open' : 'menu-close'} `}>
        <div className={`bg-gray-500 px-4 py-4 flex flex-col gap-6 text-white my-8`}>
          <NavLink to="/home">HOME</NavLink>
          <NavLink to="/services">SERVICES</NavLink>
          <NavLink to="/contact">CONTACT</NavLink>
        </div>
      </div>
    </>
  );
}

export default Header;
