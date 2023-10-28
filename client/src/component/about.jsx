import react, { useEffect, useState } from "react"

import Navcomponent from "./navbar"
// import css from '../css/about.css'
import axios from "axios"
// import b4img from '../img/slide-img.jpg'
// import imgholder from '../img/imgholder.jpg'
function AboutComponent (){

    const [islogin , setislogin] = useState(null)
    const [userdata ,setuserdata] =useState([])
   
    return(
        <div>
       <div>
        <div>
        <div >
       <div>
        <div className="mt-[50px]">
        <div>
            <h1 className={`text-[#2E2D2D] max-[450px]:text-4xl max-[450px]:leading-[45px] max-[450px]:max-w-[250px] text-5xl font-bold mt-[10px] max-w-[500px] text-center leading-[60px] tracking-[0.025rem]`}>
                Hello, I'm <span className="text-[#5333F2]">Muhammad Hamd </span> – Your MERN Stack Developer</h1>
        </div>
        <div>
        </div>
       </div>

        </div>
        </div>
        </div>
       </div>
    </div>
    )
   
}

export default AboutComponent