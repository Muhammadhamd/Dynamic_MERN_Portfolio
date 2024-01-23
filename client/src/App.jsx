import React, { useEffect, useState, useContext } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Adminlogin from "./component/adminlogin";
import PostPage from "./component/post.jsx";
import Home from "./home.jsx";
import Navcomponent from "./component/navbar.jsx";
import axios from "axios";
import ArticlesPage from "./component/article";
import Dashboard from "./component/dashboard";
import { GlobalContext } from "./context/context";
import UserLogin from "./component/login";
import UserRegister from "./component/register";
import Project from "./component/Projects";
import About from "./component/about";
import { useCallback } from "react";
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.
import {gapi} from "gapi-script"
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

  const loginHandler = async () => {
    try {
      const res = await axios.get("/getToken", {
        withCredentials: true,
      });
      console.log(res);
      dispatch({
        type: "USER_LOGIN",
        payload: res.data.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "USER_LOGOUT",
      });
    }
  };
  useEffect(() => {
    axios
      .get(`/mydata`)
      .then((res) => {
        dispatch({
          type: "MY_DATA",
          payload: res.data,
        });
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        // setAfterNetwork(false)
      });
  }, []);
  const NotificationHandle = async()=>{
    try {
      const res = await axios.get("/notifications")
      dispatch({
        type: "NOTIFICATION",
        payload: res.data,
      }) 
      

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    state.role === "admin" && NotificationHandle()
  }, [state.role]);
  useEffect(() => {
    loginHandler();
  }, []);

  useEffect(() => {}, []);
  // Other code...
  console.log(state.role, state.isLogin, state.PersonalData);
  const particlesInit = useCallback(async engine => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    await console.log(container);
}, []);


useEffect(()=>{
function start(){
  gapi.client.init({
    clientId:"813263564517-jngb9jed5kfd3eskmbu19sjhmq621u8b.apps.googleusercontent.com",
    scope:""
  })
}

gapi.load('client:auth2', start)
})
  return (
    <div className={`${state?.darkTheme ? "text-white bg-gray-900" : "bg-white"}`}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
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
                distance: 100,
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
              speed: 1, // Adjust the speed here
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 1500,
              },
              value: 100,
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
      />
      {/* Render your components with the theme and login props */}
      {state.isLogin === true && state.role === "admin" ? (
        <>
          {window.location.pathname !== "/dashboard" && (
            <Navcomponent theme={state.darkTheme} islogin="admin" />
          )}
          <Routes>
            <Route exact path="/" element={<Home theme={state.darkTheme} />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route
              exact
              path="/work"
              element={<Project theme={state.darkTheme} />}
            />

            <Route
              exact
              path="/article/:postId"
              element={<PostPage isAdmin={true} theme={state.darkTheme} />}
            />
            <Route
              exact
              path="/article"
              element={<ArticlesPage theme={state.darkTheme} />}
            />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null}

      {state.isLogin === true && state.role === "user" ? (
        <>
          <Navcomponent theme={state.darkTheme} islogin="user" />
          <Routes>
            <Route exact path="/" element={<Home theme={state.darkTheme} />} />
            <Route
              exact
              path="/work"
              element={<Project theme={state.darkTheme} />}
            />

            <Route exact path="/admin-login" element={<Adminlogin />} />
            <Route
              exact
              path="/article/:postId"
              element={<PostPage isAdmin={false} theme={state.darkTheme} />}
            />
            <Route
              exact
              path="/article"
              element={<ArticlesPage theme={state.darkTheme} />}
            />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null}
      {state.isLogin === false ? (
        <>
          <Navcomponent theme={state.darkTheme} islogin={false} />
          <Routes>
            <Route exact path="/" element={<Home theme={state.darkTheme} />} />
            <Route
              exact
              path="/work"
              element={<Project theme={state.darkTheme} />}
            />
            <Route
              exact
              path="/Login"
              element={<UserLogin theme={state.darkTheme} />}
            />
            <Route
              exact
              path="/register"
              element={<UserRegister theme={state.darkTheme} />}
            />
            <Route
              exact
              path="/admin-login"
              element={<Adminlogin theme={state.darkTheme} />}
            />
            <Route
              exact
              path="/article/:postId"
              element={<PostPage theme={state.darkTheme} />}
            />
            <Route
              exact
              path="/article"
              element={<ArticlesPage theme={state.darkTheme} />}
            />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        </>
      ) : null}
    </div>
  ); 
}

export default App;
