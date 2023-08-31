import React, { useState, useRef, useEffect } from 'react';

function Myservices() {
  const [token , setToken] = useState("token")

    return (
        <div className='service-div'>
        <h1 className='font-bold text-[32px] text-center text-[#BC7AFF]'>My Services</h1>
        {token &&
            <button className='absolute left-[50px] bg-[#BC7AFF] text-white text-[20px] flex justify-center items-center p-[10px] rounded-full w-[40px] h-[40px] shadow-xl'><i className='fa fa-edit'></i></button>
          }
          <div className='flex-wrap flex justify-center gap-[100px] md:mx-[2%] my-[5%]'>
            <div className=' rounded shadow-xl p-[12px] text-white bg-[#BC7AFF] max-w-[450px]'>
            <div className='flex items-center justify-center'>
            <i className='fa fa-code font-semibold text-xl text-[#ffffffe3] mr-1'></i>
              <h1 className='font-semibold text-2xl'> Full stack Web Developer</h1>
            </div>
              <p className='text-center text-base font-regular text-[#ffffffe3] tracking-tight'>I can Develope Your full stack web-site for your Business checkout my projects</p>
            </div>
            <div className=' rounded shadow-xl p-[12px] text-white bg-[#BC7AFF] max-w-[450px]'>
            <div className='flex items-center justify-center'>
            <i className='fa fa-code font-semibold text-xl text-[#ffffffe3] mr-1'></i>
              <h1 className='font-semibold text-2xl'> Full stack Web Developer</h1>
            </div>
              <p className='text-center text-base font-regular text-[#ffffffe3] tracking-tight'>I can Develope Your full stack web-site for your Business checkout my projects</p>
            </div>
            <div className=' rounded shadow-xl p-[12px] text-white bg-[#BC7AFF] max-w-[450px]'>
            <div className='flex items-center justify-center'>
            <i className='fa fa-code font-semibold text-xl text-[#ffffffe3] mr-1'></i>
              <h1 className='font-semibold text-2xl'> Full stack Web Developer</h1>
            </div>
              <p className='text-center text-base font-regular text-[#ffffffe3] tracking-tight'>I can Develope Your full stack web-site for your Business checkout my projects</p>
            </div>
            <div className=' rounded shadow-xl p-[12px] text-white bg-[#BC7AFF] max-w-[450px]'>
            <div className='flex items-center justify-center'>
            <i className='fa fa-code font-semibold text-xl text-[#ffffffe3] mr-1'></i>
              <h1 className='font-semibold text-2xl'> Full stack Web Developer</h1>
            </div>
              <p className='text-center text-base font-regular text-[#ffffffe3] tracking-tight'>I can Develope Your full stack web-site for your Business checkout my projects</p>
            </div>
            
          </div>
        </div>
    )
}

export default Myservices