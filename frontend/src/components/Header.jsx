import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import { IoIosSearch } from "react-icons/io";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import Nav from './Nav';
import './App.css';

// filter brightness-0 invert

function Header({filter}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleSearch() {
    setIsSearchOpen(!isSearchOpen);
  }

  function closeSearch() {
    setIsSearchOpen(false);
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen); 
  }

  return (
    <>
      <div className='relative bg-transparent h-16 w-full  flex justify-between px-8 py-12 items-center z-[20] '>
        <Logo filter={filter} />
        <div className='flex justify-between gap-4 px-4'>
          <Nav textColor={'text-black'} className="hidden md:block" />
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
