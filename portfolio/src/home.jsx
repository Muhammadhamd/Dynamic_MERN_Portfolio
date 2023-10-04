import React, { useState, useRef, useEffect } from 'react';
import style from './App.css'
import UseToken from './component/token.jsx'
import app from './firebaseConfig.mjs'
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import Project from './component/Projects';
import reacticon from "./img/logo192.png"
import axios, { toFormData } from 'axios';
import db from './img/image 1.jpg'

import whatsNewImg from './img/image-removebg 1.png'
import mernstackImg from './img/mern-stack.png'
import LatestPost from './component/LatestPost';
import Myservices from './component/myServices';
import ContactComponent from './component/contact';
import InstafeedComponent from './component/Instagramposts';
import ChatBot from './component/chatbot';
import Experience from './component/exprence';
import PopUpMessage from './component/heading';
function Home() {

  const token = UseToken()
const baseURL = process.env.PORT || 'http://localhost:5000'
  // useEffect(()=>{
  //   axios.get("http://localhost:5000/tokenCheck")
  //   .then((res)=>{console.log("token",res)})
  //   .catch((e)=>{console.log("token",e)})
  // },[])
  const  [imgDp , setImgDp] = useState(null)
  const [imgDpTODB , setImgDpTODB] = useState(null)
  const [imgURL , setImgURL] = useState(null)
  const [name , setname] = useState("")
  const [paragraph , setParagraph]=useState("")
  const [subline , setSubLine] = useState("")

  const [heading , setHeading] = useState("")
  const [showForm , setShowForm] = useState(false)
  const imageChange = (e)=>{
  
    if(e.target.files && e.target.files[0]){
      setImgDp(URL.createObjectURL(e.target.files[0]))
      setImgDpTODB(e.target.files[0])
    }


  }

  

  
  const editUserData = async(e)=>{
    e.preventDefault()
    setShowForm(false)

if(imgDpTODB){
  const imgname = +new Date() + "-" + imgDpTODB.name;
    const metadata = {
     contentType: imgDpTODB.type
    };
    const storageRef = ref(getStorage(app), imgname)
    
    const task = uploadBytes(storageRef, imgDpTODB, metadata);
    
    
    const snapshot = await task
    
    const imgUrl =await getDownloadURL(snapshot.ref)

      axios.put("http://localhost:5000/userinfo",{
      namey:name,
      subliney:subline,
      headingy:heading,
      paragraphy:paragraph,
      dpImg:imgUrl
    })
    .then((res)=>{console.log(res)})
    .catch((e)=>{console.log(e)})
    return
  }else{
axios.put(`${baseURL}/userinfo`,{
    namey:name,
    subliney:subline,
    headingy:heading,
    paragraphy:paragraph,
    dpImg:imgDp
  })
  .then((res)=>{console.log(res)})
  .catch((e)=>{console.log(e)})

  }
  
}
  

  
          

     
  

  useEffect(()=>{
    axios.get(`${baseURL}/mydata`)
    .then((res)=>{
      setHeading(res.data.heading)
      setParagraph(res.data.paragraph)
      setname(res.data.name)
      setSubLine(res.data.subline)
      setImgDp(res.data.dp)
    })
    .catch((e)=>{
      console.log(e)
    })
  },[])
 
  useEffect(() => {
    console.log(imgDpTODB)
  }, [imgDpTODB]);

  return (
  <div className='flex flex-col pb-[100px] gap-[140px]'>
    <ChatBot />
    <div className='flex justify-center mt-[30px]'>
    <div className='flex flex-wrap max-[1000px]:justify-center max-[900px]:gap-[40px] max-[1460px]:max-w-[80%] max-[1260px]:max-w-[90%] max-w-[70%] w-full justify-between mt-[40px]'>
      <div className='relative max-[1200px]:max-w-[550px] max-w-[600px] mr-[10px] m-2 mt-[3%] text-[#2E2D2D]'>
       {token &&
        <button className='absolute left-[-50px] bg-[#BC7AFF] text-white text-[20px] flex justify-center items-center p-[10px] rounded-full w-[40px] h-[40px] shadow-xl'
        onClick={
          (e)=>{
            console.log("clicked")
            setShowForm(true)
          }
        }
        >
          <i className='fa fa-edit'></i>
          </button>
      }
      {
        showForm && 
        <div className='absolute h-[100vh] w-full flex justify-center items-center bg-white text-[#2E2D2D] '>
          <form 
           className='max-w-[600px] bg-white flex flex-wrap shadow rounded w-full gap-[15px] justify-center p-[20px]'
           onSubmit={editUserData}
           >
          <div className='w-full flex justify-center'>
          <div className='w-[150px] h-[150px] overflow-hidden rounded-full flex justify-center items-center'
          onClick={ ()=>{
            document.getElementById("dp-upload").click()
  
          }
          } 
          >
            <img src={imgDp || db} className='w-full'  alt="" />
           </div>
          </div>
            <input className='border rounded w-[45%] px-3 py-2 shadow focus:border-violet-700' type="text" value={name} onChange={
              (e)=>{
                setname(e.target.value)
              }
            }/>
            <input className='border rounded w-[45%] px-3 py-2 shadow focus:border-violet-700' type="text" value={subline} onChange={
              (e)=>{
                setSubLine(e.target.value)
              }
            }/>
            <input className='border rounded w-[45%] px-3 py-2 shadow focus:border-violet-700' type="text" value={heading} onChange={
              (e)=>{
                setHeading(e.target.value)
              }
            }/>
            <input className='border rounded w-[45%] px-3 py-2 shadow focus:border-violet-700' type="text" value={paragraph} onChange={
              (e)=>{
                setParagraph(e.target.value)
              }
            }/>
            <input type="submit" value='Change' className='px-3  py-2 bg-violet-500 rounded shadow text-white' 
           
            
            />
          </form>
        </div>
        
      }
        <h1 className='text-[45px] md:text-[65px] text-[#2E2D2D] font-extrabold tracking-[-0.16rem] leading-[90%]'
        
        >{name ||<div className='my-[10px] animate-pulse flex space-x-4'>
        <div class="rounded-full bg-slate-200 py-4  w-[400px]"></div>
        </div>}</h1>
        <h2 className='text-[30px] leading-[90%] md:text-[35px] my-[10px] font-bold text-[#5333F2] tracking-[-4%] '
       
         >{subline ||<div className='my-[10px] animate-pulse flex space-x-4'>
         <div class="rounded-full bg-slate-200 py-3  w-[300px]"></div>
         </div>}</h2>
        <h3 className='font-semibold text-[20px] tracking-[-0.05rem] leading-[24px]'
       
        >{heading || <div className='my-[10px] animate-pulse flex space-x-4'>
        <div class="rounded-full bg-slate-200 py-3  w-[300px]"></div>
        </div>}</h3>
        {/* <div>
          <ul className='flex gap-[10px] my-3'>
            <li className='text-white text-[16px] rounded-full bg-[#BC7AFF] flex justify-center items-center w-[35px] h-[35px]'><a href=""><i className='fa fa-facebook'></i></a></li>
            <li className='text-white text-[16px] rounded-full bg-[#BC7AFF] flex justify-center items-center w-[35px] h-[35px]'><a href=""><i className='fa fa-github'></i></a></li>
            <li className='text-white text-[16px] rounded-full bg-[#BC7AFF] flex justify-center items-center w-[35px] h-[35px]'><a href=""><i className='fa fa-linkedin'></i></a></li>
            <li className='text-white text-[16px] rounded-full bg-[#BC7AFF] flex justify-center items-center w-[35px] h-[35px]'><a href=""><i className='fa fa-instagram'></i></a></li>
          </ul>
        </div> */}
        <p className='mt-[10px] text-[#67687A] text-[17px] max-w-[450px] w-full leading-[29px] border-[#5333F2] border-l-[3px] pl-[20px]'
        // contentEditable={token ? true : false} 
      
        >{paragraph ||<div className=' animate-pulse'>
        <div class="rounded-full bg-slate-200 py-2 my-[10px]  w-[100%]"></div>
        <div className='flex my-[10px] justify-between'><div class="rounded-full bg-slate-200 py-2  w-[20%]"></div><div class="rounded-full bg-slate-200 py-2  w-[77%]"></div></div>

        <div class="rounded-full bg-slate-200 py-2 my-[10px]  w-[100%]"></div>
        <div className='flex my-[10px] justify-between'><div class="rounded-full bg-slate-200 py-2  w-[60%]"></div><div class="rounded-full bg-slate-200 py-2  w-[40%]"></div></div>

        </div>}</p>
      </div>
      <div>
        {imgDp ?
        <div className=' md:w-[400px] max-[1160px]:max-w-[360px] max-[1160px]:h-[360px] relative md:h-[400px] h-[350x] w-[350px] max-[350px]:w-[300px] max-[350px]:h-[300px] max-[300px]:w-[250px] max-[300px]:h-[250px] mx-[auto] rounded-full border-[4px] border-[#BC7AFF] overflow-hidden'>
       {
        token && <>
        <div 
        onClick={ ()=>{
          document.getElementById("dp-upload").click()

        }
        } className='flex absolute md:max-w-[400px] w-full h-auto md:h-[400px] max-[1160px]:max-w-[360px] max-[1160px]:h-[360px] bg-[#00000052]  items-center justify-center text-4xl text-[#ffffff73]'>
<i className='fa fa-image'></i>
</div>
 <input type="file" name="" onChange={imageChange} id="dp-upload" hidden />
        </>
       }
       
       <img src={imgDp} alt="" />:

        </div> : <div className='animate-pulse flex space-x-4'>
          <div class="rounded-full bg-slate-200 md:h-[400px]  md:w-[400px]"></div>
          </div>}
      </div>
    </div>
    </div>
<Myservices />
    <InstafeedComponent />
    <Experience />
    <LatestPost />
    
    <Project />
    
    {/* <div>
    <h1 className='font-bold text-[32px] text-center text-[#BC7AFF]'>What's New</h1>
    {token &&
        <button className='absolute left-[50px] bg-[#BC7AFF] text-white text-[20px] flex justify-center items-center p-[10px] rounded-full w-[40px] h-[40px] shadow-xl'><i className='fa fa-edit'></i></button>
      }
    <div className='flex flex-wrap justify-center'>
      <div className='w-[614px]'>
        <img src={whatsNewImg} className='w-full' alt="" />
      </div>
      <div className='w-[700px] flex flex-col items-center justify-center'>
        <p className='font-regular leading-[30px] text-center text-[16px] max-w-[540px]'contentEditable>Enrich your team with a proficient MERN developer. I bring in-depth MongoDB, Express, React, and Node.js knowledge, ensuring top-quality web applications. Let's collaborate to create seamless and impressive digital experiences.</p>
     <button className='text-white font-bold text-[18px] px-5 py-1.5 shadow rounded-[7px] bg-[#BC7AFF] mt-10 mb-5'>Colabrate</button>
     <div  className='w-full font-medium text-[12px] text-slate-500 flex justify-end'>
      <h1 id='lastup-data'>Last updated 23/23/2023</h1>
     </div>
      </div>
    </div>
  
    </div> */}
     <div>
      <div className='flex justify-center'>
        <PopUpMessage message="~ More About Me ~s" />
      </div>
      <div className='flex flex-col items-center'>
      <h1 className='text-5xl font-bold text-[#2E2D2D] mt-[10px] max-w-[500px] text-center leading-[60px] tracking-[0.025rem]'>
     I am a <span className='text-[#5333F2]'>MERN</span> Developer.
      </h1>
      <p className='text-[#67687A] text-[17px] leading-[29px] max-w-[380px] text-center'>Developing Websites with the Latest <span className='text-[#5333F2]'>MERN Stack</span>  Technology</p>
      
      <div className='flex flex-wrap justify-center gap-[50px] mt-[90px] '>
      <div className='bg-white shadow-[0px_0px_20px_#00000087] rounded-[80px_0px_0px_0px] max-w-[340px] h-[340px] w-full p-[30px] text-center contact-each-box'>
      <i class="text-[60px] mt-[25px] text-[#5333F2]  fa fa-html5"></i>

          <h1 className='font-bold text-2xl mt-[20px]'>HTML5</h1>
          <div className='flex justify-center my-[14px]'> <div className='border-[#5333F2] border-[3px] w-full max-w-[150px]'></div></div>
          <p>
          HTML5 is the backbone, structuring web content efficiently for seamless integration with the MERN stack and user-friendly experiences.





          </p>
        </div>
        <div className='bg-white shadow-[0px_0px_20px_#00000087] rounded-[80px_0px_0px_0px] max-w-[340px] h-[340px] w-full p-[30px] text-center contact-each-box'>
      <i class="text-[60px] mt-[25px] text-[#5333F2]  fa fa-css3"></i>

          <h1 className='font-bold text-2xl mt-[20px]'>CSS3</h1>
          <div className='flex justify-center my-[14px]'> <div className='border-[#5333F2] border-[3px] w-full max-w-[150px]'></div></div>
          <p>
           
CSS serves as the style wizard, creating visually appealing designs while maintaining responsiveness and user-friendliness in your web application.
          </p>
        </div>
        <div className='bg-white shadow-[0px_0px_20px_#00000087] rounded-[80px_0px_0px_0px] max-w-[340px] h-[340px] w-full p-[30px] text-center contact-each-box'>
      <i class="text-[60px] mt-[25px] text-[#5333F2]  fa fa-js"></i>
      <div className='flex justify-center h-[60px]'>
      <img src={reacticon} alt="" className='w-[60px] spin' />
      </div>
          <h1 className='font-bold text-2xl mt-[20px]'>React.js</h1>
          <div className='flex justify-center my-[14px]'> <div className='border-[#5333F2] border-[3px] w-full max-w-[150px]'></div></div>
          <p>
           
React, the dynamic engine, powers your web app with interactivity and responsiveness, ensuring a seamless user experience within the MERN stack.
          </p>
        </div>
        
      </div>
     
      </div>
     </div>
    <ContactComponent />

    {/* <Adminlogin /> */}
  </div>
  );
}

export default Home;