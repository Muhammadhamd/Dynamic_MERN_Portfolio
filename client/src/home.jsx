import React, { useState, useRef, useEffect, useContext } from "react";
import style from "./App.css";
import Project from "./component/Projects";
import reacticon from "./img/logo192.png";
import axios, { toFormData } from "axios";
import db from "./img/image 1.jpg";
import Typed from "typed.js";
import "./css/animation.css";

import whatsNewImg from "./img/image-removebg 1.png";
import mernstackImg from "./img/mern-stack.png";
import LatestPost from "./component/LatestPost";
import Myservices from "./component/myServices";
import ContactComponent from "./component/contact";
import InstafeedComponent from "./component/Instagramposts";
import ChatBot from "./component/chatbot";
import Experience from "./component/exprence";
import PopUpMessage from "./component/heading";
import { GlobalContext } from "./context/context";
import ImageModal from "./component/openImageModal";
function Home({ theme }) {
  const { state, dispatch } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [afterNetwork, setAfterNetwork] = useState(true);
  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };
  useEffect(() => {
    const options = {
      strings: state.PersonalData.subline || [
        "Frontend Developer",
        "MERN Developer",
        "Graphic Designer",
        "Freelancer",
        "Bloger",
      ],
      typeSpeed: 80,
      backSpeed: 80,
      backdelay: 1000,
      loop: true,
    };

    // New Typed instance
    const typed = new Typed(".multi-headline", options);
    return () => {
      typed.destroy();
    };
  }, [state.PersonalData.subline]);

  return (
    <div
      className={`flex flex-col   pb-[100px] max-[700px]:gap-[70px]  max-[650px]:gap-[40px] max-[500px]:gap-[30px] gap-[140px] ${
        theme ? "text-white bg-gray-900" : "bg-white"
      } App`}
    >
      <div className="absolute top-0 w-full h-[100vh]">
      {/* <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#0d47a1",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2, // Adjust the speed here
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      /> */}
      </div>
      <div className="flex  justify-center mt-[30px]">
        <div className="section1">
          <div className="container">
            {/* <h3>{name ?`Hello it's me` : <div className='my-[2px] animate-pulse flex space-x-2'>
        <div class="rounded-full bg-slate-200 py-1   w-[100px]"></div>
        </div>}</h3>
        <h1 className={` ${theme? 'text-white' : 'text-[#2E2D2D]'} `}
        
        >{name ||<div className='my-[10px] animate-pulse flex space-x-4'>
        <div class="rounded-full bg-slate-200 py-4  max-[400px]:w-[300px] max-[300px]:w-[240px] w-[400px]"></div>
        </div>}</h1>
        
         <h3>{subline ? <>'And I'm a <span class='multi-headline'></span></> : <div className='my-[10px] animate-pulse flex space-x-4'>
         <div class="rounded-full bg-slate-200 py-3 max-[400px]:w-[200px] max-[300px]:w-[160px] w-[300px]"></div>
         </div> }</h3>
        <p>
        {heading || <div className='my-[10px] animate-pulse flex space-x-4'>
        <div class="rounded-full bg-slate-200 py-3  max-[400px]:w-[200px] max-[300px]:w-[160px] w-[300px] "></div>
        </div>}
        </p>
        <div class="social-div">
          <a
            target="_blank"
            href="https://www.facebook.com/muhammadhamd11/"
            // style="--i: 7"
            ><i class="bx bxl-facebook"></i
          ></a>
          <a
            target="_blank"
            href="https://www.instagram.com/hamd_studiology/"
            // style="--i: 8"
            ><i class="bx bxl-instagram-alt"></i
          ></a>
          <a
            target="_blank"
            href="https://www.github.com/muhammadhamd/"
            // style="--i: 9"
            ><i class="bx bxl-github"></i
          ></a>
          <a
            target="_blank"
            href="https://www.linkedin.com/in/muhammad-hamd-6828b1249/"
            // style="--i: 10"
            ><i class="bx bxl-linkedin"></i
          ></a>
          <a
            target="_blank"
            href="https://www.wa.me/+923251452080"
            // style="--i: 11"
            ><i class="bx bxl-whatsapp"></i
          ></a>
        </div> */}
            <h3>Hello it's me</h3>
            <h1>{state?.PersonalData?.name}</h1>
            <h3>
              And I'm a <span class="multi-headline"></span>
            </h3>
            <p>
              As a student, I am highly motivated and always looking for
              opportunities to improve my skills To be better than before
            </p>
            <div class="social-div">
              <a
                target="_blank"
                href="https://www.facebook.com/muhammadhamd11/"
                // style="--i: 7"
              >
                <i class="bx bxl-facebook"></i>
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/hamd_studiology/"
                // style="--i: 8"
              >
                <i class="bx bxl-instagram-alt"></i>
              </a>
              <a
                target="_blank"
                href="https://www.github.com/muhammadhamd/"
                // style="--i: 9"
              >
                <i class="bx bxl-github"></i>
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/muhammad-hamd-6828b1249/"
                // style="--i: 10"
              >
                <i class="bx bxl-linkedin"></i>
              </a>
              <a
                target="_blank"
                href="https://www.wa.me/+923251452080"
                // style="--i: 11"
              >
                <i class="bx bxl-whatsapp"></i>
              </a>
            </div>
          </div>
          <div>
            {state.PersonalData.dp ? (
              <div
                className={`relative  w-[350px] max-[350px]:w-[300px] max-[300px]:w-[250px] mx-[auto] rounded-full ${
                  theme ? "shadow-none" : "shadow-[0px_0px_5px_#0000007a]"
                } overflow-hidden`}
              >
                <img src={state.PersonalData.dp} alt="" onClick={()=>{openModal(state.PersonalData.dp)}} />:
              </div>
            ) : (
              <div className="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-200 md:h-[400px]  md:w-[400px]"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      {afterNetwork && (
        <>
          <ChatBot theme={theme} />

          <Myservices theme={theme} />
          {/* <InstafeedComponent /> */}
          {/* <Experience / */}

          <div className={`${theme ? "bg-transparent" : "bg-[#eae9ee6b]"}`}>
            <div className="flex justify-center">
              <PopUpMessage theme={theme} message="~ More About Me ~" />
            </div>
            <div className="flex flex-col items-center">
              <h1
                className={`${
                  theme ? "text-white" : "text-[#2E2D2D]"
                } max-[450px]:text-4xl max-[450px]:leading-[45px] max-[450px]:max-w-[250px] text-5xl font-bold mt-[10px] max-w-[500px] text-center leading-[60px] tracking-[0.025rem]`}
              >
                I am a <span className="text-[#5333F2]">MERN</span> Developer.
              </h1>
              <p
                className={`${
                  theme && "text-gray-400"
                } text-[#67687A] max-[450px]:text-[16px] text-[17px] max-[300px]:px-[6px] leading-[29px] max-w-[380px] text-center`}
              >
                Developing Websites with the Latest{" "}
                <span className="text-[#5333F2]">MERN Stack</span> Technology
              </p>

              <div className="flex flex-wrap justify-center gap-[50px] mt-[90px] ">
                <div
                  className={`${
                    theme ? "bg-[#1a293b]" : "bg-white"
                  } shadow-[0px_0px_20px_#00000087] rounded-[80px_0px_0px_0px] max-w-[340px] w-full p-[30px] text-center contact-each-box xy-anim-1`}
                >
                  <i class="text-[60px] mt-[25px] text-[#5333F2]  fa fa-html5"></i>

                  <h1
                    className={`${
                      theme ? "text-white" : "theme-black+"
                    } font-bold text-2xl mt-[20px]`}
                  >
                    HTML5
                  </h1>
                  <div className="flex justify-center my-[14px]">
                    {" "}
                    <div className="border-[#5333F2] border-[3px] w-full max-w-[150px]"></div>
                  </div>
                  <p className={`${theme ? "text-gray-400" : "text=blacks"} `}>
                    HTML5 is the backbone, structuring web content efficiently
                    for seamless integration with the MERN stack and
                    user-friendly experiences.
                  </p>
                </div>
                <div
                  className={`${
                    theme ? "bg-[#1a293b]" : "bg-white"
                  } shadow-[0px_0px_20px_#00000087] rounded-[80px_0px_0px_0px] max-w-[340px] w-full p-[30px] text-center contact-each-box xy-anim-2`}
                >
                  <i class="text-[60px] mt-[25px] text-[#5333F2]  fa fa-css3"></i>

                  <h1
                    className={`${
                      theme ? "text-white" : "theme-black+"
                    } font-bold text-2xl mt-[20px]`}
                  >
                    CSS3
                  </h1>
                  <div className="flex justify-center my-[14px]">
                    {" "}
                    <div className="border-[#5333F2] border-[3px] w-full max-w-[150px]"></div>
                  </div>
                  <p className={`${theme ? "text-gray-400" : "text=blacks"} `}>
                    CSS serves as the style wizard, creating visually appealing
                    designs while maintaining responsiveness and
                    user-friendliness in your web application.
                  </p>
                </div>
                <div
                  className={`${
                    theme ? "bg-[#1a293b]" : "bg-white"
                  } shadow-[0px_0px_20px_#00000087] rounded-[80px_0px_0px_0px] max-w-[340px] w-full p-[30px] text-center contact-each-box xy-anim-1`}
                >
                  <i class="text-[60px] mt-[25px] text-[#5333F2]  fa fa-js"></i>
                  <div className="flex justify-center h-[60px]">
                    <img src={reacticon} alt="" className="w-[60px] spin" />
                  </div>
                  <h1
                    className={`${
                      theme ? "text-white" : "theme-black+"
                    } font-bold text-2xl mt-[20px]`}
                  >
                    React.js
                  </h1>
                  <div className="flex justify-center my-[14px]">
                    {" "}
                    <div className="border-[#5333F2] border-[3px] w-full max-w-[150px]"></div>
                  </div>
                  <p className={`${theme ? "text-gray-400" : "text=blacks"} `}>
                    React, the dynamic engine, powers your web app with
                    interactivity and responsiveness, ensuring a seamless user
                    experience within the MERN stack.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ContactComponent theme={theme} />

          {/* <Adminlogin /> */}
        </>
      )}
      {showModal && (
        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      )}
      
      
    </div>
  );
}

export default Home;


