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
   loginHandler()
  },[])

  useEffect(()=>{
    setTheme(state.darkTheme)
  },[])
  // Other code...
  console.log(state.role , state.isLogin)
  return (
    <div>
      {/* Render your components with the theme and login props */}
      {state.isLogin === true && state.role === "admin" ? (
        <>
          <Navcomponent theme={theme} islogin={true} />
          <Routes>
            <Route exact path="/" element={<Home theme={theme} />} />
            <Route exact path="/dashboard" element={<Dashboard  />} />
          <Route exact path="/work" element={<Project theme={theme} />} />

            <Route exact path="/article/:postId" element={<PostPage theme={theme} />} />
            <Route exact path="/article" element={<ArticlesPage theme={theme} />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null}
      
      {state.isLogin === true && state.role === "user" ? (
        <>
          <Navcomponent theme={theme} islogin={true} />
          <Routes>
            <Route exact path="/" element={<Home theme={theme} />} />
          <Route exact path="/work" element={<Project theme={theme} />} />

            <Route exact path="/admin-login" element={<Adminlogin  />} />
            <Route exact path="/article/:postId" element={<PostPage theme={theme} />} />
            <Route exact path="/article" element={<ArticlesPage theme={theme} />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />

          </Routes>
        </>
      ):null}
      {state.isLogin === false?(
        <>
        <Navcomponent theme={theme} islogin={false} />
        <Routes>
          <Route exact path="/" element={<Home theme={theme} />} />
          <Route exact path="/work" element={<Project theme={theme} />} />
          <Route exact path="/Login" element={<UserLogin theme={theme} />} />
          <Route exact path="/register" element={<UserRegister theme={theme} />} />
          <Route exact path="/admin-login" element={<Adminlogin theme={theme} />} />
          <Route exact path="/article/:postId" element={<PostPage theme={theme} />} />
          <Route exact path="/article" element={<ArticlesPage theme={theme} />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      </>
      ):null
    
    }
    </div>
  );
}

export default App;