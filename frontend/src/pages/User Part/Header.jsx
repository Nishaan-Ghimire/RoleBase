import React from 'react'
import {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify} from 'react-icons/bs'

function Header({OpenSidebar}) {
  return (
    <header className='header'>
      <div className='menu-icon'>
        <BsJustify className='icon' onClick={OpenSidebar}/>
      </div>

      <div className='header-left'>
        <div className="flex flex-shrink-0 items-center">
          <a href="/"><img className="h-8 w-auto" src="/images/nepali.png" alt="Nepal Logo" /></a>
          <h2 className='text-black font-bold font-sans text-xl ml-3'>Government Of Nepal</h2>
        </div>
      </div>
        
       <div className='header-right'>
        <BsFillBellFill className='icon element' />
        <BsFillEnvelopeFill className='icon element' />
        <BsPersonCircle className='icon element'/>
        </div> 

    </header>
  )
}

export default Header
