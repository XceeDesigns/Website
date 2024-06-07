import React from 'react'
import Header from './Header'

function Home() {
  return (
    <div className='w-full'>
   <Header filter={""} background={"bg-white"}></Header>
   <div className='text-black font-bold'>
    HOME
   </div>
    </div>
  )
}

export default Home