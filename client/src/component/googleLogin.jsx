import React from 'react';
import { GoogleLogin } from 'react-google-login';

const GoogleAuth = () => {
  const responseGoogle = (response) => {
    // Handle the response from Google authentication
    console.log(response);
  };

  return (
    <div>
      {/* Your website content goes here */}
      
      {/* Google Login Button */}
      <GoogleLogin
        clientId="813263564517-jngb9jed5kfd3eskmbu19sjhmq621u8b.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleAuth;
