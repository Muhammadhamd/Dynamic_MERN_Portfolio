import react, { useContext, useEffect, useRef, useState } from "react";
import SubmitBtn from "./submitbtn";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/context";

function Dashboard() {
  const { state, dispatch } = useContext(GlobalContext);

  const navigate = useNavigate();
  const [productItems, setProductItem] = useState([]);
  const [title, settitle] = useState("");
  const [rerenderOnPost, setrerenderOnPost] = useState(false);
  const [rerender, setrerender] = useState(false);
  const [image, setdpimage] = useState(null);
  const [Articleimage, setArticleimage] = useState(null);
  const [URLtitle, setURLtitle] = useState("");
  const [img, setImg] = useState(state.PersonalData.dp);
  const [Articleimg, setArticleImg] = useState();
  const [content, setContent] = useState("");
  const [ProductsArray, setProductsArray] = useState([]);
  const projectRepoRef = useRef(null);
  const projectliveLinkRef = useRef(null);
  const projectImage = useRef(null);
  const [img_pro, setImg_pro] = useState();
  const [openOption, setOpenOption] = useState();
  const [NotificationArray, setNotificationArray] = useState([]);
  const notifyCountRef = useRef();
  const titleRef = useRef();
  const name = useRef();
  const heading = useRef();
  const subline = useRef();
  const paragraph = useRef();

  const pageQuerrry =
    new URLSearchParams(window.location.search).get("Page") ||
    new URLSearchParams(window.location.search).get("page");
  const TargetedComment = useRef();
  console.log(pageQuerrry);
  const deleteProductHandler = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:2344/delete-product/${id}`
      );
      console.log(res.data);
      setrerenderOnPost(true);
    } catch (error) {
      console.log(error);
    }
  };
  const AddProducthandler = (e) => {
    e.preventDefault();

    const newAdd = {
      heading: title,
      content: content,
      urlTitle: URLtitle,
    };

    setProductsArray((ProductsArray) => [...ProductsArray, newAdd]);
    const formdata = new FormData();
    formdata.append("Heading", title);
    formdata.append("content", content);

    formdata.append("setUrl", URLtitle);
    formdata.append("image", Articleimg);
    axios
      .post("http://localhost:2344/post", formdata, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setrerenderOnPost(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const AddProjectHandler = async (e) => {
    e.preventDefault();

    try {
      const formdata = new FormData();
      formdata.append("hostlink", projectliveLinkRef.current.value);

      formdata.append("RepoLink", projectRepoRef.current.value);
      formdata.append("image", img_pro);
      const res = await axios.post(
        `http://localhost:2344/Add-project`,
        formdata,
        { withCredentials: true }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const NotificationHandle = async () => {
    try {
      const res = await axios.get("http://localhost:2344/notifications");
      setNotificationArray(res?.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const updateNotificationHandler = async (notifyId) => {
    try {
      const res = await axios.put(
        `http://localhost:2344/updateNotifyStatus/${notifyId}`
      );
    } catch (error) {}
  };
  useEffect(() => {
    NotificationHandle();
  }, []);
  useEffect(() => {
    notifyCountRef.current = NotificationArray.filter(
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
  const dummydata = [
    {
      title: "how to cansole string in ES6",
      status: "published",
      date: "23 oct",
      visibility: true,
      img: "https://firebasestorage.googleapis.com/v0/b/buying-selling-hh.appspot.com/o/1697944738470-unnamed.png?alt=media&token=38265ee8-97a2-4316-878c-8c6ed02a783a",
    },
    {
      title: "how to cansole string in ES6",
      status: "published",
      date: "23 oct",
      visibility: false,
      img: "https://firebasestorage.googleapis.com/v0/b/buying-selling-hh.appspot.com/o/1697944738470-unnamed.png?alt=media&token=38265ee8-97a2-4316-878c-8c6ed02a783a",
    },
    {
      title: "how to cansole string in ES6",
      status: "published",
      date: "23 oct",
      visibility: true,
      img: "https://firebasestorage.googleapis.com/v0/b/buying-selling-hh.appspot.com/o/1698858448452-Mern%20Stack%20ecommerce%20website.jpg?alt=media&token=8dc2083a-2963-4bc7-809f-653d73ba8fda",
    },
    {
      title: "how to cansole string in ES6",
      status: "published",
      date: "23 oct",
      visibility: true,
      img: "https://firebasestorage.googleapis.com/v0/b/buying-selling-hh.appspot.com/o/1697944738470-unnamed.png?alt=media&token=38265ee8-97a2-4316-878c-8c6ed02a783a",
    },
    {
      title: "how to cansole string in ES6",
      status: "published",
      date: "23 oct",
      visibility: true,
      img: "https://firebasestorage.googleapis.com/v0/b/buying-selling-hh.appspot.com/o/1697944738470-unnamed.png?alt=media&token=38265ee8-97a2-4316-878c-8c6ed02a783a",
    },
    {
      title: "how to cansole string in ES6",
      status: "published",
      date: "23 oct",
      visibility: true,
      img: "https://firebasestorage.googleapis.com/v0/b/buying-selling-hh.appspot.com/o/1697944738470-unnamed.png?alt=media&token=38265ee8-97a2-4316-878c-8c6ed02a783a",
    },
  ];
  // const productsHandler = async()=>{

  //   try {
  //     const res = await axios.get('/posts')
  //     console.log(res.data)
  //     setProductItem((productItems) => [...productItems , res.data])
  //    setrerender(true)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // useEffect(()=>{
  //   // productsHandler()
  // },[rerenderOnPost])
  // useEffect(()=>{
  //   console.log(productItems)
  // },[productItems])
  // useEffect(()=>{
  //     console.log(ProductsArray)

  // },[ProductsArray])
  // useEffect(()=>{
  //     AdmincheckingHandler()
  // },[islogin])
  const editUserData = async (e) => {
    e.preventDefault();

    try {
      let formdata = new FormData();
      formdata.append("namey", name.current.value);
      formdata.append("subline", subline.current.value);
      formdata.append("heading", heading.current.value);
      formdata.append("paragraphy", paragraph.current.value);

      formdata.append("dpImg", img);
      const res = await axios.put("http://localhost:2344/userinfo", formdata, {
        withCredentials: true,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
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
            <div className=" max-w-[1000px] w-full p-[40px] bg-[white] border-rounded shadow-xl">
              <h1 className="text-4xl font-semibold">Add a Article</h1>
              <form onSubmit={AddProducthandler}>
                <div className="flex justify-center h-[80px] my-[10px] w-[40px]">
                  <img
                    className=" w-full"
                    src={Articleimage}
                    alt=""
                    onClick={(e) => {
                      document.getElementById("inputArticleimage").click();
                    }}
                  />
                  <input
                    type="file"
                    id="inputArticleimage"
                    hidden
                    onChange={(e) => {
                      setArticleimage(URL.createObjectURL(e.target.files[0]));
                      setArticleImg(e.target.files[0]);
                    }}
                  />
                </div>
                <div className="flex flex-col w-full gap-[20px]">
                  <input
                    type="text"
                    value={title}
                    className="border px-4 py-3 w-full"
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                    placeholder="title...."
                  />
                  <input
                    type="text"
                    value={URLtitle}
                    className="border px-4 py-3 w-full"
                    onChange={(e) => {
                      setURLtitle(e.target.value);
                    }}
                    placeholder="add a unique title for Url"
                  />

                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    value={content}
                    className="border px-4 py-3 w-full"
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                    placeholder="add content"
                  ></textarea>
                  <div className="w-full">
                    <SubmitBtn
                      value="add new Product"
                      valueOnUpload="addingg"
                      Requirments={[title, content, URLtitle]}
                    />
                  </div>
                </div>
              </form>
            </div>
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
                        Requirments={[title, content, URLtitle]}
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
                {dummydata?.map((each) => (
                  <tr key={each.title}>
                    <td>{each.title}</td>
                    <td>{each.date}</td>
                    <td>{each.status}</td>
                    <td>
                      <i
                        className={`${
                          each.visibility
                            ? "bi bi-eye-fill"
                            : "bi bi-eye-slash-fill"
                        }`}
                      ></i>
                    </td>
                    <td className="flex flex-col text-slate-500 text-sm">
                      <button>Edit</button>
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
                {dummydata?.map((each) => (
                  <tr key={each.title}>
                    <td>
                      <div className="w-[60px]">
                        <img src={each.img} className="w-full" alt="" />
                      </div>
                    </td>
                    <td>{each.date}</td>
                    <td>
                      <a href="https://github.com/muhammadhamd">
                        https://github.com/muhammadhamd
                      </a>
                    </td>
                    <td>{each.status}</td>
                    <td>
                      <i
                        className={`${
                          each.visibility
                            ? "bi bi-eye-fill"
                            : "bi bi-eye-slash-fill"
                        }`}
                      ></i>
                    </td>
                    <td className="flex flex-col text-slate-500 text-sm">
                      <button>Edit</button>
                      <button>Delete</button>
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
                  <div className="w-full flex justify-center">
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
                    defaultValue={state.PersonalData.subline}
                    ref={subline}
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
                  <input
                    type="submit"
                    value="Change"
                    className="px-3  py-2 bg-violet-500 rounded shadow text-white"
                  />
                </form>
              </div>
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
