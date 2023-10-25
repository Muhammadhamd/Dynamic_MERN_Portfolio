import react, { useEffect, useRef, useState } from 'react'
import Navcomponent from './navbar'
import defaultImg from "../img/imgholder.jpg"
import axios from 'axios'
    import {useNavigate} from "react-router-dom"

function UserRegister(){
 
    const passwordref = useRef(null)
    const emailref = useRef(null)
    const nameref = useRef(null)
    
    const navigate =  useNavigate()
    const submitHandler = async(e)=>{
        e.preventDefault();
console.log('eee')
        try {

          const formdata = new FormData()
           
           
          const response = await axios.post(
            '/userregister',
              {
              email: emailref.current.value,
              password: passwordref.current.value,
              name: nameref.current.value,
              },
            
            {
              withCredentials: true, // Use withCredentials instead of withCredential
            }
          )
          .then((res)=>{
            console.log(res)
            navigate("/")
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
        
        <div className='w-full flex flex-col items-center'>
        <h1 className='font-bold text-6xl my-[20px]'>Register</h1>

            <form onSubmit={submitHandler} className='max-w-[600px] w-full  shadow p-[20px]'>
               
                    
                   

                    
                    
                     
               
                <input type="text"  className='px-4 py-3 rounded border w-full my-[7px] '
                
                ref={nameref}
                
                />
                <input type="email"  className='px-4 py-3 rounded border w-full my-[7px] '
               
                ref={emailref}
                
                />
                <input type="password"  className='px-4 py-3 rounded border w-full my-[7px] '
                ref={passwordref}
                />
                <input type="submit" value="login" className='bg-violet-500 rounded shadow px-5 py-3 text-white font-semibold' />

            </form>
        </div>
        </>
    )
}
export default UserRegister