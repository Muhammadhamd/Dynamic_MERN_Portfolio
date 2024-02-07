import React,{useEffect ,useState , useRef, useContext} from 'react';
import { useParams , Link } from 'react-router-dom';
import dp from "../img/image 1.jpg"
import avatar from "../img/Commentavatar.png"
import axios from 'axios';
import css from "../css/post.css"
import LoadingComponent from './Loading';
import Errormsg from './errorcomponent';
import CodeSnippet from './codesniped';
import { GlobalContext } from '../context/context';
import ImageModal from './openImageModal';
// import ReplyCommentForm from './replyCommentForm';

function PostPage ({theme , content , isAdmin}) {
  const {state} =useContext(GlobalContext)
const [rerender , setrerender] =useState(false)
const [openOption ,setOpenOption] = useState(false)

    const [data , setdata] = useState([])
    const [comments , setcomments] = useState([])
    const [openReply , setOpenReply] = useState([])
    const [openReplyForm , setOpenReplyForm] = useState([])
    const  {postId}  = useParams();
    const CommentQuery = new URLSearchParams(window.location.search).get("C") || new URLSearchParams(window.location.search).get("c");
    const TargetedComment = useRef()
    

   
    const commentRef = useRef(null)
    const [commentMsg , setCommentmsg] = useState(null)

        const [relatedPost , setRelatedPost]= useState([])
        const [isLoading , setIsLoading] = useState(true)
        const [isRelatedPostLoading , setIsRelatedPostLoading] = useState(true)

        const [errorhandle ,setErrorHandle] = useState(false)
        const renderContent = (content) => {
          const headingRegex = /``(.*?)``/g;
          const paragraphRegex = /''(.*?)''/g;
          const linkRegex = /<l>(.*?)<\/l>/g;
          const linebreak = /<lb>(.*?)/g;



        
          const codeRegex = /<pre>([\s\S]*?)<\/pre>/g; // Use triple backticks for code snippets
          
            const parts = content?.split(codeRegex);
            const processedContent = parts?.map((part, index) => {
              if (index % 2 === 0) {
                // Text outside code blocks (using dangerouslySetInnerHTML)
                return (
                    <div
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: part
                        
                      }}
                    />
                  );
              } else {
                // Code blocks
                return (
                  <pre className='bg-'>
                  <CodeSnippet code={part}/>
                  </pre>
                );
              }
              return part;
            });
          
            return <div>{processedContent}</div>;
       
          


   
        
      
        }
        const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
const openModal = (imageUrl) => {
  setSelectedImage(imageUrl);
  setShowModal(true);
};

const closeModal = () => {
  setSelectedImage(null);
  setShowModal(false);
};
        
useEffect(()=>{
  setIsLoading(true)
  axios.get(`/post/${postId}` ,{withCredentials:true})
           
  .then((res)=>{
      setdata(res?.data)
      if (res?.data?.comments?.length) {
        res?.data?.comments?.unshift(res?.data?.comments?.splice(res?.data?.comments?.findIndex((each)=> each?.id == CommentQuery) ,1)[0])
      
       
      setcomments(res.data?.comments)
        
      }

      
})
  .catch((e)=>{
    console.log(e)
    setdata({error:e.response?.data})

    // ErrorRef.current(true)
    setErrorHandle(true)

  })
  .finally(()=>{
    setIsLoading(false)

  })
  
},[postId ,CommentQuery])
const addComment = async(e)=>{
e.preventDefault()
setrerender(true)
  try {
    const res = await axios.post(`/addcomment/${data._id}`,{
      message: commentRef.current.value
    },{withCredentials:true})
    console.log(res)
    setcomments((comments)=>[...comments , res?.data?.data])
    setrerender(false)
  } catch (error) {
    console.log(error)
    setCommentmsg(error.response.data)
  }
}


useEffect(()=>{
  document.title = data.heading
},[data])
useEffect(()=>{
},[openReply])
useEffect(()=>{
  },[openReplyForm])
useEffect(()=>{
},[comments])

useEffect(()=>{

  
  if (CommentQuery) {
  TargetedComment.current =  document.getElementById(comments?.find((each)=> each?.id == CommentQuery)?.id)

    if (TargetedComment) {
      const y = commentRef.current?.getBoundingClientRect().top + window.pageYOffset;
      console.log(y)
      window.scrollTo({top:y,behavior:'smooth'})
    }
   
  }
 
  
},[comments,CommentQuery])

