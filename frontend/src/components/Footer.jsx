import React from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='mt-10 flex w-full flex-col md:flex-row justify-between px-6 md:px-20 border-t py-14 gap-2 items-center'>
      <div>&copy;XceeDesigns2024</div>
      <div className='flex gap-6 mr-10'>
        <Link to="https://twitter.com/XceeDesigns" ><FaXTwitter /></Link>
        <Link to="https://www.linkedin.com/company/xceeddesigns" ><FaLinkedin /></Link>
        <Link to="https://www.instagram.com/xceedesigns.official" ><IoLogoInstagram/></Link>
        
        
      </div>
    </div>
  );
}

export default Footer;
