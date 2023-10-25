import react, { useEffect, useRef, useState , useContext} from 'react'
import Navcomponent from './navbar'
import axios from 'axios'
import { useNavigate  } from 'react-router-dom';
import {GlobalContext} from "../context/context.jsx"

function UserLogin(){
  const { state , dispatch} = useContext(GlobalContext)

  const history = useNavigate()
    
 
    const passwordref = useRef(null)
    const emailref = useRef(null)

    const submitHandler = async(e)=>{
        e.preventDefault();
        console.log('eee')
        try {
          const response = await axios.post(
            '/userlogin',
            {
              email: emailref.current.value,
              password: passwordref.current.value,
            },
            {
              withCredentials: true, // Use withCredentials instead of withCredential
            }
          )
          .then((res)=>{
            console.log(res)
            dispatch({
              type: "USER_LOGIN",
              payload: res.data.data,
            });
            history("/")

          })
          .catch((e)=>{
            console.log(e)
          })
    
          // Handle response as needed
          console.log(response);
        } catch (error) {
          // Handle errors
          console.error(error);
        }
      };
    
     
    return(
        <>
        <Navcomponent changeCss={true}/>
        
          
        <div className='flex flex-col items-center '>
            <h1 className='font-bold text-6xl my-[20px]'>Login</h1>
            <form onSubmit={submitHandler} className='max-w-[600px] w-full  shadow p-[20px]'>
                <input type="email" className='px-4 py-3 rounded border w-full my-[7px] '
                ref={emailref}
                
                />
                <input type="password" className='px-4 py-3 rounded border w-full my-[7px]'
                ref={passwordref}
                />
                <input type="submit" value="login" className='bg-violet-500 rounded shadow px-5 py-3 text-white font-semibold' />
            </form>
        </div>

        </>
    )
}
export default UserLogin