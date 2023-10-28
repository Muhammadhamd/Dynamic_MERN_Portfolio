import '../App.css'
import React, { useState,useContext, useRef, useEffect } from 'react';
import "../css/project.css"
import UseToken from './token.jsx'
import axios from 'axios';
import PopUpMessage from './heading';
import example from "../img/Mern Stack ecommerce website.jpg"
import {GlobalContext} from "../context/context.jsx"
function Project({theme}){

  

    const [arrayProjectData , setArrayProjectData] = useState([])


      useEffect(() => {
        console.log(arrayProjectData);
      }, [arrayProjectData]);
  
      useEffect(()=>{
        axios.get(`/api/projects`)
        .then((res)=>{
          setArrayProjectData(res.data)
          console.log(res.data)
        })
      },[])
      // useEffect(() => {
      //   console.log(allTags);
      // }, [allTags]);
      // useEffect(() => {
      //   console.log(addImgDB);
      // }, [addImgDB]);
 
    return(
       <div>
         {/* <div className="projectbg">
            <div className="flex flex-col items-center p-[100px]">
                <h1 className="text-[#BC7AFF] font-bold text-[400%] flex items-center justify-center relative left-[30px]">Lets Build  &nbsp;<div className="text-white"> Your Project</div></h1>
                <p className="font-semibold text-black text-center max-w-[800px] my-6 w-[95%] ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, qui fuga. Incidunt, commodi. Tempora velit in amet perspiciatis doloremque ipsum magni nostrum molestiae, eveniet odio et voluptatum hic aliquam unde esse consequuntur minima ducimus ratione nemo mollitia a enim delectus eaque reprehenderit? Repellendus, dolorum sint magni asperiores sapiente autem. Fugit!</p>
                <ul className="flex gap-[30px] font-bold text-3xl">
                    <li className="text-[#BC7AFF]"><a href=""><i className="fa fa-github"></i></a></li>
                    <li className="text-[#BC7AFF]"><a href=""><i className="fa fa-instagram"></i></a></li>
                    <li className="text-white"><a href=""><i className="fa fa-linkedin"></i></a></li>
                    <li className="text-white"><a href=""><i className="fa fa-youtube"></i></a></li>
                </ul>

                <div className="flex justify-between w-full mt-10">
                        <div>
                           <h1 className="text-2xl text-[#BC7AFF] font-semibold">My Projects</h1>
                           <div></div>
                        </div>
                        <div>
                            <h1 className="text-2xl text-white font-semibold">Github Repositories</h1>
                            <div className="mt-3 flex flex-col gap-[15px]">
                            <div className="p-[10px] rounded-xl shadow-xl bg-white max-w-[430px] w-full">
                                    <h1 className="text-base font-semibold">DYNAMIC-React-portfolio</h1>
                                    <p className="text-slate-500 text-sm">tur adipisicing elit. Nihil nobis rerum ipsam quia odit tempora.</p>
                                    <div className="flex items-center justify-between text-sm text-violet-500 mt-1 ">
                                        <h1>Created at 6days ago</h1>
                                        <h1>Last modifed ~ 2 hours ago</h1>
                                    </div>
                                </div>
                                <div className="p-[10px] rounded-xl shadow-xl bg-white max-w-[430px] w-full">
                                    <h1 className="text-base font-semibold">DYNAMIC-React-portfolio</h1>
                                    <p className="text-slate-500 text-sm">tur adipisicing elit. Nihil nobis rerum ipsam quia odit tempora.</p>
                                    <div className="flex items-center justify-between text-sm text-violet-500 mt-1 ">
                                        <h1>Created at 6days ago</h1>
                                        <h1>Last modifed ~ 2 hours ago</h1>
                                    </div>
                                </div>
                                <div className="p-[10px] rounded-xl shadow-xl bg-white max-w-[430px] w-full">
                                    <h1 className="text-base font-semibold">DYNAMIC-React-portfolio</h1>
                                    <p className="text-slate-500 text-sm">tur adipisicing elit. Nihil nobis rerum ipsam quia odit tempora.</p>
                                    <div className="flex items-center justify-between text-sm text-violet-500 mt-1 ">
                                        <h1>Created at 6days ago</h1>
                                        <h1>Last modifed ~ 2 hours ago</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
           </div>
        </div>  */}

       
      <div className=''>
       
      <div className={`flex flex-col gap-[50px] ${theme ?'bg-gray-900': 'bg-[#f5f7f9]'}`}>
      <div className='flex mt-[130px]'>
       <PopUpMessage theme={theme} message="~ MY TOP PROJECTS ~" />
       </div>
      
      <div className='flex flex-wrap justify-center gap-[25px] '>
      {arrayProjectData?.map((data) => (
        <ProjectItem key={data._id} data={data} theme={theme} />
      ))}
     
             
      </div>
     
      </div>
      </div>
       </div>
    )
}

function ProjectItem({ data, theme }) {
  const { state, dispatch } = useContext(GlobalContext);
  const [likes ,setLikes]= useState(data?.likes?.length)
  const [lovebtn, setLoveBtn] = useState(
    data?.likes?.some((id) => id.AuthorId === state.user._id) ? 'fa-heart' : 'fa-heart-o'
  );

  const LikeProjectHandler = async () => {
    setLoveBtn(lovebtn === "fa-heart" ? "fa-heart-o" : "fa-heart")
    setLoveBtn(lovebtn === "fa-heart" ? setLikes(data?.likes.length - 1) : setLikes(data?.likes.length + 1))
    try {
      const res = await axios.post(`http://localhost:2344/api/project-like/${data._id}`);
      if (res.data.Added) {
        setLoveBtn('fa-heart');
    setLoveBtn(setLikes(data?.likes?.length + 1))
      } else {
        setLoveBtn('fa-heart-o');
    setLoveBtn(setLikes(data?.likes?.length - 1))

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='md:w-[300px]'>
      <a href={data.hostlink} className="w-full" target="_blank">
        <div className="w-full overflow-hidden rounded-lg md:h-[225px]">
          <img className="w-full" src={data.image} alt="" />
        </div>
      </a>
      <div className={`flex items-center justify-between px-[5px] my-3 ${theme ? 'text-gray-400' : 'text-black'}`}>
        <div className="flex items-center gap-[5px]">
          <i className="fa fa-github text-2xl"></i>
          <a href={data.RepoLink} className="w-full" target="_blank">
            <h1 className="font-semibold text-sm">Repository</h1>
          </a>
        </div>
        <button className="flex items-center text-xl gap-[5px]">
          <i className={`fa ${lovebtn}`} onClick={LikeProjectHandler}></i>
          <h4>{data?.likes?.length}</h4>
        </button>
      </div>
    </div>
  );
}
export default Project