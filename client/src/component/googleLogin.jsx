
import React, { useEffect } from 'react';
import { GoogleLogin , GoogleLogout } from 'react-google-login';
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';
import axios from "axios"
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
    const responseGoogle = (response) => {
      // Handle the response from Google authentication
      console.log(response);
    };
  
    return (
      <div className='mt-[100px]'>
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
   
  
   
  
   
useGoogleOneTapLogin({
  onSuccess: (res) => {
    try {
      // Assuming 'res' is an object containing relevant information
      axios.post("/api/google-login", {
       res,
      })
      .then((response) => {
        console.log(response.data);
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
  