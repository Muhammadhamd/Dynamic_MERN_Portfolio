import React, { useEffect, useState , useContext} from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Adminlogin from "./component/adminlogin";
import PostPage from "./component/post.jsx";
import Home from "./home.jsx";
import Navcomponent from "./component/navbar.jsx";
import axios from "axios";
import ArticlesPage from "./component/article";
import Dashboard from "./component/dashboard";
import {GlobalContext} from  './context/context'
import UserLogin from "./component/login";
import UserRegister from "./component/register";
import Project from "./component/Projects";
import About from "./component/about";
function App() {
  const { state, dispatch } = useContext(GlobalContext);

  const [theme, setTheme] = useState(null); // Set the initial state as needed
  const [login, setLogin] = useState(null);
  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        config.withCredentials = true;
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }, []);

  
  const loginHandler = async()=>{
    try {
      const res = await axios.get("http://localhost:2344/getToken",
      {withCredentials: true,
      })
      console.log(res)
      dispatch({
        type: "USER_LOGIN",
        payload: res.data.data,
      });

    } catch (error) {
      console.log(error)
      dispatch({
        type: "USER_LOGOUT"
      })
    }
  }
  useEffect(()=>{
    axios.get(`http://localhost:2344/mydata`)
    .then((res)=>{
      dispatch({
        type: "MY_DATA",
        payload: res.data,
      });
    })
    .catch((e)=>{
      console.log(e)
      // setAfterNetwork(false)

    })
  },[])
  useEffect(()=>{
   loginHandler()
  },[])

  useEffect(()=>{
           
  },[])
  // Other code...
  console.log(state.role , state.isLogin , state.PersonalData)
  return (
    <div>
      {/* Render your components with the theme and login props */}
      {state.isLogin === true && state.role === "admin" ? (
        <>
           {window.location.pathname !== "/dashboard" && <Navcomponent theme={state.darkTheme} islogin="admin" />}
          <Routes>
            <Route exact path="/" element={<Home theme={state.darkTheme} />} />
            <Route exact path="/dashboard" element={<Dashboard  />} />
          <Route exact path="/work" element={<Project theme={state.darkTheme} />} />

            <Route exact path="/article/:postId" element={<PostPage isAdmin={true} theme={state.darkTheme} />} />
            <Route exact path="/article" element={<ArticlesPage theme={state.darkTheme} />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null}
      
      {state.isLogin === true && state.role === "user" ? (
        <>
          <Navcomponent theme={state.darkTheme} islogin="user" />
          <Routes>
            <Route exact path="/" element={<Home theme={state.darkTheme} />} />
          <Route exact path="/work" element={<Project theme={state.darkTheme} />} />

            <Route exact path="/admin-login" element={<Adminlogin  />} />
            <Route exact path="/article/:postId" element={<PostPage isAdmin={false} theme={state.darkTheme} />} />
            <Route exact path="/article" element={<ArticlesPage theme={state.darkTheme} />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />

          </Routes>
        </>
      ):null}
      {state.isLogin === false?(
        <>
        <Navcomponent theme={state.darkTheme} islogin={false} />
        <Routes>
          <Route exact path="/" element={<Home theme={state.darkTheme} />} />
          <Route exact path="/work" element={<Project theme={state.darkTheme} />} />
          <Route exact path="/Login" element={<UserLogin theme={state.darkTheme} />} />
          <Route exact path="/register" element={<UserRegister theme={state.darkTheme} />} />
          <Route exact path="/admin-login" element={<Adminlogin theme={state.darkTheme} />} />
          <Route exact path="/article/:postId" element={<PostPage theme={state.darkTheme} />} />
          <Route exact path="/article" element={<ArticlesPage theme={state.darkTheme} />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </>
      ):null
    
    }
    </div>
  );
}

export default App;
