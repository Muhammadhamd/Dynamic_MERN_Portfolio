import react , {useContext, useEffect, useRef, useState} from "react"
import axios from 'axios';
import SubmitBtn from "./submitbtn.js";
import {GlobalContext} from "../context/context.jsx"



function Adminlogin (){
  const { state , dispatch} = useContext(GlobalContext)
    const email= useRef(null)
    const password = useRef(null)
    const [ serverMessege , setServerMessege ]= useState("")
    const [isPosting , setisPosting] = useState(false)
    const login = async(e)=>{
      e.preventDefault()
      setisPosting(true)

      try {
        const res =  await axios.post(`/login`,{
          email:email.current.value,
          password:password.current.value

        },{
           withCredentials: true,
        })
        dispatch({
          type: "USER_LOGIN",
          payload: res.data.data,
        });
        setisPosting(false)
       setServerMessege("you are login now")

      } catch (error) {
        // setisPosting(false)
        console.log(error)
      }
    
      
      
    }
    useEffect(()=>{

    },[isPosting])

   const logoutFunction =async(e)=>{
    e.preventDefault()
      await axios.get(`/logout`,{
        withCredentials: true,
     })
    .then((res)=>{console.log(res.data)
    setServerMessege(res.data)
  

    })
    .catch((e)=>{console.log(e)

      setServerMessege(e.response.data)
    })
  }

  useEffect(()=>{

  },[serverMessege])
    return(
    // //  
        <div className="flex w-full flex-col items-center">
         
          
          
            
           
                <form onSubmit={login} className='my-10 shadow-[0px_0px_5px_#00000042] rounded-md px-[50px] py-[20px] w-full max-w-[700px]'
              
              >
                          <div className="flex"> <h1 className='font-semibold text-4xl my-8'>Admin login <i className="fa fa-lock"></i></h1></div>
     
                          <input className='my-[10px] w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='email..'
                ref={email}
               
                />
     
     <input className='my-[10px] w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='Password..'
                ref={password}
                 />
     
      
        {/* <SubmitBtn value='Admin Only' valueOnUpload="LoggingIn..." Requirments={[true} isProcessing={isPosting} /> */}
         <button>submit</button>
            
              </form>
              <div className="text-center text-red font-semibold" >
                {serverMessege}
              </div>
             
        </div>
   
    )
}

export default Adminlogin;