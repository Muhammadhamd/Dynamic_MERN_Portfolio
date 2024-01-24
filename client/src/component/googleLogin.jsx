
import React, { useContext, useEffect } from 'react';
import { GoogleLogin , GoogleLogout } from 'react-google-login';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';
import axios from "axios"
import { gapi } from 'gapi-script';
import { GlobalContext } from '../context/context';
const   GoogleLoginfun = () => {
  const responseGoogle = (response) => {
    // Handle the response from Google authentication
    console.log(response);
  };

  return (
    <div className=''>
      {/* Your website content goes here */}
      
      {/* Google Login Button */}
      <GoogleLogin
        clientId="813263564517-jngb9jed5kfd3eskmbu19sjhmq621u8b.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        
        isSignedIn={true}
        // Additional settings if needed
        redirectUri="https://muhammadhamd.up.railway.app" 
        onRequest={() => console.log("Requesting...")}
        scope=""
      />
    </div>
  );
};

const  GoogleLogoutfun = () => {
  const {state , dispatch} = useContext(GlobalContext)
  function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    
    auth2.signOut().then(() => {
      console.log('User signed out.');
      // Perform any additional tasks after successful logout
    });
  }
    const responseGoogle = async(response) => {
      // Handle the response from Google authentication
      try {
      await axios.get("/user-logout")
      dispatch({
        type:'USER_LOGOUT'
       })
       signOut()
      console.log(response);

      } catch (error) {
      console.log(error);
        
      }  
    };
  
    return (
      <div className=''>
        {/* Your website content goes here */}
        
        {/* Google Login Button */}
        <GoogleLogout
         clientId="813263564517-jngb9jed5kfd3eskmbu19sjhmq621u8b.apps.googleusercontent.com"

          buttonText="Logout"
          onLogoutSuccess={responseGoogle}
        />
       
      </div>
    );
  };

  
const GoogleOneTapSignIn = () => {
   
  const {state , dispatch} = useContext(GlobalContext)
  
   
  
   
useGoogleOneTapLogin({
  onSuccess: (res) => {
    try {
      // Assuming 'res' is an object containing relevant information
      axios.post("/api/google-login", {
       res,
      })
      .then((response) => {
        console.log(response.data);
        dispatch({
          type:"USER_LOGIN",
          payload:response.data.data
        })
      })
      .catch((err) => {
        console.error('Error:', err);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  },
  onError: (err) => {
    console.log('Error:', err);
  },
  googleAccountConfigs: {
    client_id: "813263564517-jngb9jed5kfd3eskmbu19sjhmq621u8b.apps.googleusercontent.com",
  },
});
  };
  
  
  export {GoogleOneTapSignIn, GoogleLoginfun , GoogleLogoutfun}
  