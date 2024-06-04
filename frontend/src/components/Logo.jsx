import React from 'react'
import img from '../assets/logo-new.png'

function Logo({filter}) {
  return (
    <img className={`h-10 w-12  ${filter}`} src={img} alt="" />
  )
}

export default Logo