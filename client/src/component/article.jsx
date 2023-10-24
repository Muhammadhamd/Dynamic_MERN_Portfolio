import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import SubmitBtn from './submitbtn';
import { useNavigate, useLocation , Link} from 'react-router-dom';
import LoadingComponent from './Loading';
import dp from '../img/image 1.jpg'
import PopUpMessage from './heading';
function ArticlesPage({theme}){
 const [articleArray , setArticlearray] = useState([])
 const [rerender , setrerender] = useState(false)
 const [loading , setloading] = useState(true)
// const SearchHandler = (e) => {
//   e.preventDefault();
  
//   setisloading(true)

//   const encodedSearchInput = encodeURIComponent(searchInput);
//   navigate(`/store/Children?s=${encodedSearchInput}`);
//   axios.get(`/posts/children?s=${searchInput}`)
//     .then((res) => {
//       setProducts(res.data);
//       console.log(res.data)
//   setfound404(false)

//       // Update the URL without triggering a full page reload
//     })
//     .catch((e) =>{ console.log(e)
//     setfound404(e.message)
//     console.log(found404)
//     })
//     .finally(()=>{
//   setisloading(false)

//     })
// }



// const searchQuery = new URLSearchParams(location.search).get('s');

// useEffect(()=>{
//   console.log(searchQuery, "amd searced bi" ,searchInput)
//   setSearchInput(searchQuery || '')
  
//   setisloading(true)
// axios.get(`/posts/children?s=${searchQuery || ""}`)
// .then((res)=>{
//   console.log(res.data)
//   setProducts(res.data)
//   console.log(products)
//   setfound404(false)
// })
// .catch((e)=>{console.log(e)
//   setfound404(e.messege)
// })
// .finally(()=>{
//   setisloading(false)

// })
// },[])


  const renderParagraph =(content)=>{
    const paragraphRegex = /''(.*?)''/g;
     const match = paragraphRegex.exec(content)
     if (match) {
      return match[1]
      console.log(match[0])
     }else{
      return null
     }
  }
const renterArticles = async()=>{
  try {
    const res = await axios.get("/posts" ,{withCredentials:true})
  
    setArticlearray(res.data)
    setrerender(true)
    setloading(false)
  } catch (error) {
    console.log(error)
    setloading(false)

  }
 
}

useEffect(()=>{
 renterArticles()
},[rerender])

    return(

    
     

      <div className={`${theme ? ' bg-gray-900' : 'bg-[#f5f7f9]'}   py-[50px]`}>

      <div className='mt-[120px] ml-8 '>
        {
          loading ? 
          <div className='flex jsutify-center items-center h-[100vh] w-full'>
            <LoadingComponent isLoading={loading} />
          </div>
         :
         <>
         <div className='flex'>
        <PopUpMessage message="Coding Articles" theme={theme} />
        </div>
      
        <div className='flex flex-col items-left gap-[20px] max-w-[950px] w-full mt-[30px]'>
          {articleArray.map((data , index)=>(
            <div key={index} className={`px-6 md:px-10 py-8  rounded-lg shadow-mdd max-w-[820px] w-full ${theme? 'bg-slate-700' : 'bg-white'}`}>
                  <h1 className={`text-xl md:text-3xl font-bold ${ theme? 'text-white': 'text-gray-800'}`}>
                    <Link to={`/article/${data.ArticleUrl}`}>{data.heading}</Link>
                  </h1>
                  <div class="flex my-2 items-center"><div class="h-4 w-4 md:h-8 md:w-8 overflow-hidden rounded-full">
                    <a href="https://www.codewithharry.com/" class="block w-full h-full text">
                      
                      <img alt="Muhammad Hamd's photo" src={dp} class="w-full h-full object-cover"/>
                    </a>
                  </div>
                  <Link to={`/`} class={`text-xs md:text-sm ${theme ? 'text-white': 'text-slate-900'}  hover:text-purple-700 transition ease-in-out duration-150 mx-1`}>Muhammad Hamd</Link>
                  <span class={`mx-1 block font-bold ${theme?'text-gray-400':'text-slate-500'} md:block`}>·</span>
                  <span class={`text-xs md:text-sm ${theme? 'text-gray-400' : 'text-gray-600'}`}>
                    {new Date(data.timeStamp).toLocaleString('en-US', { month: 'long' })}{' '}
            { new Date(data.timeStamp).getDate()} , {new Date(data.timeStamp).getFullYear()}</span>
           </div>
           <p class={`text-sm mt-2 md:text-[18px] leading-[30px]  ${theme? 'text-gray-400':'text-black'}`}>
           {/* In India, the popularity of online trading has helped transform the financial landscape. This has led to over 20% of all trading is now done via mobile through trading apps. In line with this, another development many traders have highlighted is the use of algorithmic trading systems to take advantage of ever-changing market opportunities. To date, algorithmic trading systems are used in up to 60% of all trading volume. */}
           {
            renderParagraph(data.content)
           }
           </p>
           <button className={`px-3 py-3 rounded shadow bg-violet-500 my-[15px] text-white font-semibold text-sm`}><Link to={`/article/${data.ArticleUrl}`}>READ MORE</Link></button>
          </div>
          ))}
        
        
        </div>
         </> 
        }
        
      </div>

      </div>
     
  
    )
}

export default ArticlesPage