const filterpost = relatedPost.filter((post)=>post._id !== postId)
const slicedRelatedPosts = filterpost.slice(0, 3);

function ReplyCommentForm({postId,theme , commentid , authorName}){

  const [commentMsg ,setCommentMsg] = useState(null)
  setrerender(true)
  const replyRef = useRef(null)
  const addCommentReply =async(event)=>{
      event.preventDefault()
      console.log(commentid)
      try {
        const res = await axios.post(`/addReply/${postId}/${commentid}`,{
          reply:replyRef.current.value
        })
        console.log(res)
        const findComment = comments.findIndex((comment) => comment.id === commentid);

        if (findComment !== -1) {
          comments[findComment] = {
            ...comments[findComment],
            replies: [...(comments[findComment].replies || []), res.data],
          };
          setrerender(false)
        }
          
      } catch (error) {
        console.log(error)
        setCommentMsg(error.message)
      }
      
      }

      
     
  return( 
      <form onSubmit={addCommentReply} className={`w-full mx-auto max-w-[500px] md:mt-[90] mt-[40px] mb-[30px]  shadow-xl mx-4 md:mx-16 lg:mx-0 mb-4 rounded-lg px-2 pt-2 ${theme?'bg-slate-700':'bg-white'}`}>
      <div>
        <h2 className={`px-2 pt-1 pb-1  text-base  my-2 ${theme?'text-gray-300':'text-gray-800'}`}>Reply to {authorName}</h2>
        <textarea name="" ref={replyRef} placeholder='Type Your Comment' required id="" className={`rounded border border-gray-400 leading-normal resize-none w-full h-15 py-2 px-3 font-regular  focus:outline-none   ${theme ? ' text-gray-200 placeholder-gray-400 bg-slate-600':'focus:bg-white bg-gray-100   placeholder-gray-700'} `}></textarea>
        <div className='text-sm text-violet-300'>{commentMsg ? commentMsg : ""}</div>
        <button className={`text-sm font-white bg-violet-500 rounded shadow px-3 py-2 my-[10px] text-white` }>Post Comment</button>
      </div>
      </form>
  )
}

const DeletePost = async()=>{
  try {
    const res = await axios.delete(`/deleteArticle/${data._id}`,{withCredentials:true})
    console.log(res)
    window.location.reload()
  } catch (error) {
    console.log(error)
  }
}
const editPost = async()=>{

}

