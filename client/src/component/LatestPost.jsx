import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebaseConfig.mjs'
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import UseToken from './token.jsx'

import axios from 'axios';
import SubmitBtn from './submitbtn.js';
import PopUpMessage from './heading.jsx';

function LatestPost({theme}) {
 

  const token = UseToken()
  const [showForm , setShowForm] = useState(false)
  const [addImg , setAddImg] = useState("")
  const [addImgDB , setAddImgDB] = useState(null)
  const [addHeading , setAddHeading] = useState("")
  const [addDescription , setAddDescription] = useState("")
  const [addTags , setAddTags] = useState("")
  const [arrayPostData , setArrayPostData] = useState([])
  const [allTags , setAllTags] = useState([])
  const [isPosting , setisPosting] = useState(false)

    const formdataget = async(e)=>{
   


      setisPosting(true)

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
      
      
        axios.post(`/post`,{
          Heading:addHeading,
          description:addDescription,
          tags:allTags,
          imgURL:imgUrl
        })
        .then((res)=>{
          console.log(res)
      setisPosting(false)
      setisPosting(false)
        })
        .catch((e)=>{
          console.log(e)
      setisPosting(false)

        })
      // console.log("post aded",newPost)
    //   setAddHeading('');
    // setAddDescription('');
    // setAddTags('');
    // setAddImg('');
    // setAllTags([])
    // setAddImgDB('')
    
    }
    // useEffect(() => {
    //   console.log(arrayPostData);
    // }, [arrayPostData]);

    useEffect(()=>{
    

      axios.get(`/posts`)
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
        <div className='flex ml-[25px] md:ml-[50px]'>
         <PopUpMessage theme={theme} s message="MY LATEST BLOGS" /> 
         </div>
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
         
        <SubmitBtn  value='Add Post' valueOnUpload="Posting" Requirments={[addHeading, addDescription, addImg ]} isProcessing={isPosting} />
         
                  {/* { 
                  addHeading.length == 0 | addDescription.length == 0 | addImg.length == 0  ?
                  ( <input type="submit" value="Add Post" disabled className='px-4 py-2 rounded shadowe my-3  bg-violet-300 text-white font-bold' />)
          :(
            isPosting ?(<input type="submit" value="Posting" disabled className='px-4 py-2 rounded shadowe my-3  bg-violet-300 text-white font-bold' />)
            :
         (<input type="submit" value="Add Post" className='px-4 py-2 rounded shadowe my-3  bg-violet-500 text-white font-bold' />)

          )
           } */}
          </form>
        </div>

}
        
        <div className='flex flex-wrap gap-[40px] items-center justify-center md:mx-[2%] my-[3%]'>
        {
          arrayPostData.map((eachPost)=>[
            <div key={eachPost._id} className={`w-full max-w-[400px] rounded-lg overflow-hidden ${theme ? 'bg-gray-780'
           : 'bg-white' 
          }`} >
           <div>
           <Link to={`/post/${eachPost._id}`}>

            <div className='w-full h-[256px] overflow-hidden' style={{backgroundImage: `url(${eachPost.image})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat', }}> 
            {/* <img className='w-full' src={eachPost.image} alt="" /> */}
            </div>
           </Link>

            {/* <div className='flex gap-[10px] items-start mt-[10px] px-[5px]' >
            <h3 className='text-slate-500 text-[17px] w-[150px]'>
            {new Date(eachPost.timeStamp).toLocaleString('en-US', { month: 'long' })}{' '}
            { new Date(eachPost.timeStamp).getDay()} , {new Date(eachPost.timeStamp).getFullYear()}</h3>
            <div className='flex flex-wrap gap-[5px] '>
               {eachPost.tags.map((eachtag, index) => (
             <div className='flex items-center gap-[4px]'> 
              <i className='text-[#5333F2] fa fa-tag ' >
              </i>

               <h1 key={index} className=' text-xl font-medium text-gray-900 mt-5'>
               { eachtag.tag}
              
              </h1>
             </div>
            ))}
               </div>
            </div> */}
            <div className='p-[5px] mt-5'>
              <h1 className={`${theme ? 'text-white' :'text-gray-90' } font-medium 0 text-xl`}>
              {eachPost.heading}
              </h1>
              <p className={` mt-2 text-base leading-relaxed text-gray-400 h-[200px] overflow-hidden`}> {eachPost.description}</p>
            </div>
            </div>

          </div>
          ])
            
        }
        </div>
      </div>
    )
}

export default LatestPost