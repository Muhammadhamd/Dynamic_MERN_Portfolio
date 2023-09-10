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
const col = db.collection("admins")



router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    // const hashedPassword = await bcrypt.hash(password, 10)
   
      

    try {
      const data = await col.findOne(
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
          iat: Math.floor(Date.now() / 1000) - 30,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
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
        res.send("Login successful");
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
  
  router.get("/logout",(req, res) => {

    res.cookie('Token', '', {
         maxAge: 1,
         httpOnly: true
     });
 
     res.send("Logout successful" );
     console.log(req.cookies)
 })
  router.get("/token",(req,res)=>{

  if(req?.cookies?.Token){
   
    res.send({Tokenis:true}) 
    return
  }
     
     res.send({Tokenis:false})
  })

  export default router