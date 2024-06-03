import React from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom'
import "./App.css"

function Contact() {
  return (
    <div>
      <Header filter={""}></Header>
      <div className='bg-gray-100 flex flex-col gap-6 md:flex-row px-6 py-10 md:items-center md:justify-around md:py-20 md:px-8'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-2xl font-normal text-black raleway tracking-widest'>CONTACT</h1>
           <p className='text-black  raleway tracking-widest text-xs'>"GOT QUESTIONS OR FEEDBACK? REACH OUT TO US - WE'RE JUST A CLICK AWAY!"</p>
        </div>
        <div className='flex text-xs raleway tracking-widest gap-2 font-normal'>
          <Link >HOME     /</Link>
          <div> CONTACT</div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row'>
      <iframe className='h-80'
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14002.567551550494!2d77.46414720248674!3d28.670439510301275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf1f4ad5b59eb%3A0xd0e6b38805a9310b!2sShastri%20Nagar%2C%20Ghaziabad%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1714302644672!5m2!1sen!2sin" loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
      <div className='px-6 py-20 flex flex-col md:flex-row md:jusify-between gap-8'>
        <div className='flex  items-center gap text-3xl'>
        
        <h1 className='border-l-2 p-4 border-black font-light'>CONTACT</h1>
        <h1 className='font-bold'>US</h1>
        </div>

        <div className='flex flex-col gap-12'>
          <input type="text" className='border-b-2 border-gray-600 py-2' placeholder='NAME'/>
          <input type="email" className='border-b-2 border-gray-600 py-2'placeholder='EMAIL'/>
          <input type="text" className='border-b-2 border-gray-600 py-2' placeholder='MESSAGE'/>
          <button className='bg-gray-700 py-2 px-6 rounded-md border-gray-700 border-2 text-white w-[40%]'>SEND MESSAGE</button>
        </div>
       
      </div>
      </div>
    </div>
  )
}

export default Contact