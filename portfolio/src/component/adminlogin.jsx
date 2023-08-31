import react , {useState} from "react"
import axios from 'axios';


function Adminlogin(){

    const [ email , setEmail] = useState("")
    const [ password , setpassword] = useState("")
    const [ serverMessege , setServerMessege] = useState("")
    const login = async(e)=>{
      e.preventDefault()

     await axios.post("http://localhost:5000/login",{
        email:email,
        password:password
      })
      .then((res)=>{
        setServerMessege(res.data)
       console.log(res.data)
      })
      .catch((e)=>{
        setServerMessege(e.response.data)
        console.log(e.response.data)
      })
    }
    return(
        <div className="flex w-full flex-col items-center">
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

  
     
         { 
                  email.length == 0 | password.length == 0  ?
                 ( <input type="submit" value="Admin Only" disabled className='px-4 py-2 rounded shadowe my-3  bg-violet-300 text-white font-bold' />)
                  :
                 (<input type="submit" value="Admin Only" className='px-4 py-2 rounded shadowe my-3  bg-violet-500 text-white font-bold' />)
            }
          </form>
          <div className="text-center text-red font-semibold" >
            {serverMessege}
          </div>
        </div>
    )
}

export default Adminlogin;