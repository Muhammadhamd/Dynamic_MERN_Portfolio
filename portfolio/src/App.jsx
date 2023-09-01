import React, { useState, useRef, useEffect } from 'react';
import style from './App.css'
import app from './firebaseConfig.mjs'
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import Adminlogin from './component/adminlogin'; // Make sure the path is correct
import Project from './component/Projects';

import axios, { toFormData } from 'axios';
import db from './img/image 1.jpg'
import whatsNewImg from './img/image-removebg 1.png'
import mernstackImg from './img/mern-stack.png'
import LatestPost from './component/LatestPost';
import Myservices from './component/myServices';
import ContactComponent from './component/contact';
function App() {

  const [token , setToken] = useState("r")

  // useEffect(()=>{
  //   axios.get("http://localhost:5000/tokenCheck")
  //   .then((res)=>{console.log("token",res)})
  //   .catch((e)=>{console.log("token",e)})
  // },[])
  const  [imgDp , setImgDp] = useState(db)
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
axios.put("http://localhost:5000/userinfo",{
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
    axios.get("http://localhost:5000/mydata")
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
    <div className='flex justify-center mt-[30px]'>
    <div className='flex flex-wrap min-w-[1049px] max-w-[70%] w-full justify-between mt-[40px]'>
      <div className='relative max-w-[600px] mr-[10px] m-2 mt-[3%]'>
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
        <div className='absolute h-[100vh] w-full flex justify-center items-center bg-white'>
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
        <h1 className='text-[60px] font-extrabold tracking-[-0.16rem] leading-[90%]'
        suppressContentEditableWarning={true}
        onInput={
          (event)=>{
            setname(event.target.textContent);
        
        
          }
        } 
        >{name}</h1>
        <h2 className='text-[35px] font-bold text-[#BC7AFF] tracking-[-4%] '
        onInput={
          (e)=>{
            console.log(e.target.textContent)
            setSubLine(e.target.textContent)
          }
        }
         >{subline}</h2>
        <h3 className='font-bold text-[20px] tracking-[-0.05rem] leading-[24px]'
        onInput={
          (e)=>{
            console.log(e.target.textContent)
            setHeading(e.target.textContent)
          }
        }
        >{heading}</h3>
        <div>
          <ul className='flex gap-[10px] my-3'>
            <li className='text-white text-[16px] rounded-full bg-[#BC7AFF] flex justify-center items-center w-[35px] h-[35px]'><a href=""><i className='fa fa-facebook'></i></a></li>
            <li className='text-white text-[16px] rounded-full bg-[#BC7AFF] flex justify-center items-center w-[35px] h-[35px]'><a href=""><i className='fa fa-github'></i></a></li>
            <li className='text-white text-[16px] rounded-full bg-[#BC7AFF] flex justify-center items-center w-[35px] h-[35px]'><a href=""><i className='fa fa-linkedin'></i></a></li>
            <li className='text-white text-[16px] rounded-full bg-[#BC7AFF] flex justify-center items-center w-[35px] h-[35px]'><a href=""><i className='fa fa-instagram'></i></a></li>
          </ul>
        </div>
        <p className='font-regular text-slate-700 text-[16px] max-w-[450px] w-full'
        // contentEditable={token ? true : false} 
        onInput={
          (e)=>{
            console.log(e.target.textContent)
           setParagraph(e.target.textContent)
          }
        }
        >{paragraph}</p>
      </div>
      <div>
        <div className=' max-w-[400px] relative h-[400px] w-full rounded-full border-[4px] border-[#BC7AFF] overflow-hidden'>
       {
        token && <>
        <div 
        onClick={ ()=>{
          document.getElementById("dp-upload").click()

        }
        } className='flex absolute max-w-[400px] w-full h-[400px] bg-[#00000052]  items-center justify-center text-4xl text-[#ffffff73]'>
<i className='fa fa-image'></i>
</div>
 <input type="file" name="" onChange={imageChange} id="dp-upload" hidden />
        </>
       }
          <img className='w-full ' src={imgDp || db} alt="" />
        </div>
      </div>
    </div>
    </div>

<Myservices />
    <LatestPost />
    <Project />
    <div>
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
  
    </div>
    <div className='flex flex-wrap justify-center'>
    {token &&
        <button className='absolute left-[50px] bg-[#BC7AFF] text-white text-[20px] flex justify-center items-center p-[10px] rounded-full w-[40px] h-[40px] shadow-xl'><i className='fa fa-edit'></i></button>
      }
      <div className='w-full max-w-[700px] flex flex-col justify-center'>
        <h1 contentEditable  className='font-extrabold text-[32px]' >I am a <div className='flex'><b className='text-[#BC7AFF]'>MERN</b>&nbsp;Developer</div></h1>
        <p  contentEditable className='font-regular leading-[30px]  text-[16px] max-w-[570px]'>Unlock the power of the MERN stack with my expertise. As a skilled developer, I craft seamless MongoDB, Express.js, React, and Node.js solutions. Elevate your web applications with my clean coding and collaborative approach. Let's build a future-focused digital experience together.</p>
        <div  className='w-full font-medium text-[12px] text-slate-500 flex justify-start mt-3'>
      <h1 id='lastup-data'>Last updated 23/23/2023</h1>
     </div>
      </div>
      <div className='w-full max-w-[500px]'>
        <img className='w-full' src={mernstackImg} alt="" />
      </div>
    </div>
    <ContactComponent />

    <Adminlogin />
  </div>
  );
}

export default App;
