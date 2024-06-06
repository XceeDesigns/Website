import React from 'react';
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

function Footer() {
  return (
    <div className='mt-10 flex w-full flex-col md:flex-row justify-between px-6 md:px-20 border-t py-14 gap-2 items-center'>
      <div>&copy;XceeDesigns2024</div>
      <div className='flex gap-2'>
        <FaXTwitter />
        <FaLinkedin />
        <FaInstagramSquare />
      </div>
    </div>
  );
}

export default Footer;
