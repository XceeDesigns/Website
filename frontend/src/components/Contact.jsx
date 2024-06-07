import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import "./App.css";
import { IoMapOutline } from "react-icons/io5";
import { MdEmail, MdOutlinePhoneCallback } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import Footer from './Footer';

function Contact() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 100);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='w-full'>
      <Header filter={""} background={"bg-white"}></Header>
      <div className='bg-gray-100 flex flex-col gap-6 md:flex-row px-6 py-10 md:items-center md:justify-around md:py-20 md:px-8 mt-24'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-normal text-black raleway tracking-widest'>CONTACT</h1>
          <p className='text-black raleway tracking-widest text-xs'>"GOT QUESTIONS OR FEEDBACK? REACH OUT TO US - WE'RE JUST A CLICK AWAY!"</p>
        </div>
        <div className='flex text-xs raleway tracking-widest gap-2 font-normal'>
          <button onClick={() => navigate('/')} className='cursor-pointer'>HOME /</button>
          <div className='font-bold'>CONTACT</div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:items-center'>
        <iframe 
          className='h-80 md:h-150 md:w-1/2 w-full py-0 md:py-10 pl-0 md:pl-10'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14002.567551550494!2d77.46414720248674!3d28.670439510301275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1f4ad5b59eb%3A0xd0e6b38805a9310b!2sShastri%20Nagar%2C%20Ghaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1714302644672!5m2!1sen!2sin" 
          loading="lazy">
        </iframe>
        <div className='px-6 py-20 flex flex-col md:justify-between gap-20 md:w-1/2 w-full'>
          <div className='flex items-center text-3xl'>
            <h1 className=' ml-2 sm:ml-12 border-l-2 p-4 border-black font-light raleway text-3xl'>CONTACT</h1>
            <h1 className='font-bold raleway text-3xl'>US</h1>
          </div>
          <div className='flex flex-col gap-8'>
            <input type="text" className='ml-2 sm:ml-12 border-b border-gray-600 py-2 raleway text-sm lg:w-2/5 px-2 text-black' placeholder='NAME' />
            <input type="email" className='ml-2 sm:ml-12 border-b border-gray-600 py-2 raleway text-sm lg:w-2/5 px-2 text-black' placeholder='EMAIL' />
            <textarea className='ml-2 sm:ml-12 border-b border-gray-600 py-2 raleway text-sm lg:w-2/5 px-2 text-black' placeholder='MESSAGE'></textarea>
            <div className='flex justify-center mt-14'>
              <button className='bg-gray-600 py-2 px-6 md:px-10 sm:py-4 sm:px-8 rounded-sm text-white text-xs md:text-sm lg:text-md lg:mr-60 xl:mr-96 2xl:mr-144'>SEND MESSAGE</button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:justify-evenly mt-20 mb-28 px-4'>
        <div className='flex items-center mb-6 md:mb-0'>
          <IoMapOutline className='w-6 h-10 mx-4' />
          <div className='flex flex-col border-l border-black pl-4 py-4'>
            <h1 className='font-semibold raleway text-lg'>ADDRESS</h1>
            <p className='raleway tracking-widest text-sm'>Ghaziabad , India</p>
          </div>
        </div>
        <div className='flex items-center mb-6 md:mb-0'>
          <MdEmail className='w-6 h-10 mx-4' />
          <div className='flex flex-col border-l border-black pl-4 py-4'>
            <h1 className='text-lg font-semibold raleway'>EMAIL</h1>
            <Link to="mailto:info@xceedesigns.com" className='raleway tracking-widest text-sm'>xceedesigns@gmail.com</Link>
          </div>
        </div>
        <div className='flex items-center'>
          <MdOutlinePhoneCallback className='w-6 h-10 mx-4' />
          <div className='flex flex-col border-l border-black pl-4 py-4'>
            <h1 className='text-lg font-semibold raleway'>CALL US</h1>
            <p className='raleway tracking-widest text-sm'>+91 95829 95138</p>
          </div>
        </div>
      </div>
      <div className='bg-gray-100 h-48 my-10 flex flex-col md:flex-row p-6 items-center justify-evenly'>
        <input type="text" className='px-10 py-4 bg-gray-100 border-b border-black text-sm md:text-xl' placeholder='Enter your email' />
        <button className='bg-gray-600 px-10 py-4 text-white rounded-sm text-xs md:text-sm mt-4 md:mt-0'>SUBSCRIBE</button>
      </div>
      <Footer></Footer>
      {isVisible && (
        <button onClick={scrollToTop} className='fixed bottom-8 right-8 p-3 rounded-full bg-white text-black hover:bg-gray-100 transition duration-300'>
          <IoIosArrowUp className='w-8 h-8' />
        </button>
      )}
    </div>
  );
}

export default Contact;
