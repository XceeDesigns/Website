import React from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';
import "./App.css";
import { IoMapOutline } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdOutlinePhoneCallback } from "react-icons/md";
import Footer from './Footer';

function Contact() {
  return (
    <div className='w-full'>
      {/* <Header filter={""}></Header> */}
      <div className='bg-gray-100 flex flex-col gap-6 md:flex-row px-6 py-10 md:items-center md:justify-around md:py-20 md:px-8'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-normal text-black raleway tracking-widest'>CONTACT</h1>
          <p className='text-black raleway tracking-widest text-xs'>"GOT QUESTIONS OR FEEDBACK? REACH OUT TO US - WE'RE JUST A CLICK AWAY!"</p>
        </div>
        <div className='flex text-xs raleway tracking-widest gap-2 font-normal'>
          <Link to="/">HOME /</Link>
          <div>CONTACT</div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:items-center'>
        <iframe 
          className='h-80 md:h-96 md:w-1/2 w-full'
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14002.567551550494!2d77.46414720248674!3d28.670439510301275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1f4ad5b59eb%3A0xd0e6b38805a9310b!2sShastri%20Nagar%2C%20Ghaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1714302644672!5m2!1sen!2sin" 
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade">
        </iframe>
        <div className='px-6 py-20 flex flex-col md:justify-between gap-8 md:w-1/2 w-full'>
          <div className='flex items-center text-3xl'>
            <h1 className='ml-12 border-l-2 p-4 border-black font-light raleway tracking-widest text-3xl'>CONTACT</h1>
            <h1 className='font-bold raleway tracking-widest text-3xl'>US</h1>
          </div>
          <div className='flex flex-col gap-4'>
            <input type="text" className='ml-12 border-b border-gray-600 py-2 raleway tracking-widest text-md lg:w-2/5' placeholder='NAME' />
            <input type="email" className='ml-12 border-b border-gray-600 py-2 raleway tracking-widest text-md lg:w-2/5' placeholder='EMAIL' />
            <textarea className='ml-12 border-b border-gray-600 py-2 raleway tracking-widest text-md lg:w-2/5' placeholder='MESSAGE'></textarea>
            <div className='flex justify-center mt-14'>
              <button className='bg-gray-600 py-2 px-6 md:px-10 sm:py-4 sm:px-8 rounded-sm text-white text-xs md:text-sm lg:text-md lg:mr-144'>SEND MESSAGE</button>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:justify-evenly mb-10 px-4'>
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
            <p className='raleway tracking-widest text-sm'>xceedesigns@gmail.com</p>
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
    </div>
  );
}

export default Contact;
