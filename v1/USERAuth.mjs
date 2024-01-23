const handleGoogleSignIn = "hejs"
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
