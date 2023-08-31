import React, { useState, useRef, useEffect } from 'react';
import app from '../firebaseConfig.mjs'
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";

import axios from 'axios';

function LatestPost() {
 

  const [token , setToken] = useState("token")
  const [showForm , setShowForm] = useState(false)
  const [addImg , setAddImg] = useState("")
  const [addImgDB , setAddImgDB] = useState(null)
  const [addHeading , setAddHeading] = useState("")
  const [addDescription , setAddDescription] = useState("")
  const [addTags , setAddTags] = useState("")
  const [arrayPostData , setArrayPostData] = useState([])
  const [allTags , setAllTags] = useState([])
    const formdataget = async(e)=>{
      e.preventDefault()
      const newPost ={
        Heading:addHeading,
        description:addDescription,
        tags:allTags,
        imgURL:addImg
      }
      setArrayPostData((arrayPostData)=>[
        ...arrayPostData,
        newPost])

        
  const name = +new Date() + "-" + addImgDB.name;
const metadata = {
 contentType: addImgDB.type
};
const storageRef = ref(getStorage(app), name)

const task = uploadBytes(storageRef, addImgDB, metadata);


const snapshot = await task

const imgUrl =await getDownloadURL(snapshot.ref)
      
      
        axios.post('http://localhost:5000/post',{
          Heading:addHeading,
          description:addDescription,
          tags:allTags,
          imgURL:imgUrl
        })
        .then((res)=>{
          console.log(res)
        })
        .catch((e)=>{
          console.log(e)
        })
      // console.log("post aded",newPost)
      setAddHeading('');
    setAddDescription('');
    setAddTags('');
    setAddImg('');
    setAllTags([])
    setAddImgDB('')
    
    }
    // useEffect(() => {
    //   console.log(arrayPostData);
    // }, [arrayPostData]);

    useEffect(()=>{
      axios.get("http://localhost:5000/posts")
      .then((res)=>{
        setArrayPostData(res.data)
      },[])
    })
    useEffect(() => {
      console.log(allTags);
    }, [allTags]);
    useEffect(() => {
      console.log(addImgDB);
    }, [addImgDB]);
    return (
        <div>
        <h1 className='font-bold text-[32px] text-center text-[#BC7AFF]'>My Latest blogs</h1>
        {token &&

        <div className='w-full flex justify-center '>
          <form action="" className='my-10 shadow-[0px_0px_5px_#00000042] rounded-md px-[100px] py-[30px] w-full max-w-[1000px]'
          onSubmit={formdataget}
          >
                      <div> <h1 className='font-semibold text-4xl my-8'>Add new Post</h1></div>

           
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
         { 
                  addHeading.length == 0 | addDescription.length == 0 | addImg.length == 0  ?
                 ( <input type="submit" value="Add Post" disabled className='px-4 py-2 rounded shadowe my-3  bg-violet-300 text-white font-bold' />)
                  :
                 (<input type="submit" value="Add Post" className='px-4 py-2 rounded shadowe my-3  bg-violet-500 text-white font-bold' />)
            }
          </form>
        </div>

}
        
        <div className='flex flex-wrap gap-[55px] items-center justify-center md:mx-[2%] my-[3%]'>
        {
          arrayPostData.map((eachPost)=>[
            <div key={eachPost._id} className='w-full w-[300px] h-[600px] rounded-[7px] flex flex-col justify-between overflow-hidden ' >
            <div>
            <div className='w-full h-[300px] overflow-hidden'> 
            <img className='w-full' src={eachPost.image} alt="" />
            </div>
            <div className='p-[5px]'>
              <h1 className='text-[22px] font-bold leading-[30px] mb-2'>
              {eachPost.heading}
              </h1>
              <p className='font-regular text-[16px] leading-[20px] h-[70px] overflow-hidden'>{eachPost.description}</p>
              <div>
               <div className='flex flex-wrap gap-[10px] my-3'>
               {eachPost.tags.map((eachtag, index) => (
              <h1 key={index} className='text-white text-sm font-semibold bg-[#BC7AFF] py-1 px-2 rounded-full'>
                {eachtag.tag}
              </h1>
            ))}
               </div>
              </div>
            </div>
            </div>
            <h3 className=' text-[#BC7AFF] font-semibold text-[16px]'>Read full article</h3>

          </div>
          ])
            
        }
        </div>
        <h1 className='font-bold text-[23px] text-center text-[#BC7AFF]'>See More</h1>
      </div>
    )
}

export default LatestPost