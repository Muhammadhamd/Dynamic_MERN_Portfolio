import { OAuth2Client, auth } from 'google-auth-library';
import {gapi} from "gapi-script"
const CLIENT_ID = "813263564517-jngb9jed5kfd3eskmbu19sjhmq621u8b.apps.googleusercontent.com"; // Replace with your actual Google client ID
const client = new OAuth2Client(CLIENT_ID);

const handleGoogleSignIn = async (req,res) => {
    try {
      const googleUser = await gapi.auth2.getAuthInstance().signIn();
      const idToken = googleUser.getAuthResponse().id_token;
  
      // Send the idToken to the server (e.g., using an HTTP request)
      // This is where you would make an API call to your server
    //   sendIdTokenToServer(idToken);
         res.send(idToken)
    } catch (error) {
      console.error('Google Sign-In failed:', error);
      res.send(error)
    }
  };

// async function authMiddleware(req, res, next) {
//   const googleIdToken = req.cookies.GoogleIdToken;

//   if (!googleIdToken) {
//     res.status(401).send('Google ID token not provided');
//     return;
//   }

//   try {
//     const decodedData = await verifyGoogleIdToken(googleIdToken);

//     // Now you have the decoded data from the Google ID token
//     console.log('Google user decodedData: ', decodedData);

//     // You can perform additional checks or save the user data to req.decodedData

//     next();
//   } catch (error) {
//     res.status(401).send(error.message);
//   }
// }
export default handleGoogleSignIn
