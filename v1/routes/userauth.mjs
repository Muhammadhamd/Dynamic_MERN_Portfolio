import express from "express";
const router = express.Router();
import path from "path";
import mongoose from "mongoose"
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
const __dirname = path.resolve();
const SECRET = process.env.SECRET || "topsecret";
import {client} from "../../mongodb.mjs"
import { ObjectId } from "mongodb"
const db = client.db("Portfolio");
const admincol = db.collection("user")
import multer from 'multer'

 function authenticateAdmin(req, res, next) {
  const token = req.cookies.Token; // Assuming you store the token in a cookie
  if (token) {
    // Verify and decode the token here (use your actual logic)
    // For example, you can use the 'jsonwebtoken' library
    const decodedData = jwt.verify(token, SECRET);

    if (decodedData.exp > Date.now()) {
      // If the token is valid, set the user data in the request object
      res.cookie('Token', '', {
          maxAge: 1,
          httpOnly: true,
        })
      
    }else{
      req.body.decodedData = decodedData;
      console.log(decodedData)
      next()
    }
  }
}

router.post("/userlogin", async (req, res) => {
    const { email, password } = req.body;
  
    // const hashedPassword = await bcrypt.hash(password, 10)
   
      

    try {
      const data = await admincol.findOne(
        { email: email  },
        "email password"
      );
  0
      if (!data) {
        console.log("User not found");
        return res.status(401).send( "Incorrect email or password" );
      }
  
      const isMatch = await bcrypt.compare(password, data.password);
  
      if (isMatch) {
        console.log("Password matches");
  
        const token = jwt.sign({
          _id: data._id,
          email: data.email,
          name: data.name,
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
          isAdmin:false
      }, SECRET);

      // res.send(token);

      res.cookie('Token', token, {
          maxAge: 86_400_000,
          httpOnly: true,
          // sameSite: true,
          // secure: true
      });
      // Cookies.set("username", "john", { expires: 7, path: "/" });
        // console.log(req.cookies.Token)
        res.send({
          message:'login sucessfully',
          data:{
            email: data.email,
            name: data.name,
            _id:data._id,
            isAdmin:false
          }
        });
        return
      } else {
        console.log("Password did not match");
        return res.status(401).send("Incorrect password" );
      }
    } catch (err) {
      console.log("DB error:", err);
      res.status(500).send( "Login failed, please try later" );
    }
  });
  router.post('/userregister',async (req, res) => {
    const { password, email, name } = req.body;
    if (!password || !email || !name) {
      return res.status(400).send('Required fields are missing.');
    }
  
    try {
  
  
      
            
  
      const user = await admincol.findOne({ email });
      if (user) {
        return res.status(400).send('User already exists. Please use a different email.');
      } else {
       
  
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await admincol.insertOne({
          name,
          email,
          password: hashedPassword,
        });
        console.log(data.email)
        // const token = jwt.sign({
        //   _id: data._id,
        //   email: data.email,
        //   name:data.name,
        //   image:data.profileImage,
        //   iat: Date.now() / 1000 - 30,
        //   exp: Date.now() / 1000 + (60 * 60 * 48),
        // }, SECRET);
  
        // res.cookie('Token', token, {
        //   maxAge: 86_400_000,
        //   httpOnly: true,
        // });
  
        res.send({
          message:'user logedin',
          data:{
            fgss:"hewr"
          }
        })
      }
    } catch (error) {
      console.error('Error during user registration:', error);
      res.status(500).json({ error: 'Failed to register user.' });
    }
  });
  router.get("/user-logout",authenticateAdmin,(req, res) => {

    res.cookie('Token', '', {
         maxAge: 1,
         httpOnly: true
     });
 
     res.send("Logout successful" );
     console.log(req.cookies.AnToken)
 })



  export default router