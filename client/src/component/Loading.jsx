import React,{useEffect, useState} from 'react';
import dp from "../img/image 1.jpg"
import axios from 'axios';

function LoadingComponent({isLoading}) {

  const baseURL = process.env.PORT || 'http://localhost:5000'
    const [imgDp, setImgDp ] = useState()
    const [name, setname ] = useState()
    useEffect(()=>{
        axios.get(`${baseURL}/mydata`)
        .then((res)=>{
          
      
          setname(res.data.name)
          
          setImgDp(res.data.dp)
        })
        .catch((e)=>{
          console.log(e)
        })
      },[])
     
  return (
    <>
    {
        isLoading &&
        <div className='w-full h-[100vh] flex flex-col justify-center items-center'>
        <div className="w-[80px] h-[80px] relative">
                 <div className="animate-pulse absolute w-full h-full  rounded-full overflow-hidden ">
                   <img src={imgDp} alt="" />
                 </div>
                 <div className="absolute top-0 left-0 w-full h-full border-t-[3px] border-b-[3px]  border-violet-700  rounded-full animate-spin"></div>
               </div>
               <div className='text-slate-[#00000070] font-semibold text-[18px] my-1'>Processing....</div>
           </div>
    }
    </>

  )
  }
export default LoadingComponent;
