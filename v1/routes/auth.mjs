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
const admincol = db.collection("admin")


 function authenticateAdmin(req, res, next) {
  const token = req.cookies.AdminToken; // Assuming you store the token in a cookie
  console.log("token here ahha",token)
  if (token) {
    // Verify and decode the token here (use your actual logic)
    // For example, you can use the 'jsonwebtoken' library
    const decodedData = jwt.verify(token, SECRET);

    if (decodedData.exp > Date.now()) {
      // If the token is valid, set the user data in the request object
      res.cookie('AdminToken', '', {
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

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    // const hashedPassword = await bcrypt.hash(password, 10)
   
      

    try {
      const data = await admincol.findOne({email:email});
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
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
          isAdmin:true
      }, SECRET);

      // res.send(token);

      res.cookie('AdminToken', token, {
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
            _id:data._id,
            isAdmin:true
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
 
  
  router.get("/Admin-logout",authenticateAdmin,(req, res) => {

    res.cookie('AdminToken', '', {
         maxAge: 1,
         httpOnly: true
     });
 
     res.send("Logout successful" );
     console.log(req.cookies.AnToken)
 })

  router.get("/getToken",(req,res)=>{
    console.log(req.cookies.AdminToken)
    

   try {
    if(req?.cookies?.AdminToken){
      const decodedData = jwt.verify(req.cookies.AdminToken, SECRET);

      if (decodedData.exp > Date.now()) {
        // If the token is valid, set the user data in the request object
        res.cookie('AdminToken', '', {
            maxAge: 1,
            httpOnly: true,
          })
        
      }else{
        req.body.decodedData = decodedData;
        res.send({
          data:{
  
          name:decodedData.name,
          email:decodedData.email,
          _id:decodedData._id,
          isAdmin:decodedData.isAdmin
        }
        })
        return
      }
    }else if(req?.cookies?.Token){
      const decodedData = jwt.verify(req.cookies.Token, SECRET);
      if (decodedData.exp > Date.now()) {
        // If the token is valid, set the user data in the request object
        res.cookie('Token', '', {
            maxAge: 1,
            httpOnly: true,
          })
        
      }else{
        res.send({
          data:{
  
          name:decodedData.name,
          email:decodedData.email,
          _id:decodedData._id,
          isAdmin:decodedData.isAdmin
        }
        })
      }
     
    }else{
      res.status(401).send("not login haha")
    }
    
      
   } catch (error) {
    res.status(500).send('internal error')
   }


     
  })

  export default router