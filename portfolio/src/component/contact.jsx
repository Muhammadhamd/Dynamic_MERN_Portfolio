import React, { useState, useRef, useEffect } from 'react';

function ContactComponent() {
const [email , setEmail] = useState("")
const [phoneno , setPhoneno] = useState("")
const [name , setName] = useState("")
const [messege , setMessege] = useState("")
    return (
        <div>
        <div className='w-full flex justify-center'>
          <form className=' shadow-[0px_0px_5px_#00000042] rounded-md px-[100px] py-[30px] w-full max-w-[1000px]'>
           <div> <h1 className='font-semibold text-4xl my-8'>Get in touch</h1></div>
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
            { 
                  messege.length == 0 | name.length == 0 | email.length == 0 | phoneno.length == 0 ?
                 ( <input type="submit" value="Send Messege" disabled className='px-4 py-2 rounded shadowe my-3  bg-violet-300 text-white font-bold' />)
                  :
                 (<input type="submit" value="Send Messege" className='px-4 py-2 rounded shadowe my-3  bg-violet-500 text-white font-bold' />)
            }
         
          </form>
        </div>
      </div>
    )
}

export default ContactComponent