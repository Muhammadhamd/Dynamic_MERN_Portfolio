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
    clientId="813263564517-jngb9jed5kfd3eskmbu19sjhmq621u8b.apps.googleusercontent.com"
    // render={renderProps => (
    //   <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
    // )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'https://muhammadhamd.up.railway.app'}
    isSignedIn={true} 
  />
    </div>
  );
};

export default GoogleAuth;
