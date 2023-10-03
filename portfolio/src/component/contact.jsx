import React, { useState, useRef, useEffect } from 'react';
import UseToken from './token.jsx'
import axios from 'axios';
import "../App.css"
import SubmitBtn from './submitbtn.js';
import PopUpMessage from './heading.jsx';

function ContactComponent() {
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


    axios.post(`${baseURL}/contact`,{

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
        <PopUpMessage message="~ Contact ME ~" />
      </div>
      <div className='flex flex-col items-center'>
      <h1 className='text-5xl font-bold text-[#2E2D2D] mt-[20px] max-w-[500px] text-center leading-[60px] tracking-[0.025rem]'>
      Get In <span className='text-[#5333F2]'>Touch </span>With Me.
      </h1>
      <p className='text-[#67687A] text-[17px] leading-[29px] max-w-[380px] text-center mt-[10px]'>Feel free to get in <span className='text-[#5333F2] font-semibold'>touch anytime</span> to discuss your project, ask questions, or just say <span className='text-[#5333F2] font-semibold'>hello</span> . I'm here to help!</p>
      
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
        <div className='w-full flex flex-wrap justify-around mt-[30px] md:mt-[50px]'>
            <div className='flex max-[1200px]:flex-wrap max-[1200px]:mb-[30px] min-[1200px]:flex-col min-[1200px]:justify-between justify-center gap-[15px]'>
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
            </div>
          <form onSubmit={formSubmitHandler} className=' shadow-[0px_0px_5px_#00000042] max-[1200px]:w-[90%] rounded-md px-[40px] max-[900px]:px-[80px] py-[30px] w-full  max-[1200px]:max-w-none  max-[1270px]:max-w-[800px] max-w-[900px]'>
           <div> <h1 className='font-semibold text-4xl my-8 text-[#2E2D2D]'>Get in touch</h1></div>
            <div className='md:flex gap-[15px]'>
            <input className='w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='Your Name' 
            value={name} 
             onChange={
                (e)=>{
                    setName(e.target.value)
                }
             } />
            <input className='w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='Your Email' 
            value={email}
             onChange={
                (e)=>{
                    setEmail(e.target.value)
                }
             }  />
            <input className='w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 outline-none' type="text" placeholder='Your Phone Number'
            value={phoneno}
             onChange={
                (e)=>{
                    setPhoneno(e.target.value)
                }
             }   />
            </div>
            <textarea className='w-full px-3 py-2 border-[3px] rounded-lg border-violet-300 my-[20px] outline-none'  name="" id="" placeholder='Messege' rows="7"
            value={messege}
             onChange={
                (e)=>{
                    setMessege(e.target.value)
                }
             } 
            ></textarea>
            
                
            <SubmitBtn value="Messege" valueOnUpload='Sending......' isProcessing={isPosting} Requirments={[name , messege , phoneno , email]}  />

            
            {/* { 
                  messege.length == 0 | name.length == 0 | email.length == 0 | phoneno.length == 0 ?
                  ( <input type="submit" value="Send Messege" disabled className='px-4 py-2 rounded shadowe my-3  bg-violet-300 text-white font-bold' />)
          :(
            isPosting ?(<input type="submit" value="Sending......" disabled className='px-4 py-2 rounded shadowe my-3  bg-violet-300 text-white font-bold' />)
            :
         (<input type="submit" value="Send Messege" className='px-4 py-2 rounded shadowe my-3  bg-violet-500 text-white font-bold' />)

          ) }
          */}
          </form>
        
        </div>
        <div className='flex flex-wrap gap-[20px] my-[40px] justify-start mx-[3.3%]'>
          <div className='shadow-[0px_0px_5px_#00000042] w-[360px] bg-white rounded-lg px-[30px] py-[20px] contact-each-box'>
                    <h1 className='text-[#5333F2]  text-[17px]'> <i className='fa fa-mail-reply'></i> muhammadhamd.dev@gmail.com</h1>
                </div>
                <div className='shadow-[0px_0px_5px_#00000042] w-[320px] bg-white rounded-lg px-[25px] py-[17px] contact-each-box'>
                    <h1 className='text-[#5333F2]  text-[17px]'> <i className='fa fa-whatsapp'></i> +92 03251452080</h1>
                </div>
                <div className='shadow-[0px_0px_5px_#00000042] w-[320px] bg-white rounded-lg px-[25px] py-[17px] contact-each-box'>
                    <h1 className='text-[#5333F2]  text-[17px]'> <i className='fa fa-whatsapp'></i> +92 03251452080</h1>
                </div>
          </div>
      </div>
    )
}

export default ContactComponent