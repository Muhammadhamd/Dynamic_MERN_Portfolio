import '../App.css'
import React, { useState, useRef, useEffect } from 'react';
import "../css/project.css"
import app from '../firebaseConfig.mjs'
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import UseToken from './token.jsx'
import axios from 'axios';
import PopUpMessage from './heading';

function Project(){
  const baseURL = process.env.PORT || 'http://localhost:5000'
    // const [token , setToken] = useState(false)
    const token = UseToken();

    const [showForm , setShowForm] = useState(false)
    const [addImg , setAddImg] = useState("")
    const [addImgDB , setAddImgDB] = useState(null)
    const [addHeading , setAddHeading] = useState("")
    const [addDescription , setAddDescription] = useState("")
    const [addTags , setAddTags] = useState("")
    const [addVideo , setAddVideo] = useState("")
    const [addRepo , setAddRepo] = useState("")
    const [addlive , setAddlive] = useState("")
    const [arrayProjectData , setArrayProjectData] = useState([])
    const [allTags , setAllTags] = useState([])
    const [submitValue , setSubmitValue] = useState("Post")
    const [isPosting , setisPosting] = useState(false)

    const formdataget = async(e)=>{
        e.preventDefault()
       
          setisPosting(true)
    const name = +new Date() + "-" + addImgDB.name;
  const metadata = {
   contentType: addImgDB.type
  };
  const storageRef = ref(getStorage(app), name)
  
  const task = uploadBytes(storageRef, addImgDB, metadata);
  
  
  const snapshot = await task
  
  const imgUrl =await getDownloadURL(snapshot.ref)
  const newPost ={
    Heading:addHeading,
    description:addDescription,
    tags:allTags,
    imgURL:imgUrl,
    repolink:addRepo,
    hostlink:addlive,
    videolink:addVideo,
}
setArrayProjectData((arrayProjectData)=>[
  ...arrayProjectData,
  newPost])

          axios.post(`${baseURL}/project`,{
            Heading:addHeading,
            description:addDescription,
            tags:allTags,
            imgURL:imgUrl,
            repolink:addRepo,
            hostlink:addlive,
            videolink:addVideo,
          })
          .then((res)=>{
            console.log(res)
            setisPosting(false)

          })
          .catch((e)=>{
            console.log(e)
          setisPosting(false)

          })
        // console.log("post aded",newPost)
        setAddHeading('');
      setAddDescription('');
      setAddTags('');
      setAddImg('');
      setAllTags([])
      setAddImgDB('')
      
      }
      useEffect(() => {
        console.log(arrayProjectData);
      }, [arrayProjectData]);
  
      useEffect(()=>{
        axios.get(`${baseURL}/projects`)
        .then((res)=>{
          setArrayProjectData(res.data)
          console.log(res.data)
        })
      },[])
      useEffect(() => {
        console.log(allTags);
      }, [allTags]);
      useEffect(() => {
        console.log(addImgDB);
      }, [addImgDB]);
    //   useEffect(()=>{
    //     axios.get("http://localhost:5000/token")
    //     .then((res)=>{console.log(res.data.Tokenis)})
    //     setToken(res.data.Tokenis)
    //     .catch((e)=>{console.log(e)})
    //    },[])
     
    return(
       <div>
         {/* <div className="projectbg">
            <div className="flex flex-col items-center p-[100px]">
                <h1 className="text-[#BC7AFF] font-bold text-[400%] flex items-center justify-center relative left-[30px]">Lets Build  &nbsp;<div className="text-white"> Your Project</div></h1>
                <p className="font-semibold text-black text-center max-w-[800px] my-6 w-[95%] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, qui fuga. Incidunt, commodi. Tempora velit in amet perspiciatis doloremque ipsum magni nostrum molestiae, eveniet odio et voluptatum hic aliquam unde esse consequuntur minima ducimus ratione nemo mollitia a enim delectus eaque reprehenderit? Repellendus, dolorum sint magni asperiores sapiente autem. Fugit!</p>
                <ul className="flex gap-[30px] font-bold text-3xl">
                    <li className="text-[#BC7AFF]"><a href=""><i className="fa fa-github"></i></a></li>
                    <li className="text-[#BC7AFF]"><a href=""><i className="fa fa-instagram"></i></a></li>
                    <li className="text-white"><a href=""><i className="fa fa-linkedin"></i></a></li>
                    <li className="text-white"><a href=""><i className="fa fa-youtube"></i></a></li>
                </ul>

                <div className="flex justify-between w-full mt-10">
                        <div>
                           <h1 className="text-2xl text-[#BC7AFF] font-semibold">My Projects</h1>
                           <div></div>
                        </div>
                        <div>
                            <h1 className="text-2xl text-white font-semibold">Github Repositories</h1>
                            <div className="mt-3 flex flex-col gap-[15px]">
                            <div className="p-[10px] rounded-xl shadow-xl bg-white max-w-[430px] w-full">
                                    <h1 className="text-base font-semibold">DYNAMIC-React-portfolio</h1>
                                    <p className="text-slate-500 text-sm">tur adipisicing elit. Nihil nobis rerum ipsam quia odit tempora.</p>
                                    <div className="flex items-center justify-between text-sm text-violet-500 mt-1 ">
                                        <h1>Created at 6days ago</h1>
                                        <h1>Last modifed ~ 2 hours ago</h1>
                                    </div>
                                </div>
                                <div className="p-[10px] rounded-xl shadow-xl bg-white max-w-[430px] w-full">
                                    <h1 className="text-base font-semibold">DYNAMIC-React-portfolio</h1>
                                    <p className="text-slate-500 text-sm">tur adipisicing elit. Nihil nobis rerum ipsam quia odit tempora.</p>
                                    <div className="flex items-center justify-between text-sm text-violet-500 mt-1 ">
                                        <h1>Created at 6days ago</h1>
                                        <h1>Last modifed ~ 2 hours ago</h1>
                                    </div>
                                </div>
                                <div className="p-[10px] rounded-xl shadow-xl bg-white max-w-[430px] w-full">
                                    <h1 className="text-base font-semibold">DYNAMIC-React-portfolio</h1>
                                    <p className="text-slate-500 text-sm">tur adipisicing elit. Nihil nobis rerum ipsam quia odit tempora.</p>
                                    <div className="flex items-center justify-between text-sm text-violet-500 mt-1 ">
                                        <h1>Created at 6days ago</h1>
                                        <h1>Last modifed ~ 2 hours ago</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
           </div>
        </div>  */}

        <div>
              {token &&

<div className='w-full flex justify-center '>
  <form action="" className='my-10 shadow-[0px_0px_5px_#00000042] rounded-md px-[100px] py-[30px] w-full max-w-[1000px]'
  onSubmit={formdataget}
  >
              <div> <h1 className='font-semibold text-4xl my-8'>Add Project</h1></div>

   
    <div className='md:flex gap-[20px]'>
    <input className='w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='heading..'
    value={addHeading}
    onChange={
      (e)=>{
        setAddHeading(e.target.value)
      }
    } />
     <div className='w-[95%]'>
     <input type="file" className='block w-full text-sm text-slate-500
file:mr-4 file:py-2 file:px-4
file:rounded-full file:border-0
file:text-sm file:font-semibold
file:bg-violet-50 file:text-violet-700
hover:file:bg-violet-100'
    onChange={(e)=>{
      setAddImg(URL.createObjectURL(e.target.files[0]))
      setAddImgDB(e.target.files[0])
      // console.log(addImgDB)
    }}
    />
     </div>

    </div>
    <textarea className='w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 my-[20px] outline-none' name="" id=""  rows="7"
    value={addDescription}
    onChange={
      (e)=>{
        setAddDescription(e.target.value)
      }
    }
    ></textarea>
    
  
    <img src={addImg} alt="" className='w-90' />

 <div className='w-full flex px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none'>
 <input className='outline-none px-3 py-2 w-full'  type="text" placeholder='add tags...' 
    value={addTags}
    onChange={
      (e)=>{
      setAddTags(e.target.value)
      }
    } />
    <button className='text-white bg-violet-300 px-2 py-1 rounded-xl'
    onClick={(e)=>{
      e.preventDefault()
      const tags = {tag:addTags}
      setAllTags((allTags)=>[
        ...allTags,
        tags])
        setAddTags("")
    }}>add</button>
 </div>

 <div className='flex gap-[10px] my-3'>
     
 {
 allTags.map((eachtag, index) => (
<div key={index} className='px-4 py-2   rounded-full bg-violet-400 text-violet-50'>
{eachtag.tag}
</div>
))}
 </div>

 <input className='w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='Github repo link'
    value={addRepo}
    onChange={
      (e)=>{
        setAddRepo(e.target.value)
      }
    } />
    <input className='w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='Github repo link'
    value={addlive}
    onChange={
      (e)=>{
        setAddlive(e.target.value)
      }
    } />
    <input className='w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='Video link'
    value={addVideo}
    onChange={
      (e)=>{
        setAddVideo(e.target.value)
      }
    } />

    
 { 
          addHeading.length == 0 | addDescription.length == 0 | addImg.length == 0  ?
         ( <input type="submit" value="Add Post" disabled className='px-4 py-2 rounded shadowe my-3  bg-violet-300 text-white font-bold' />)
          :(
            isPosting ?(<input type="submit" value="Posting" disabled className='px-4 py-2 rounded shadowe my-3  bg-violet-300 text-white font-bold' />)
            :
         (<input type="submit" value="Add Post" className='px-4 py-2 rounded shadowe my-3  bg-violet-500 text-white font-bold' />)

          )
    }
  </form>
</div>

}
        </div>
      <div className='my-10 md:px-[124px]'>
       <div className='flex justify-center'>
       <PopUpMessage message="~ MY TOP PROJECTS ~" />
       </div>
      <div className='flex flex-wrap justify-center gap-[25px]'>
      
      {
        arrayProjectData.map((eachPost)=>[
        <a href={eachPost._id} className='w-full max-w-[400px] overflow-hidden h-[255px]'>
        <div key={eachPost._id} className='relative w-full max-w-[400px] overflow-hidden h-[255px] projectbox'>
        <div  className='w-full flex justify-between items-center overflow-hidden ' >
       <img className='w-full' src={eachPost.image} alt="" />
       </div>
       <div className=' absolute w-full bg-[#00000075] p-[20px] text-white bottom-[0px] hoverbox'>
         <h1 className='font-semibold text-[22px]'>{eachPost.heading}</h1>
         <p>{eachPost.description}</p>
         <h1 className='flex items-center font-semibold text-violet-100 gap-[3px]'><a href={eachPost.hostlink}>Let's check it out <i className='fa fa-arrow-right'></i></a></h1>
       </div>
      </div>
      </a>
        ])
          
      }
      </div>
      </div>
       </div>
    )
}

export default Project