useEffect(()=>{
  console.log(comments)
  },[rerender])
  return (
  <div className={`${theme ? 'bg-gray-900' : 'bg-gray-50'}`}>
  
  {
    data?.heading ?
    <div className=' flex flex-col items-center lg:min-h-screen '>
      
   <div className={`relative mt-[130px]  mx-auto max-w-[1000px] min-[1030px]:w-full w-[95%] flex flex-col items-center ${theme? 'bg-gray-800': 'bg-white'}   rounded-lg shadow-md p-6 lg:p-10 post`}>
    {
      isAdmin ?
      <div className={`flex flex-col w-full absolute right-[0px] top-[10px] items-end  ${ theme? 'text-white': 'text-gray-800'}`}>
        <button className='text-xl font-semibold flex items-center mx-[20px]'
        onClick={()=>{
          setOpenOption(openOption ? false : true) 
        }}
        >...</button>
        {
          openOption ?
          <div className={`flex flex-col p-[10px] mr-[10px] ${theme ? "bg-gray-900":"bg-gray-400"}`}>
          <button onClick={DeletePost}>delete</button>
          <button onClick={editPost}>Edit</button>
        </div>
        :null
        }
       
      </div>
      :null
    }

   

<h1 className={`text-xl md:text-4xl font-bold ${ theme? 'text-white': 'text-gray-800'}`}>
                {data.heading}
               </h1>
               <div class="flex my-2 items-center"><div class="h-4 w-4 md:h-8 md:w-8 overflow-hidden rounded-full">
                    <a href="/" class="block w-full h-full text">
                      
                      <img alt={`${state?.PersonalData?.name}'s photo`} src={state?.PersonalData?.dp} class="w-full h-full object-cover"/>
                    </a>
                  </div>
                  <Link to={`/`} class={`text-xs md:text-sm ${theme ? 'text-white': 'text-slate-900'}  hover:text-purple-700 transition ease-in-out duration-150 mx-1`}>Muhammad Hamd</Link>
                  <span class={`mx-1 block font-bold ${theme?'text-gray-400':'text-slate-500'} md:block`}>·</span>
                  <span class={`text-xs md:text-sm ${theme? 'text-gray-400' : 'text-gray-600'}`}>
                    
                  {new Date(data.timeStamp).toLocaleString('en-US', { month: 'long' })}{' '}
            { new Date(data.timeStamp).getDate()} , {new Date(data.timeStamp).getFullYear()}
            </span>
            
           </div>
           <div className={`cont w-full  leading-relaxed ${theme? 'text-gray-100':'text-dark'} `}>
            <div className='flex justify-center w-full mt-[20px] my-[10px]'>
            <div className='max-w-[350px] rounded-[5px] overflow-hidden'>
            <img className='w-full' src={data.image} alt="" />
            </div>
            </div>
          {renderContent(data.content)}
           </div>
</div>
<form onSubmit={addComment} className={`w-full mx-auto max-w-[1000px] md:mt-[90] mt-[40px] mb-[30px]  shadow-xl mx-4 md:mx-16 lg:mx-0 mb-4 rounded-lg px-4 pt-2 ${theme?'bg-slate-700':'bg-white'}`}>
<div>
  <h2 className={`px-4 pt-3 pb-2  text-lg lg:text-xl font-bold my-4 ${theme?'text-gray-300':'text-gray-800'}`}>Add a new comment</h2>
  <textarea name="" ref={commentRef} placeholder='Type Your Comment' required id="" className={`rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium  focus:outline-none   ${theme ? ' text-gray-200 placeholder-gray-400 bg-slate-600':'focus:bg-white bg-gray-100   placeholder-gray-700'} `}></textarea>
  <div className='text-sm text-violet-300'>{commentMsg ? commentMsg : ""}</div>
  <button className={`text-sm font-white bg-violet-500 rounded shadow px-3 py-2 my-[15px] text-white` }>Post Comment</button>
</div>
</form>

<div className='mx-auto max-w-[1000px] w-full'>
  <h1 className={`px-4 pt-3 pb-2  text-lg lg:text-3xl font-bold my-4 ${theme?'text-gray-300':'text-gray-800'}`}> Comments</h1>
  <div className='flex flex-col gap-[20px]'>
    {
      comments?.length >0 ?
      comments.map((comment)=>[
          <div id={comment.id} className='flex w-full gap-[15px] items-start'>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
        <img src={avatar} alt=""  onClick={()=>{openModal(avatar)}}  className='w-full'/>
        </div>
        <div className='w-full'>
        <div className={` py-[10px] px-[15px] max-w-[500px]   shadow-xl  rounded-lg ${theme?'bg-slate-700':'bg-white'}`}>
      
      <div className='flex justify-between w-full gap-[30px]'>
        <h1 class={`text-xs md:text-sm ${theme ? 'text-white': 'text-slate-900'}  hover:text-purple-700 transition ease-in-out duration-150 mx-1`}>{comment.authorName}</h1>
        
      <small class={` my-[5px] text-[10px] ${theme? 'text-gray-400' : 'text-gray-600'}`}>
                      
                      
                
                {new Date(comment.timestamp).toLocaleString('en-US', { month: 'long' })}{' '}
            { new Date(comment.timestamp).getDate()} , {new Date(comment.timestamp).getFullYear()}
            </small>
      </div>
           <p className={` text-base ${theme?'text-gray-300':'text-gray-800'}`}>{comment?.text}</p>
<div className='flex gap-[10px]'>
<button 
onClick={() => {
  if (openReplyForm.includes(comment.id)) {
    // If the comment's ID is already included, remove it
    setOpenReplyForm((openReplyForm) =>
      openReplyForm.filter((id) => id !== comment.id)
    );
  } else {
    // If the comment's ID is not included, add it
    setOpenReplyForm((openReplyForm) => [...openReplyForm, comment.id]);
  }
}}
class={`mt-8 text-sm md:text-[11px] text-white  px-2 py-1 rounded bg-violet-500 transition ease-in-out duration-150 mx-1`}>Reply</button>
<button onClick={() => {
    if (openReply.includes(comment.id)) {
      // If the comment's ID is already included, remove it
      setOpenReply((openReply) =>
        openReply.filter((id) => id !== comment.id)
      );
    } else {
      // If the comment's ID is not included, add it
      setOpenReply((openReply) => [...openReply, comment.id]);
    }
  }}
   class={`mt-4 text-xs md:text-[11px] ${theme ? 'text-slate-1000': 'text-slate-900'}  hover:text-purple-700 transition ease-in-out duration-150 mx-1`}>See All Reply</button>
  
  </div>          
           
        </div>
        {
          openReply.includes(comment.id) ?
          <div className='flex flex-col gap-[15px] mt-[20px] ml-[20px]'>
            {
               comment?.replies?.length > -1 ?
              [...comment.replies].reverse().map((reply)=>(
<div className='flex w-full gap-[10px] items-start'>
        <div className='w-[30px] h-[30px] rounded-full overflow-hidden'>
        <img 
        src={dp}
         alt=""  
        onClick={()=>{openModal(state?.PersonalData?.dp)}}
          className='w-full'/>
        </div>
        <div className='w-full'>
        <div className={` py-[10px] px-[15px] max-w-[500px]   shadow-xl  rounded-lg ${theme?'bg-slate-700':'bg-white'}`}>
      
      <div className='flex justify-between w-full gap-[30px]'>
        <h1 class={`text-xs md:text-sm ${theme ? 'text-white': 'text-slate-900'}  hover:text-purple-700 transition ease-in-out duration-150 mx-1`}>{reply.authorName}</h1>
        
      <small class={` my-[5px] text-[10px] ${theme? 'text-gray-400' : 'text-gray-600'}`}>
                      
                      {new Date(reply.timestamp).toLocaleString('en-US', { month: 'long' })}{' '}
                { new Date(reply.timestamp).getDay()} , {new Date(reply?.timestamp).getFullYear()}</small>
      </div>
           <p className={` text-base ${theme?'text-gray-300':'text-gray-800'}`}>{reply?.text}</p>
         
           
        </div>
     
        </div>
      
      </div>
              ))
              :
              "no reply"
            }
      
      
      </div>
      : null
        }
        <div>
          {
            openReplyForm.includes(comment.id) ?
           <ReplyCommentForm postId={data._id} commentid={comment.id} authorName={comment.authorName} theme={theme} />
           :
           null
          }
      
        </div>
      
        </div>
      
      </div>

      
      
      ])
      : "no comment"
    }
   
  </div>
</div>

     
      {/* <div className='flex flex-wrap gap-[40px] items-center justify-center md:mx-[2%] my-[3%]'>
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
            {/* <img className='w-full' src={eachPost.image} alt="" /> 
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
        </div> */}
    </div>
    : data?.error ?
    <div className=' flex flex-col items-center lg:min-h-screen '>
      
    <div className={`relative mt-[130px]  mx-auto max-w-[1000px] min-[1030px]:w-full w-[95%] flex flex-col items-center ${theme? 'bg-gray-800': 'bg-white'}   rounded-lg shadow-md p-6 lg:p-10`}>
    
    
<h1 className={`text-xl md:text-4xl font-semibold ${ theme? 'text-gray-400': 'text-gray-800'}`}>
                {data.error}
               </h1>

     
     </div>
     </div>

     :
    <div className=' flex flex-col items-center lg:min-h-screen '>
    <div className={`mt-[130px]  mx-auto max-w-[1000px] min-[1030px]:w-full w-[95%] flex flex-col items-center ${theme? 'bg-gray-800': 'bg-white'}   rounded-lg shadow-md p-6 lg:p-10 ` }>
 
 <h1 className={`bg-slate-200 h-[25px] w-[80%] rounded-full animate-pulse ${ theme? 'text-white ': 'text-gray-800'}`}>
                 
                                 </h1>
             
            <div className={` mt-[30px] animate-pulse max-w-[300px] h-[300px] rounded-lg bg-slate-400 cont w-full  leading-relaxed ${theme? 'text-gray-100':'text-dark'} `}>
            
           {renderContent(data.content)}
            </div>

            <div className='w-full'>
              <h1 className='animate-pulse w-[70%] my-[20px] rounded-full bg-slate-200 h-[20px]'></h1>
              <p className='animate-pulse w-[50%] my-[20px] rounded-full bg-slate-200 h-[10px]'>

              </p>
              <p className='animate-pulse w-[70%] my-[20px] rounded-full bg-slate-200 h-[10px]'>

              </p>
              <p className='animate-pulse w-[40%] my-[20px] rounded-full bg-slate-200 h-[10px]'>

              </p>
              <p className='animate-pulse w-[100%] my-[20px] rounded-full bg-slate-200 h-[10px]'>

              </p>

            </div>
 </div>


 
      
 
     </div>
    
  }
   
    {/* } */}
   {/* </>  */}
  {/* //  ) */}
    
    
    {/* // } */}
    {showModal && (
        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      )}
  </div>
  );
}


export default PostPage;
