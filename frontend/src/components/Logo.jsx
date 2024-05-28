import React from 'react'
import img from '../assets/logo-new.png'

function Logo() {
  return (
    <img className='h-10 w-12  filter brightness-0 invert' src={img} alt="" />
  )
}

export default Logo