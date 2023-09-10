import React,{useEffect ,useState , useRef} from 'react';
import { useParams , Link } from 'react-router-dom';
import dp from "../img/image 1.jpg"
import axios from 'axios';
import LoadingComponent from './Loading';
import Errormsg from './errorcomponent';
function PostPage () {
    const [data , setdata] = useState([])
const  {postId}  = useParams();
        const [relatedPost , setRelatedPost]= useState([])
        const [isLoading , setIsLoading] = useState(true)
        const [isRelatedPostLoading , setIsRelatedPostLoading] = useState(true)

        const [errorhandle ,setErrorHandle] = useState(false)

useEffect(()=>{
  setIsLoading(true)

  axios.get(`http://localhost:5000/post/${postId}`)
           
  .then((res)=>{
      setdata(res.data)
      console.log(data)

      setTimeout(() => {
        
      },2000);
})
  .catch((e)=>{console.log(e)

    // ErrorRef.current(true)
    setErrorHandle(true)

  })
  .finally(()=>{
    setIsLoading(false)

  })
  
},[postId])
useEffect(()=>{
  setInterval(() => {
    axios.get(`http://localhost:5000/posts`)
           
  .then((res)=>{

    
    
  
      setRelatedPost(res.data)
    

      
})
  .catch((e)=>{console.log(e)
  setErrorHandle(true)

  }).finally(()=>{
    setIsRelatedPostLoading(false)


  })
  }, 5000);

},[])
const filterpost = relatedPost.filter((post)=>post._id !== postId)
const slicedRelatedPosts = filterpost.slice(0, 3);
  return (
  <>
   {isLoading ?
   (
    <LoadingComponent isLoading={isLoading}/>
   )
   :
   (
   <>  
  { errorhandle?
   (<Errormsg isError={errorhandle} note='network error please check your Internet connection or try again' /> )
   :
  ( <div className='flex flex-col items-center'>
    
     <div className='mx-[4%] w-[95%]  my-16 max-w-[1100px]'>
     <h1 className='font-bold text-[34px] mb-3'>{data.heading}</h1>
     <h3 className='text-slate-500 text-[19px] mt-[15px]'>
            {new Date(data.timeStamp).toLocaleString('en-US', { month: 'long' })}
            {' '}
            { new Date(data.timeStamp).getDay()} , {new Date(data.timeStamp).getFullYear()}
            
            </h3>
      <div className='h-[500px]  flex justify-center items-center w-full'>
        <img className='h-[inherit]' src={data.image} alt="" />
      </div>
    
    <p className='text-[20px] my-10'>{data.description}</p>

    <ul className='flex flex-wrap gap-[20px]'>

{data.tags && data.tags.map((eachtag, index) => (

<li key={index} className='text-white text-sm font-semibold bg-[#BC7AFF] py-2 px-4 rounded-full'>
            {eachtag.tag}
          </li>
        ))}
</ul>
      </div>
      <div className='flex flex-wrap gap-[40px] items-center justify-center md:mx-[2%] my-[3%]'>
        {
          isRelatedPostLoading?(<LoadingComponent isLoading={isLoading?false:isRelatedPostLoading} />)
          :(slicedRelatedPosts.map((eachPost)=>[
            <div
            onClick={(e)=>{
              e.preventDefault()
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
              setIsLoading(true)
            }} key={eachPost._id} className='w-full max-w-[400px]  flex flex-col justify-between overflow-hidden ' >
           <Link to={`/post/${eachPost._id}`}>
           <div>
            <div className='w-full h-[320px] overflow-hidden' style={{backgroundImage: `url(${eachPost.image})`,backgroundSize: 'cover', backgroundRepeat: 'no-repeat', }}> 
            {/* <img className='w-full' src={eachPost.image} alt="" /> */}
            </div>
            <h3 className='text-slate-500 text-[19px] mt-[15px]'>
            {new Date(eachPost.timeStamp).toLocaleString('en-US', { month: 'long' })}{' '}
            { new Date(eachPost.timeStamp).getDay()} , {new Date(eachPost.timeStamp).getFullYear()}</h3>

            <div className='p-[5px] mt-5'>
              <h1 className='text-[32px] font-bold leading-[1.25] mb-2 h-[180px] overflow-hidden'>
              {eachPost.heading}
              </h1>
              <p className='font-regular text-[20px] leading-[] h-[270px] overflow-hidden'> {eachPost.description}</p>
              <div>
               <div className='flex flex-wrap gap-[10px] my-1'>
               {eachPost.tags.map((eachtag, index) => (
              <h1 key={index} className='text-white text-sm font-semibold bg-[#BC7AFF] py-2 px-4 rounded-full'>
                {eachtag.tag}
              </h1>
            ))}
               </div>
              </div>
            </div>
            </div>
           </Link>

          </div>
          ]))
            
        }
        </div>
    </div>)
    }
   </> 
   )
    
    
    }
  </>
  );
}

export default PostPage;
