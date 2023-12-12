import React, { useState, useRef, useEffect ,useContext} from 'react';
import { Link } from 'react-router-dom';
import logo from "../img/image 1.jpg"
import {GlobalContext}from '../context/context'
import axios from 'axios';

import css from "../css/Navcomponent.css"
function Navcomponent({islogin , img  ,changeCss , theme}) {
 const {state , dispatch}= useContext(GlobalContext)
  const [isResponsiveNavOpen ,setisResponsiveNavOpen] =useState(false)
  const [openNotification , setOpenNotification] = useState(false)
  changeCss = true

  const navbarRef = useRef();
  const [scrolled , setScrolled] = useState()
  const [NotificationArray , setNotificationArray] = useState([])
 const logoutHandler = async(e)=>{
  try {
   const res =await axios.get("http://localhost:2344/user-logout")
   dispatch({
    type:'USER_LOGOUT'
   })
   
  } catch (error) {console.log(error)
    
  }
 }
  const themeHandler = (e)=>{
    e.preventDefault()
    dispatch({
      type: "CHANGE_THEME",
      
    });
  }
  const NotificationHandle = async()=>{
    try {
      const res = await axios.get("http://localhost:2344/notifications")
       setNotificationArray(res?.data)
       console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const updateNotificationHandler = async(notifyId)=>{
    try {
      const res = await axios.put(`http://localhost:2344/updateNotifyStatus/${notifyId}`)
    } catch (error) {
      
    }
  }
  useEffect(() => {

    const handleScroll = () => {
      if ((window.scrollY + 90 ) > navbarRef?.current?.clientHeight) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(()=>{
console.log(NotificationArray)
  },[NotificationArray])
    return (
      <nav 
      ref={navbarRef}
      className={`fixed flex items-center justify-between px-[3%] py-[20px] w-full z-[1000] ${scrolled && 'shadow-[0px_4px_10px_#0000005c]'}
      
      ${theme ? 'bg-gray-800 text-white' : changeCss ?  "bg-white text-black" : ' bg-[#0000001c] text-white'}`}>
        <div className='flex items-center gap-[100px]'>
            <div className='w-[60px] h-[60px] overflow-hidden rounded-full'>
              <Link to='/'>
          
              <img className='w-full' src={logo} alt="" />

            

              </Link>
             
            </div>
            <ul className='flex items-center  gap-[30px] text-[18px] right-ul'>
                <li className=''><Link to="/work" className='hover:text-violet-500 font-[600]'>PROJECTS</Link></li>
                <li className='max-[600px]:hidden'><Link to='/article' className='hover:text-violet-500  font-[600]'>ARTICLES</Link></li>
                <li className='max-[650px]:hidden'><Link to='/Ai projects' className='hover:text-violet-500 font-[600]'>MY BOTS</Link></li>
                <li className='max-[700px]:hidden'><Link to="/hire-me" className='hover:text-violet-500 font-[600]'>HIRE ME</Link></li>
            </ul>
        </div>
        <div className='leftul'>
<ul className='relative flex items-center gap-[30px]  text-[18px]'>
  <li><button className='rounded-full w-[50px] h-[50px] p-[10px] flex justify-center items-center overflow-hidden bg-[##0000ff38]'
  onClick={themeHandler}

  >
  <i className='bi bi-moon'>

  
  </i></button></li>
<li className=''><Link to='/' className='hover:text-violet-500 font-[600]'>ABOUT</Link></li>
<li className=''><Link to='/' className='hover:text-violet-500 font-[600]'>CONTACT</Link></li>
{ islogin === "admin" ?
  (<>
      <li className=''><Link to='/dashboard' className='text-violet-500'>Dashboard</Link></li>
      <li className=''><button
      onClick={()=>{
        setOpenNotification(openNotification ? false : true)
  NotificationHandle()

      }}
      ><i className='bi bi-bell-fill'></i></button></li>
      {
        openNotification &&
        <div className='flex text-[black] flex-col gap-[10px] overflow-scroll w-[300px] h-[300px] bg-white rounded absolute right-[30px] top-[80px]'>
        
        {
          NotificationArray?.map((noti)=>[
            <div
            onClick={()=>{updateNotificationHandler(noti._id)}}
            key={noti._id} className='flex justify-between items-center border-b pb-[10px] px-[10px]'>
          <h1><Link to={"/article"/noti.link}>{noti.title}</Link></h1>
          
          {
            noti.Status === "pending" &&
          <span className='w-[10px] h-[10px] p-[3px] bg-violet-500 rounded-full'></span>
            
          }
        </div>
          ])
        }
      </div>
      }
      
    </>)
: islogin === "user" ?
(<>
  <li className='text-[20px]'><button onClick={logoutHandler}>Logout</button></li>
  
  </>)

:
(
  <>
  <li className=''><Link to='/register' className='text-violet-500'>Signup</Link></li>
<li className=''><Link to="/login" className='text-violet-500'>login</Link></li></>
)
}


</ul>
        </div>
        <div className='min-[1100px]:hidden block' >
        <i className={`text-xl hover:text-violet-500 fa ${isResponsiveNavOpen ? 'fa-times' : 'fa-bars'}`}
        onClick={(e)=>{
          isResponsiveNavOpen ? setisResponsiveNavOpen(false) :  setisResponsiveNavOpen(true) 
        }}
        ></i>
      
        </div>
        { isResponsiveNavOpen &&  
        <ul className={`${theme ? 'text-white bg-gray-700' :'text-black'} min-[1100px]:hidden flex z-[300] fixed bg-white p-[20px] shadow flex-col items-center gap-[30px] font-semibold top-[0px] right-[0px] w-[100%] min-[700px]:w-[500px] text-[18px] ulis`}>

<div className='relative w-full'><i className={` absolute top-[3px] l-[3px] fa fa-times `}
onClick={(e)=>{
 setisResponsiveNavOpen(false)
}}
></i></div>
<li><button className='rounded-full w-[50px] h-[50px] p-[10px] flex justify-center items-center overflow-hidden bg-[##0000ff38]'
  onClick={themeHandler}

  >
  <i className='bi bi-moon'>

  
  </i></button></li>
<li className='max-[600px]:block hidden'
onClick={()=>{
  setisResponsiveNavOpen(false)
}}
><Link to='/work'>Projects</Link></li>
        <li className='max-[650px]:block hidden'
        onClick={()=>{
          setisResponsiveNavOpen(false)
        }}
        ><Link to='/article' >Articles</Link></li>
        <li className='max-[700px]:block hidden'
        onClick={()=>{
          setisResponsiveNavOpen(false)
        }}
        ><Link to='/notes'>Notes</Link></li>
        <li className='max-[700px]:block hidden'
        onClick={()=>{
          setisResponsiveNavOpen(false)
        }}
        ><Link to='/hire-me'>Hire Me</Link></li>

{ islogin ?
(<>
<button onClick={logoutHandler}>Logout</button>

</>)
:
(
<>
<li className=''><Link to='/register'>Signup</Link></li>
<li className=''><Link to="/login">login</Link></li></>
)
}


</ul>}
      </nav>
    )
}

export default Navcomponent 