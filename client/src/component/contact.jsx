import React, { useState, useRef, useEffect } from 'react';
import UseToken from './token.jsx'
import axios from 'axios';
import "../App.css"
import SubmitBtn from './submitbtn.js';
import PopUpMessage from './heading.jsx';

function ContactComponent({theme}) {
    const baseURL = process.env.PORT || 'http://localhost:5000'
const [email , setEmail] = useState("")
const [phoneno , setPhoneno] = useState("")
const [name , setName] = useState("")
const [messege , setMessege] = useState("")
const [submitDonePopUp , setsubmitDonePopUp] = useState(false)
const [isPosting , setisPosting] = useState(false)

const formSubmitHandler = (e)=>{
    e.preventDefault()
    
    setisPosting(true)


    axios.post(`/contact`,{

    email:email,
    phno:phoneno,
    messege:messege,
    name:name
})
.then((res)=>{console.log(res)
    setName('')
    setEmail('')
    setPhoneno('')
    setMessege('')
    setsubmitDonePopUp(true)

})
.catch((e)=>{console.log(e)})
.finally(() => {
    // Set isProcessing to false when the request is completed
    setisPosting(false);
  });

}
    return (
        <div className='max-w-[1400px]'>
             <div className='flex justify-center'>
        <PopUpMessage theme={theme}  message="~ Contact ME ~" />
      </div>
      <div className='flex flex-col items-center'>
      <h1 className={`${theme ? 'text-white': 'text-[#2E2D2D]'} text-5xl font-bold text-[#2E2D2D] mt-[20px] max-w-[500px] text-center leading-[60px] tracking-[0.025rem]`}>
      Get In <span className='text-[#5333F2]'>Touch </span>With Me.
      </h1>
      <p className={`${theme ? 'text-gray-400' : 'text-[#67687A]'} text-[17px] leading-[29px] max-w-[380px] text-center mt-[10px]`}>Feel free to get in <span className='text-[#5333F2] font-semibold'>touch anytime</span> to discuss your project, ask questions, or just say <span className='text-[#5333F2] font-semibold'>hello</span> . I'm here to help!</p>
      
      </div> 
            {submitDonePopUp &&
           <div className='flex justify-center w-full'>
           <div className='fixed top-[30px] bg-white p-[30px] rounded-xl shadow-xl' >
                <div className='flex justify-end'>
                    <i className='fa fa-close'></i>
                </div>
                <h1 className='font-semibold'>Thank you {name} for Contacting me i will respond you later</h1>
            </div>
           </div>
}
        <div className='w-full flex flex-wrap justify-center mt-[30px] gap-[70px] md:mt-[70px]'>
            {/* <div className='flex max-[1200px]:flex-wrap max-[1200px]:mb-[30px] mt-[55px]  min-[1200px]:flex-col  max-[1200px]:justify-center gap-[25px]'>
                <div className='shadow-[0px_0px_5px_#00000042]  w-[300px] bg-white rounded-lg px-[25px] py-[17px] contact-each-box'>
                    <h1 className='text-[#5333F2]  text-[17px]'> <i class="fa fa-home"> </i> Karachi ,Pakistan</h1>
                </div>
                <div className='shadow-[0px_0px_5px_#00000042] w-[300px] bg-white rounded-lg px-[25px] py-[17px] contact-each-box'>
                    <h1 className='text-[#5333F2]  text-[17px]'> <i className='fa fa-github'></i><a href="https://gitgub.com/muhammadhamd"> Github</a></h1>
                </div>
                <div className='shadow-[0px_0px_5px_#00000042] w-[300px] bg-white rounded-lg px-[25px] py-[17px] contact-each-box'>
                    <h1 className='text-[#5333F2]  text-[17px]'> <i className='fa fa-instagram'></i><a href="https://instagram.com/hamd_studiology"> Instagram Page</a></h1>
                </div>
                <div className='shadow-[0px_0px_5px_#00000042] w-[300px] bg-white rounded-lg px-[25px] py-[17px] contact-each-box'>
                    <h1 className='text-[#5333F2]  text-[17px]'> <i className='fa fa-facebook'></i><a href="https://facebook.com/muhammadhamd11"> Facebook</a></h1>
                </div>
                <div className='shadow-[0px_0px_5px_#00000042] w-[300px] bg-white rounded-lg px-[25px] py-[17px] contact-each-box'>
                    <h1 className='text-[#5333F2]  text-[17px]'> <i className='fa fa-linkedin'></i><a href="https://linkedin.com/in/muhammadhamd"> Linkedin</a></h1>
                </div>
            </div> */}
             <div className="max-w-[500px] max-[510px]:w-[80%] flex flex-col justify-center min-[1000px]:h-[400px]">
                    <h4 className={`${theme ? 'text-white' : 'text-black'} font-semibold text-sm`}>Don't be a stranger!</h4>
                    <h1 className={`${theme ?'text-white' : 'text-black'} font-semibold text-5xl max-[480px]:text-4xl max-[340px]:text-3xl`}>You tell me. I listen.</h1>
                    <p className={`${theme ? 'text-gray-400' : 'text-slate-700'}  leading-[1.5rem] mt-[50px]`}>Cras elementum finibus lacus nec lacinia. Quisque non convallis nisl, eu condimentum sem. Proin dignissim libero lacus, ut eleifend magna vehicula et. Nam mattis est sed tellus.</p>
                </div>
          <form onSubmit={formSubmitHandler} className={`bg-transparent rounded-lg  py-[20px] px-[40px] max-w-[600px] w-full`}>
           <div> <h1 className={`${theme && 'text-white'} font-semibold text-4xl mb-5 text-[#2E2D2D]`}>Get in touch</h1></div>
            <input  className="border rounded w-full px-6 py-3 mt-[20px] text-[18px]" type="text" placeholder='Your Name' 
            value={name} 
             onChange={
                (e)=>{
                    setName(e.target.value)
                }
             } />
            <input  className="border rounded w-full px-6 py-3 mt-[20px] text-[18px]" type="text" placeholder='Your Email' 
            value={email}
             onChange={
                (e)=>{
                    setEmail(e.target.value)
                }
             }  />
            <input  className="border rounded w-full px-6 py-3 mt-[20px] text-[18px]" type="text" placeholder='Your Phone Number'
            value={phoneno}
             onChange={
                (e)=>{
                    setPhoneno(e.target.value)
                }
             }   />
            <textarea name="" id="" rows="5" placeholder="Message" className="border rounded w-full px-6 py-3 mt-[20px] text-[18px]"
            value={messege}
             onChange={
                (e)=>{
                    setMessege(e.target.value)
                }
             } 
            ></textarea>
            
                <div>
                <SubmitBtn value="SEND MESSAGE" valueOnUpload='Sending......' css='px-6 py-3 bg-[#0084d6] text-white font-semibold text-sm my-2' isProcessing={isPosting}  Requirments={[name , messege , phoneno , email]}  />
                </div>

            
         
          
          </form>
          
        </div>
      
      </div>
    )
}

export default ContactComponent