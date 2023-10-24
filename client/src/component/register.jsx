import react, { useEffect, useRef, useState } from 'react'
import Navcomponent from './navbar'
import defaultImg from "../img/imgholder.jpg"
import axios from 'axios'
    import {useNavigate} from "react-router-dom"

function UserRegister(){
    const [image , setdpimage] = useState(defaultImg)
    const passwordref = useRef(null)
    const emailref = useRef(null)
    const nameref = useRef(null)
    const [img , setImg] = useState()
    const navigate =  useNavigate()
    const submitHandler = async(e)=>{
        e.preventDefault();
console.log('eee')
        try {

          const formdata = new FormData()
           formdata.append('email', emailref.current.value);
              formdata.append('password', passwordref.current.value);
              formdata.append('name', nameref.current.value);
              formdata.append('ProfileImage',img);
          const response = await axios.post(
            '/userregister',
              formdata,
            
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
      useEffect(()=>{
        console.log(img)
      },[img])
    return(
        <>
        <Navcomponent changeCss={true}/>
        <div className='w-full flex flex-col items-center'>
        <h1 className='font-bold text-6xl my-[20px]'>Register</h1>

            <form onSubmit={submitHandler} className='max-w-[600px] w-full  shadow p-[20px]'>
                <div className='flex justify-center h-[80px] my-[10px] w-[80px]'>
                    <img className='overflow-hidden rounded-full w-full' src={image} alt=""onClick={(e)=>{
                      document.getElementById("inputimage").click()
}} />
                    <input type="file" id='inputimage' hidden onChange={(e)=>{
                      setdpimage(URL.createObjectURL(e.target.files[0]))
                      setImg(e.target.files[0])
                    }

                    }
                    
                     />
                </div>
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