import React,{useEffect ,useState , useRef} from 'react';
import { useParams , Link } from 'react-router-dom';
import dp from "../img/image 1.jpg"
import axios from 'axios';
import LoadingComponent from './Loading';
import Errormsg from './errorcomponent';
import CodeSnippet from './codesniped';
// import ReplyCommentForm from './replyCommentForm';

function PostPage ({theme , content}) {
const [rerender , setrerender] =useState(false)

    const [data , setdata] = useState([])
    const [comments , setcomments] = useState([])
    const [openReply , setOpenReply] = useState([])
    const [openReplyForm , setOpenReplyForm] = useState([])
const  {postId}  = useParams();
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



        
            const codeRegex =/'`([\s\S]*?)`'/g; // Use triple backticks for code snippets
          
            const parts = content?.split(codeRegex);
            const processedContent = parts?.map((part, index) => {
              if (index % 2 === 0) {
                // Text outside code blocks (using dangerouslySetInnerHTML)
                return (
                    <div
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: part
                          .replace(headingRegex, '<h1 class="text-3xl max-[650px]:text-2xl font-semibold mt-4 w-full">$1</h1')
                          .replace(linebreak, '<br>')
                          .replace(paragraphRegex, '<p class="text-[16px] max-[650px]:text-[15px] my-3  leading-[30px]">$1</p>')
                          .replace(linkRegex, '<a class="text-white" href="$1">$1</a>')
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
        
        
useEffect(()=>{
  setIsLoading(true)

  axios.get(`/post/${postId}` ,{withCredentials:true})
           
  .then((res)=>{
      setdata(res.data)
      console.log(data)

      setcomments(res.data?.comments)

      
})
  .catch((e)=>{console.log(e)

    // ErrorRef.current(true)
    setErrorHandle(true)

  })
  .finally(()=>{
    setIsLoading(false)

  })
  
},[postId])
const addComment = async(e)=>{
e.preventDefault()
setrerender(true)
  try {
    const res = await axios.post(`/addcomment/${data._id}`,{
      message: commentRef.current.value
    },{withCredentials:true})
    console.log(res)
    setcomments((comments)=>[...comments , res.data.data])
    setrerender(false)
  } catch (error) {
    console.log(error)
    setCommentmsg(error.response.data)
  }
}


useEffect(()=>{
  console.log(data)
  document.title = data.heading
},[data])
useEffect(()=>{
},[openReply])
useEffect(()=>{
  },[openReplyForm])
useEffect(()=>{
console.log(comments)
},[comments])

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


useEffect(()=>{
  console.log(comments)
  },[rerender])
  return (
  <div className={`${theme ? 'bg-gray-900' : 'bg-gray-50'}`}>
   {/* {isLoading ?
   (
    <LoadingComponent isLoading={isLoading}/>
   )
   :
   (
   <>  
  { errorhandle?
   (<Errormsg isError={errorhandle} note='network error please check your Internet connection or try again' /> )
   : */}
  
   <div className='flex flex-col items-center lg:min-h-screen '>
   <div className={`mt-[130px]  mx-auto max-w-[1000px] min-[1030px]:w-full w-[95%] flex flex-col items-center ${theme? 'bg-gray-800': 'bg-white'}   rounded-lg shadow-md p-6 lg:p-10`}>

<h1 className={`text-xl md:text-4xl font-bold ${ theme? 'text-white': 'text-gray-800'}`}>
                {data.heading}
               </h1>
               <div class="flex my-2 items-center"><div class="h-4 w-4 md:h-8 md:w-8 overflow-hidden rounded-full">
                    <a href="/" class="block w-full h-full text">
                      
                      <img alt="Muhammad Hamd's photo" src={dp} class="w-full h-full object-cover"/>
                    </a>
                  </div>
                  <Link to={`/`} class={`text-xs md:text-sm ${theme ? 'text-white': 'text-slate-900'}  hover:text-purple-700 transition ease-in-out duration-150 mx-1`}>Muhammad Hamd</Link>
                  <span class={`mx-1 block font-bold ${theme?'text-gray-400':'text-slate-500'} md:block`}>·</span>
                  <span class={`text-xs md:text-sm ${theme? 'text-gray-400' : 'text-gray-600'}`}>
                    
                  {new Date(data.timeStamp).toLocaleString('en-US', { month: 'long' })}{' '}
            { new Date(data.timeStamp).getDay()} , {new Date(data.timeStamp).getFullYear()}
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
  <div className='flex flex-col gap-[30px]'>
    {
      comments?.length >0 ?
      [...comments].reverse().map((comment)=>[
          <div className='flex w-full gap-[10px] items-start'>
        <div className='w-[50px] h-[50px] rounded-full overflow-hidden'>
        <img src={dp} alt=""  className='w-full'/>
        </div>
        <div className='w-full'>
        <div className={` py-[10px] px-[15px] max-w-[500px]   shadow-xl  rounded-lg ${theme?'bg-slate-700':'bg-white'}`}>
      
      <div className='flex justify-between w-full gap-[30px]'>
        <h1 class={`text-xs md:text-sm ${theme ? 'text-white': 'text-slate-900'}  hover:text-purple-700 transition ease-in-out duration-150 mx-1`}>{comment.authorName}</h1>
        
      <small class={` my-[5px] text-[10px] ${theme? 'text-gray-400' : 'text-gray-600'}`}>
                      
                      {new Date(comment.timeStamp).toLocaleString('en-US', { month: 'long' })}{' '}
                { new Date(comment.timeStamp).getDay()} , {new Date(comment?.timeStamp).getFullYear()}</small>
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
class={`mt-4 text-xs md:text-[11px] ${theme ? 'text-slate-1000': 'text-slate-900'}  hover:text-purple-700 transition ease-in-out duration-150 mx-1`}>Reply</button>
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
        <img src={dp} alt=""  className='w-full'/>
        </div>
        <div className='w-full'>
        <div className={` py-[10px] px-[15px] max-w-[500px]   shadow-xl  rounded-lg ${theme?'bg-slate-700':'bg-white'}`}>
      
      <div className='flex justify-between w-full gap-[30px]'>
        <h1 class={`text-xs md:text-sm ${theme ? 'text-white': 'text-slate-900'}  hover:text-purple-700 transition ease-in-out duration-150 mx-1`}>{reply.authorName}</h1>
        
      <small class={` my-[5px] text-[10px] ${theme? 'text-gray-400' : 'text-gray-600'}`}>
                      
                      {new Date(reply.timeStamp).toLocaleString('en-US', { month: 'long' })}{' '}
                { new Date(reply.timeStamp).getDay()} , {new Date(reply?.timeStamp).getFullYear()}</small>
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
    {/* } */}
   {/* </>  */}
  {/* //  ) */}
    
    
    {/* // } */}
  </div>
  );
}


export default PostPage;
