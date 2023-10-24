import react, { useEffect, useState } from "react"

import Navcomponent from "./navbar"
import css from '../css/about.css'
import axios from "axios"
import b4img from '../img/slide-img.jpg'
import imgholder from '../img/imgholder.jpg'
function AboutComponent (){

    const [islogin , setislogin] = useState(null)
    const [userdata ,setuserdata] =useState([])
    const userLoginCheckHandler = async() =>{

        try {
          const res = await axios.get("/currentuser",{
            withCredentials: true,
          })
          setislogin(true)
          console.log(res)
          setuserdata(res.data)
        } catch (error) {
          console.log(error)
          setislogin(false)
        }
      }
      useEffect(()=>{
        userLoginCheckHandler()
      },[])
    return(
        <div>
        <div className=" relative bgimg">
        <Navcomponent islogin={islogin} img={userdata.image}/>
        <div className="about-overlay"></div>
       <div className="h-[100%] w-[100%] flex justify-center items-center">
       <h1 className="text-6xl font-semibold text-white mb-[130px]">About Us</h1>
       </div>
        </div>
        <div className=" pt-[60px] bg-[#f5f7f9] flex flex-col  gap-[40px] items-center">
            <div className="bg-white flex justify-between max-w-[1200px] w-full max-[910px]:flex-col max-[910px]:items-center">
                <div className="max-w-[500px] pl-[60px] flex flex-col justify-center"> 
                    <div className="bg-[#0084d6] w-[80px] h-[3px] mb-[30px]"></div>
                    <h1 className="font-semibold text-[45px]">
                    Who We Are
                    </h1>
                    <p className="my-[20px] leading-[1.5rem] text-[16px] text-slate-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit.
                    </p>
                </div>
                <div className="max-w-[644px] w-full">
                    <img src={b4img} alt="" />
                </div>
            </div>
            <div className="bg-white w-full pt-[100px]">
                <div className="flex flex-col items-center">
                <div className="bg-[#0084d6] w-[100px] h-[4px] mb-[30px]"></div>
                <h4 className="font-semibold text-xl">Few words About</h4>
                <h1 className="text-5xl my-[20px] font-semibold">Our Team</h1>
                 <p className="max-w-[740px] text-center leading-[1.5rem]">Nam nec tellus a odio tincidunt auctor a ornare odio. Sed non mauris vitae erat consequat auctor eu in elit. Class aptent taciti sociosqu ad litora torquent per conubia nostra.

</p>

               <div className="flex flex-wrap max-w-[900px] justify-center w-full gap-[20px] my-[100px]">
               <div className="bg-[#f5f7f9] rounded-xl p-[20px] max-w-[250px] w-full flex flex-col items-center">
                    <div className="w-[100px] mt-[30px] mb-[20px] h-[100px] rounded-full overflow-hidden" >
                        <img className="w-full" src={imgholder} alt="" />
                    </div>
                    <h1 className="font-semibold text-xl" >muhammad hamd</h1>
                    <h3 className="text-slate-500 mb-[30px]">Developer</h3>
                </div>
                <div className="bg-[#f5f7f9] rounded-xl p-[20px] max-w-[250px] w-full flex flex-col items-center">
                    <div className="w-[100px] mt-[30px] mb-[20px] h-[100px] rounded-full overflow-hidden" >
                        <img className="w-full" src={imgholder} alt="" />
                    </div>
                    <h1 className="font-semibold text-xl" >muhammad hamd</h1>
                    <h3 className="text-slate-500 mb-[30px]">Developer</h3>
                </div>
                <div className="bg-[#f5f7f9] rounded-xl p-[20px] max-w-[250px] w-full flex flex-col items-center">
                    <div className="w-[100px] mt-[30px] mb-[20px] h-[100px] rounded-full overflow-hidden" >
                        <img className="w-full" src={imgholder} alt="" />
                    </div>
                    <h1 className="font-semibold text-xl" >muhammad hamd</h1>
                    <h3 className="text-slate-500 mb-[30px]">Developer</h3>
                </div>
                <div className="bg-[#f5f7f9] rounded-xl p-[20px] max-w-[250px] w-full flex flex-col items-center">
                    <div className="w-[100px] mt-[30px] mb-[20px] h-[100px] rounded-full overflow-hidden" >
                        <img className="w-full" src={imgholder} alt="" />
                    </div>
                    <h1 className="font-semibold text-xl" >muhammad hamd</h1>
                    <h3 className="text-slate-500 mb-[30px]">Developer</h3>
                </div>
                  <div className="bg-[#f5f7f9] rounded-xl p-[20px] max-w-[250px] w-full flex flex-col items-center">
                    <div className="w-[100px] mt-[30px] mb-[20px] h-[100px] rounded-full overflow-hidden" >
                        <img className="w-full" src={imgholder} alt="" />
                    </div>
                    <h1 className="font-semibold text-xl" >muhammad hamd</h1>
                    <h3 className="text-slate-500 mb-[30px]">Developer</h3>
                </div>
                <div className="bg-[#f5f7f9] rounded-xl p-[20px] max-w-[250px] w-full flex flex-col items-center">
                    <div className="w-[100px] mt-[30px] mb-[20px] h-[100px] rounded-full overflow-hidden" >
                        <img className="w-full" src={imgholder} alt="" />
                    </div>
                    <h1 className="font-semibold text-xl" >muhammad hamd</h1>
                    <h3 className="text-slate-500 mb-[30px]">Developer</h3>
                </div>
               </div>
                </div>
            </div>
        </div>
        <div className="h-[470px] relative follow-div">
            <div className="overlay"></div>
            <div className="w-full h-[100%] flex justify-center">
            <div className="bg-white max-[700px]:w-[400px] max-[600px]:w-[300px] max-[400px]:w-[250px] h-[100%] w-[500px] flex flex-col items-center justify-center">
            <div className="bg-[#0084d6] w-[80px] h-[3px] mb-[10px]"></div>
                <h1 className="font-semibold my-[20px] text-4xl">Follow Me</h1>
                <div className="flex gap-[25px]">
                    <a href="https://github.com/muhammadhamd" target="_blank"><i className="text-2xl bi bi-github"></i></a>
                    <a href="https://github.com/muhammadhamd" target="_blank"><i className="text-2xl bi bi-github"></i></a>
                    <a href="https://github.com/muhammadhamd" target="_blank"><i className="text-2xl bi bi-github"></i></a>
                    <a href="https://github.com/muhammadhamd" target="_blank"><i className="text-2xl bi bi-github"></i></a>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
   
}

export default AboutComponent