import React, { useState, useRef, useEffect } from 'react';
import logo from "../img/logo@2x.png"

import { Link } from 'react-router-dom';


function Footercomponent() {
 
    return (
      
    <footer className='mt-[150px]'>
      <div className='flex flex-wrap  my-[100px] px-[6%]'>
      <section className='mr-20'>
        <div className='max-w-[120px] w-full mb-[70px]'>
          <img className='w-full' src={logo} alt="" /> 
        </div>
        <h1 className='font-semibold mt-[20px] text-3xl'>The best look anytime, anywhere.</h1>
      </section>
      <section className='flex flex-wrap md:gap-[50px] md:mt-[30px] md:w-[500px]'>
        <div className='max-w-[200px] w-full'>
        <h1 className='text-2xl mb-[30px]'>For Hir</h1>
        <ul className='text-[#000000ad] flex flex-col text-[17px] gap-[10px]'>
          <li><Link>Women Jeans</Link></li>
          <li><Link>Tops and Shirts</Link></li>
          <li><Link>Women Jackets</Link></li>
          <li><Link>Women Jackets</Link></li>
          <li><Link>Women Jeans</Link></li>
        </ul>
        </div>
        <div className='max-w-[200px] w-full'>
        <h1 className='text-2xl mb-[30px]'>For Him</h1>
        <ul className='text-[#000000ad] flex flex-col text-[17px] gap-[10px]'>
          <li><Link>Women Jeans</Link></li>
          <li><Link>Tops and Shirts</Link></li>
          <li><Link>Women Jackets</Link></li>
          <li><Link>Women Jackets</Link></li>
          <li><Link>Women Jeans</Link></li>
        </ul>
        </div>
      </section>
      
      </div>
      <div className='flex justify-between border-t-2  px-16 py-6'>
        <h1 className=' text-xl text-slate-500'>Developed by Muhammad Hamd say hi</h1>
        <ul className='flex flex-wrap gap-[30px] text-2xl'>
          <li><Link to='https://facebook.com/muhammadhamd11'><i className='fa fa-facebook'></i></Link></li>
          <li><Link to='https://github.com/muhammadhamd'><i className=' fa fa-github '></i></Link></li>
          <li><Link to='https://instagram.com/hamd_studiology'><i className='fa fa-instagram'></i></Link></li>
          <li><Link to='https://linkedin.com/n/muhammadhamd'><i className='fa fa-linkedin'></i></Link></li>
        </ul>
      </div>
    </footer>
      
    )
}

export default Footercomponent