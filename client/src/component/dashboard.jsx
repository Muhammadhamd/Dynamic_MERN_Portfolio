import react, { useContext, useEffect, useRef, useState } from "react";
import SubmitBtn from "./submitbtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/context";
import WarningModal from "./warningModal";

import AddArticle from "./addArticle";
function Dashboard() {
  const { state, dispatch } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [projectItems, setProjectItem] = useState([]);
  const [productItems, setProductItem] = useState([]);
  const [title, settitle] = useState("");
  const [rerenderOnPost, setrerenderOnPost] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [image, setdpimage] = useState(null);
	
  const [img, setImg] = useState(state.PersonalData.dp);
  const [ProductsArray, setProductsArray] = useState([]);
 
  const projectRepoRef = useRef(null);
  const projectliveLinkRef = useRef(null);
  const projectImage = useRef(null);
  const [img_pro, setImg_pro] = useState();
  const [openOption, setOpenOption] = useState();
  const [openGalaray, setOpenGalaray] = useState(false);
  const [NotificationArray, setNotificationArray] = useState([]);
  const notifyCountRef = useRef();
  const titleRef = useRef();
  const name = useRef();
  const heading = useRef();
  const subline = useRef();
  const paragraph = useRef();
  const [selectedSubline, setSelectedSubline] = useState([]);
  const pageQuerrry =
    new URLSearchParams(window.location.search).get("Page") ||
    new URLSearchParams(window.location.search).get("page");
  const TargetedComment = useRef();
  console.log(pageQuerrry);
  const deleteProductHandler = async (id) => {
    try {
      const res = await axios.delete(
        `/delete-product/${id}`
      );
      console.log(res.data);
      setrerenderOnPost(true);
    } catch (error) {
      console.log(error);
    }
  };
  
  const AddProjectHandler = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("hostlink", projectliveLinkRef.current.value);

      formdata.append("RepoLink", projectRepoRef.current.value);
      formdata.append("image", img_pro);
      const res = await axios.post(
        `/Add-project`,
        formdata,
        { withCredentials: true }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
 
  const updateNotificationHandler = async (notifyId) => {
    try {
      const res = await axios.put(
        `/updateNotifyStatus/${notifyId}`
      );
    } catch (error) {}
  };
  useEffect(() => {
    setNotificationArray(state?.notification);

  }, [state?.notification]);
  useEffect(() => {
    notifyCountRef.current = NotificationArray?.filter(
      (each) => each.Status === "pending"
    ).length;
    titleRef.current = document.title;
    setTimeout(() => {
      document.title =
        notifyCountRef.current > 0
          ? `(${notifyCountRef.current}) ${titleRef.current}`
          : document.title;
    }, 1000);
    console.log(notifyCountRef.current);
  }, [NotificationArray]);
  
  useEffect(() => {
    setSelectedSubline(state.PersonalData.subline);
  }, [state.PersonalData.subline]);
  useEffect(() => {
    if (subline?.current?.value) {
      subline.current.value = "";
    }
  }, [selectedSubline]);
  const productsHandler = async()=>{

    try {
      const res = await axios.get('/Admin-Article')
      setProductItem(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  const projectsHandler = async()=>{

    try {
      const res = await axios.get('/api/projects')
      setProjectItem(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    productsHandler()
    projectsHandler()
  },[])
  useEffect(()=>{
    console.log(productItems)
  },[productItems])
  useEffect(()=>{
    console.log(projectItems)
  },[projectItems])
  useEffect(()=>{
      console.log(ProductsArray)

  },[ProductsArray])
 
  const editUserData = async (e) => {
    e.preventDefault();

    try {
      let formdata = new FormData();
      formdata.append("namey", name.current.value);
      formdata.append("subline", JSON.stringify(selectedSubline));
      formdata.append("heading", heading.current.value);
      formdata.append("paragraphy", paragraph.current.value);
      formdata.append("imagefromGalary", image);

      formdata.append("dpImg", img);
      const res = await axios.put("/userinfo", formdata, {
        withCredentials: true,
      });
      console.log(res);
      dispatch({
        type: "MY_DATA",
        payload: res.data.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{

  },[showModal])

 
  
  return (
    <div className="relative bg-white text-black">
      <style>
        {`
          table {
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 90%;
          }

          td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
          }

          tr:nth-child(even) {
            background-color: #dddddd;
          }
        `}
      </style>
      <div className="absolute bg-gray-800 text-white h-screen w-[230px]">
        <Link to='/'>
        <div className="w-[200px] h-[150px] overflow-hidden rounded-full">
          <img className="w-full" src={state?.PersonalData?.dp} alt="" />
        </div>
        </Link>
        
        <Link to="/dashboard" className="block py-2 px-4">
          Dashboard
        </Link>
        <Link
          to="/dashboard?page=Personal-information"
          className="block py-2 px-4"
        >
          Personal Info
        </Link>
        <Link to="/dashboard?page=Article" className="block py-2 px-4">
          Add Article
        </Link>
        <Link to="/dashboard?page=Project" className="block py-2 px-4">
          Add Project
        </Link>
        <Link to="/dashboard?page=Projects" className="block py-2 px-4">
          Projects
        </Link>
        <Link to="/dashboard?page=Articles" className="block py-2 px-4">
          Articles
        </Link>
      </div>
      <div className={`ml-[250px]`}>
        {pageQuerrry ? (
          pageQuerrry === "Article" ? (
         <>
         <AddArticle/>
         </>
          ) : pageQuerrry === "Project" ? (
            <>
              <div className="max-w-[1000px] w-full p-[40px] bg-[white] border-rounded shadow-xl">
                <h1 className="text-4xl font-semibold">Add a Project</h1>
                <form onSubmit={AddProjectHandler}>
                  <div className="flex justify-center h-[80px] my-[10px] w-[40px]">
                    <img
                      className=" w-full"
                      src={projectImage.current?.value}
                      alt=""
                      onClick={(e) => {
                        document.getElementById("inputimage-project").click();
                      }}
                    />
                    <input
                      type="file"
                      id="inputimage-project"
                      hidden
                      ref={projectImage}
                      onChange={(e) => {
                        // projectImage = URL.createObjectURL(e.target.files[0])
                        setImg_pro(e.target.files[0]);
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-full gap-[20px]">
                    <input
                      type="text"
                      ref={projectRepoRef}
                      className="border px-4 py-3 w-full"
                      placeholder="Repo Link of project"
                    />
                    <input
                      type="text"
                      ref={projectliveLinkRef}
                      className="border px-4 py-3 w-full"
                      placeholder="live link of project"
                    />

                    <div className="w-full">
                      <SubmitBtn
                        value="add new Product"
                        valueOnUpload="addingg"
                        
                      />
                    </div>
                  </div>
                </form>
              </div>

              <div className="max-w-[1000px] w-full p-[40px] bg-[white]">
                <h1 className="text-4xl font-semibold">products</h1>
                <table className="w-full border-collapse border border-gray-300 px-[20px]">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="w-[100px]"></th>
                      <th className="p-2">Product</th>
                      <th className="p-2">Price</th>
                      <th className="p-2"></th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {productItems.length > 0 &&
                      productItems.map((item) => (
                        <tr
                          key={item._id}
                          className="text-center border-b border-gray-500 my-[40px]"
                        >
                          <Link to={`/product/${item._id}`}>
                            <td className="w-[100px]">
                              {/* <img src={item.img} alt="" /> */}
                            </td>
                          </Link>
                          <td className="p-2">{item.title}</td>
                          <td className="p-2">${item.price}</td>
                          <td className="p-2">
                            <i
                              className="bi bi-three-dots-vertical"
                              onClick={() => deleteProductHandler(item._id)}
                            ></i>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : pageQuerrry === "Articles" ? (
            <div>
              <table>
                <tr>
                  <th>Title</th>
                  <th>date</th>
                  <th>Status</th>
                  <th>Visibility</th>
                  <th></th>
                </tr>
                {productItems?.map((each) => (
                  <tr key={each._id}>
                    <td>{each?.heading}</td>
                    <td>{each?.timeStamp}</td>
                    <td>{each?.status || 'public'}</td>
                    <td>
                      <i
                        className={`${
                          each?.visibility
                            ? "bi bi-eye-fill"
                            : "bi bi-eye-slash-fill"
                        }`}
                      onClick={async()=>{
                        try {
                          const res = await axios.put(`/Article-visibility/${each._id}`,{
                            visibility:each?.visibility ? true :false
                          })
                          console.log(res)
                          setProductItem(productItems.map((item)=> item._id === res.data.data._id ?res.data.data :item ))

                        } catch (error) {
                          console.log(error)
                        }
                      }}
                       ></i>
                    </td>
                    <td className="flex flex-col text-slate-500 text-sm">
                      <button ><Link to={`/dashboard?page=Article&edit=${each._id}`}>Edit</Link></button>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          ) : pageQuerrry === "Projects" ? (
            <div>
              <table>
                <tr>
                  <th></th>
                  <th>Live</th>
                  <th>Repo</th>
                  <th>Status</th>
                  <th>Visibility</th>
                  <th></th>
                </tr>
                {projectItems?.length  &&
                projectItems?.map((each) => (
                  <tr key={each._id}>
                    <td>
                      <div className="w-[60px]">
                        <img src={each?.image} className="w-full" alt="" />
                      </div>
                    </td>
                    <td>{each.RepoLink}</td>
                    <td>
                      <a href={each?.hostlink}>
                      {each?.hostlink}
                      </a>
                    </td>
                    <td>{each?.status || "published"}</td>
                    <td>
                      <i
                        className={`${
                          each.visibility
                            ? "bi bi-eye-fill"
                            : "bi bi-eye-slash-fill"
                        }`}
                        onClick={async()=>{
                          try {
                            const res = await axios.put(`/Project-visibility/${each._id}`,{
                              visibility:each?.visibility ? true :false
                            })
                            console.log(res)
                            setProjectItem(projectItems.map((item)=> item._id === res.data.data._id ?res.data.data :item ))
  
                          } catch (error) {
                            console.log(error)
                          }
                        }}
                      ></i>
                    </td>
                    <td className="flex flex-col text-slate-500 text-sm">
                      <button>Edit</button>
                      <button
                      onClick={()=>{
                    <WarningModal showModal={true} Message={`want to delete ${each?._id}`}/>

                      }}
                      >Delete</button>
                    </td>
                    
                  </tr>
                ))}
              </table>
            </div>
          ) : pageQuerrry === "Personal-information" ? (
            <div>
              <div className=" h-[100vh] w-full flex justify-center items-center bg-white text-[#2E2D2D] ">
                <form
                  className="max-w-[600px] bg-white flex flex-wrap shadow rounded w-full gap-[15px] justify-center p-[20px]"
                  onSubmit={editUserData}
                >
                  <div className="w-full flex justify-center items-end">
                    <button 
                    onClick={(e)=>{
                      e.preventDefault()
                      setOpenGalaray(true)
                    }}
                    className="text-violet-500">
                      
                      <i className="bi bi-images"></i> Galaray
                    </button>

                    <div
                      className="w-[150px] h-[150px] overflow-hidden rounded-full flex justify-center items-center"
                      onClick={() => {
                        document.getElementById("inputimage").click();
                      }}
                    >
                      {" "}
                      <input
                        type="file"
                        id="inputimage"
                        hidden
                        onChange={(e) => {
                          setdpimage(URL.createObjectURL(e.target.files[0]));
                          setImg(e.target.files[0]);
                        }}
                      />{" "}
                      <img
                        src={image || state.PersonalData.dp}
                        className="w-full"
                        alt=""
                      />
                    </div>
                    <button className="text-violet-500">
                      {" "}
                      <i className="bi bi-camera"></i> Click Now!
                    </button>
                  </div>
                  <div className="w-full flex justify-center">
                    <div className="w-80 flex justify-between"></div>
                  </div>
                  <input
                    className="border rounded w-[45%] px-3 py-2 shadow focus:border-violet-700"
                    type="text"
                    defaultValue={state.PersonalData.name}
                    ref={name}
                  />

                  <input
                    className="border rounded w-[45%] px-3 py-2 shadow focus:border-violet-700"
                    type="text"
                    defaultValue={state.PersonalData.heading}
                    ref={heading}
                  />
                  <input
                    className="border rounded w-[45%] px-3 py-2 shadow focus:border-violet-700"
                    type="text"
                    defaultValue={state.PersonalData.paragraph}
                    ref={paragraph}
                  />
                  <div className="w-full">
                    <div className=" flex border rounded w-[100%] shadow focus:border-violet-700">
                      <input
                        className=" w-[100%] px-3 py-2"
                        type="text"
                        ref={subline}
                      />

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedSubline(() => [
                            ...selectedSubline,
                            subline.current.value,
                          ]);
                        }}
                        className="bg-violet-500 text-white font-semibold px-3 py-2 rounded"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex gap-[5px] flex-wrap">
                      {selectedSubline?.map((each, Index) => [
                        <div
                          key={Index}
                          className="flex items-center justify-bwtween text-sm bg-slate-100 rounded pl-4 pr-2 py-2 text-black"
                        >
                          <span>{each}</span>
                          &nbsp; &nbsp;
                          <button
                            className="text-slate-500"
                            onClick={(e) => {
                              e.preventDefault();
                              console.log(Index);
                              const updatedArray = [...selectedSubline];
                              updatedArray.splice(Index, 1);

                              setSelectedSubline(updatedArray);
                            }}
                          >
                            <i className="bi bi-x"></i>
                          </button>
                        </div>,
                      ])}
                    </div>
                  </div>

                  <input
                    type="submit"
                    value="Change"
                    className="px-3  py-2 bg-violet-500 rounded shadow text-white"
                  />
                </form>
              </div>
              {
                openGalaray &&
                <div className="absolute top-0 w-[80%]  h-[100vh] flex justify-center items-center">
                <div className="relative p-[30px] max-w-[600px] w-full rounded shadow bg-white">
                  <button className="absolute top-[4px] right-[4px]"
                  onClick={()=>{
                    setOpenGalaray(false)
                  }}
                  ><i className="bi bi-x"></i></button>
                <h1 className=" mb-8 text-xl fomt-semibold">Select Image from your Galar</h1>
                  
                  <div className="flex gap-[5px]">
                    {state?.PersonalData?.Galary &&
  state?.PersonalData?.Galary.map((each) => (
    <div 
    onClick={(e)=>{
      e.preventDefault()
      setdpimage(each)
      setImg(null)
      
    }}
    key={each} 
    className="w-[100px] overflow-hidden h-[100px]">
      <img src={each} className="w-full" alt="" />
    </div>
  ))}
                  </div>
                </div>
              </div>
              }
              
            </div>
          ) : (
            <div className="max-w-[1000px] w-full p-[40px] bg-[white] border-rounded shadow-xl">
              <h1 className="text-4xl font-semibold">404</h1>
              <p>no page matched to {pageQuerrry}</p>
            </div>
          )
        ) : (
          <>
            <div className="flex gap-[10px] flex-wrap">
              <div className="max-w-[250px] w-full p-[20px] bg-[white] border-rounded shadow">
                <h1 className="text-xl font-semibold">Total Trafic</h1>
                <p className="mt-2 text-xl text-violet-500 font-semibold">
                  342
                </p>
              </div>
              <div className="max-w-[250px] w-full p-[20px] bg-[white] border-rounded shadow">
                <h1 className="text-xl font-semibold">Contect Requests</h1>
                <p className="mt-2 text-xl text-violet-500 font-semibold">
                  342
                </p>
              </div>
              <div className="max-w-[250px] w-full p-[20px] bg-[white] border-rounded shadow">
                <h1 className="text-xl font-semibold">Total Articles</h1>
                <p className="mt-2 text-xl text-violet-500 font-semibold">
                  342
                </p>
              </div>
              <div className="max-w-[250px] w-full p-[20px] bg-[white] border-rounded shadow">
                <h1 className="text-xl font-semibold">Total Projects</h1>
                <p className="mt-2 text-xl text-violet-500 font-semibold">
                  342
                </p>
              </div>
            </div>
            <div className="max-w-[360px] w-full p-[20px] bg-[white] border-rounded shadow-xl">
              <h1 className="text-xl font-semibold">Activities</h1>
              <div className="flex text-[black] flex-col gap-[10px] overflow-scroll w-full h-[150px] bg-white rounded">
                {NotificationArray?.map((noti) => [
                  <div
                    onClick={() => {
                      noti.Status === "pending" &&
                        updateNotificationHandler(noti._id);
                    }}
                    key={noti._id}
                    className="flex justify-between items-center border-b pb-[10px] px-[10px]"
                  >
                    <h1>
                      <Link to={`/${noti.link}`}>{noti.title}</Link>
                    </h1>

                    {noti.Status === "pending" && (
                      <span className="w-[10px] h-[10px] p-[3px] bg-violet-500 rounded-full"></span>
                    )}
                  </div>,
                ])}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
