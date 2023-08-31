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
          iat: Date.now() / 1000 - 30,
          exp: Date.now() / 1000 + (60 * 60 * 24),
        }, SECRET);
        console.log('token', token);
  
        res.cookie('token', token, {
          maxAge: 86_400_000,
          httpOnly: true,
        });
  
        // res.redirect("/")
      } else {
        console.log("Password did not match");
        return res.status(401).send("Incorrect password" );
      }
    } catch (err) {
      console.log("DB error:", err);
      res.status(500).send( "Login failed, please try later" );
    }
  });
  

  router.get("/tokenCheck",(req,res)=>{

    console.log("req.cookies: ", req.cookies.token);
  })
  export default router