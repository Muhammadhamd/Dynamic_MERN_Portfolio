import React, { useState, useRef, useEffect } from 'react';
import UseToken from './token';
import PopUpMessage from "./heading.jsx"
import "../App.css"
function Myservices({theme}) {
  const token = UseToken()
  // useEffect(()=>{
  //   axios.get("http://localhost:5000/token")
  //   .then((res)=>{console.log(res.data.Tokenis)})
  //   setToken(res.data.Tokenis)
  //   .catch((e)=>{console.log(e)})
  //  },[])
 
    return (
          <div className={`${theme? 'bg-gray-900' : 'bg-[#eae9ee6b] '} pb-[200px]`}>
      <div className='flex flex-col items-center w-full mt-[170px]'>
        <PopUpMessage theme={theme} message="~ What My IT Services Offers ~" />
      <h1 className={`${theme ? 'text-white': 'text-[#2E2D2D]'} max-[450px]:text-4xl max-[450px]:leading-[45px] max-[450px]:max-w-[250px]  text-5xl font-bold mt-[10px] max-w-[500px] text-center leading-[60px] tracking-[0.025rem]`}>
     I am <span className='text-[#5333F2]'>Dedicated</span> To Serve You All Time.
      </h1>
      </div>
      <div className='flex flex-wrap justify-center gap-[50px] mt-[90px] '>
      <div className={`${theme ? 'bg-[#1a293b]' : 'bg-white'} shadow-[0px_0px_10px_#00000029] rounded-[80px_0px_0px_0px] max-w-[340px] h-[340px] w-full p-[30px] text-center contact-each-box`}>
          <h1 className={`${theme ? 'text-white' : 'theme-black' } font-bold text-2xl mt-[50px]`}>Softwate Developer</h1>
          <div className='flex justify-center my-[14px]'> <div className='border-[#5333F2] border-[3px] w-full max-w-[150px]'></div></div>
          <p className={`${theme? 'text-gray-400' : 'text-black'}`}>
          as a Software Developer. With a passion for coding and problem-solving, I specialize in creating efficient, robust, and user-friendly software solutions.
          </p>
        </div>
        <div className={`${theme ? 'bg-[#1a293b]' : 'bg-white'} shadow-[0px_0px_10px_#00000029] rounded-[80px_0px_0px_0px] max-w-[340px] h-[340px] w-full p-[30px] text-center contact-each-box`} >
          <h1 className={`${theme ? 'text-white' : 'theme-black' } font-bold text-2xl mt-[50px]`}>Website Developer</h1>
          <div className='flex justify-center my-[14px]'> <div className='border-[#5333F2] border-[3px] w-full max-w-[150px]'></div></div>
          <p className={`${theme? 'text-gray-400' : 'text-black'}`}>
          As a Web Developer, I craft cutting-edge websites, harnessing the latest technologies to create seamless and visually captivating online experiences
          </p>
        </div>
        <div className={`${theme ? 'bg-[#1a293b]' : 'bg-white'} shadow-[0px_0px_10px_#00000029] rounded-[80px_0px_0px_0px] max-w-[340px] h-[340px] w-full p-[30px] text-center contact-each-box`}>
          <h1 className={`${theme ? 'text-white' : 'theme-black' } font-bold text-2xl mt-[50px]`}>wordPress Developer</h1>
          <div className='flex justify-center my-[14px]'> <div className='border-[#5333F2] border-[3px] w-full max-w-[150px]'></div></div>
          <p className={`${theme? 'text-gray-400' : 'text-black'}`}>
          ensuring they are not only visually appealing but also user-friendly and functional. With a passion for innovation and a commitment to excellence
          </p>
        </div>
        
      </div>
        </div>
    )
}

export default Myservices