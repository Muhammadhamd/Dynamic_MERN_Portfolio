import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleAuth = () => {
  const responseGoogle = (response) => {
    // Handle the response from Google authentication
    console.log(response);
  };

  return (
    <div className='mt-[100px]'>
      {/* Your website content goes here */}
      
      {/* Google Login Button */}
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'https://muhammadhamd.up.railway.app'}
        isSignedIn={true}
        // Additional settings if needed
        // redirectUri="https://muhammadhamd.up.railway.app" 
        // onRequest={() => console.log("Requesting...")}
        // scope="profile email"
      />
    </div>
  );
};

export default GoogleAuth;