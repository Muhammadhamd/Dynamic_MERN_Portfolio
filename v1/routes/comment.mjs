import express from "express"
import mongoose, { model } from "mongoose"
const router = express.Router()
import {client} from "../../mongodb.mjs"
import { ObjectId } from "mongodb"
const db = client.db("Portfolio");
const col = db.collection("posts")
const admincol = db.collection("admin")
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
import cookieParser from "cookie-parser";
import app from '../../firebaseconfig.mjs'
import path from 'path'
import jwt from "jsonwebtoken"
const __dirname = path.resolve();
const SECRET = process.env.SECRET || "topsecret";
import multer from 'multer';


 function authMiddleware(){

    if(!req?.cookies?.Token){
        res.status(401).send("login please")
    }else{
        jwt.verify(req.cookies.Token, SECRET, function (err, decodedData) {
            if (!err) {
    
                console.log("user decodedData: ", decodedData);
    
                const nowDate = new Date().getTime() / 1000;
    
                if (decodedData.exp < nowDate) {
    
                    res.status(401);
                    res.cookie('Token', '', {
                        maxAge: 1,
                        httpOnly: true
                    });
    
                    res.status(401).send("login again")
    
    
    
                } else {
    
                    console.log("token approved");
    
                    req.decodedData = decodedData
                    next();
                }
            } else {
                      res.status(401).send("authentication failed")
    
            }
        });
    }
 }
router.post("/addcomment:postid",async(req,res)=>{
     const postid = req.params.postid
     const {comment} = req.body


     try {
        const posts = await col.findOne({_id : new ObjectId(postid)})

    
        await postsCol.updateOne(
            { _id: new ObjectId(postid) },
            { $push: { 'comments': { 
              id: new ObjectId(),
                
               text:comment
            } ,
            
            } 
        }
          );
        
        res.send("review uploaded")
        
     } catch (error) {
        
     }
})
router.post("/addcomment:postid", async(req,res ,next)=>{
    const postid = req.params.postid
    const {name , email , text} = req.body

console.log("data coming")
     

 
    const posts = await postsCol.findOne({_id : new ObjectId(postid)})

    
    await postsCol.updateOne(
        { _id: new ObjectId(postid) },
        { $push: { 'reviews': { 
          id: new ObjectId(),
            email: email,
            name:name,
           text:text
        } ,
        
        } 
    }
      );
    
    res.send("review uploaded")
})



// DELETE  /api/v1/post/:userId/:postId




export default router