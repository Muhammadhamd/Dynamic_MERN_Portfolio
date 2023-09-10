import react , {useEffect, useState} from "react"
import axios from 'axios';
import UseToken from './token.jsx'
import SubmitBtn from "./submitbtn.js";


function Adminlogin (){

    const [ email , setEmail] = useState("")
    const  token   = UseToken()
    const [ password , setpassword] = useState("")
    const [ checkToken , setcheckToken] = useState("")
    const [ serverMessege , setServerMessege] = useState("")
    const [isPosting , setisPosting] = useState(false)
    console.log(token)
    const login = async(e)=>{
      e.preventDefault()
      setisPosting(true)

     await axios.post("http://localhost:5000/login",{
        email:email,
        password:password
      },{
         withCredentials: true,
      })
      .then((res)=>{
          //  localStorage.setItem("Token", res.data)
    setisPosting(false)
       setServerMessege("you are login now")
      })
      .catch((e)=>{
    setisPosting(false)

        // setServerMessege(e)
        console.log(e)
      })
      
    }
   const logoutFunction =async(e)=>{
    e.preventDefault()
      await axios.get("http://localhost:5000/logout",{
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
     
        <div className="flex w-full flex-col items-center">
         
           { token ?
            (
           <>  
           <div>
           <form onSubmit={logoutFunction}>
            <input type="submit" value='Logout' />
           </form>
          </div>
          </>
              ):(  
                <>
                <form onSubmit={login} className='my-10 shadow-[0px_0px_5px_#00000042] rounded-md px-[50px] py-[20px] w-full max-w-[700px]'
              
              >
                          <div className="flex"> <h1 className='font-semibold text-4xl my-8'>Admin login <i className="fa fa-lock"></i></h1></div>
     
                          <input className='my-[10px] w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='heading..'
                value={email}
                onChange={
                  (e)=>{
                    setEmail(e.target.value)
                  }
                } />
     
     <input className='my-[10px] w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='heading..'
                value={password}
                onChange={
                  (e)=>{
                    setpassword(e.target.value)
                  }
                } />
     
      
        <SubmitBtn value='Admin Only' valueOnUpload="LoggingIn..." Requirments={[email , password]} isProcessing={isPosting} />
         
            
              </form>
              <div className="text-center text-red font-semibold" >
                {serverMessege}
              </div></>
                  ) 
             }
        </div>
    )
}

export default Adminlogin;