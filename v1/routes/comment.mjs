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
import { notify } from "./notification.mjs"


 function authMiddleware(req,res,next){

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
router.post("/addcomment/:postid", authMiddleware,async(req,res)=>{
     const postid = req.params.postid
     const {message} = req.body
          

     try {
        const post = await col.findOne({_id : new ObjectId(postid)})
        if (!post) {
            res.status(404).send("post not found")
            return
        }
        const id = new ObjectId()
    
        await col.updateOne(
            { _id: new ObjectId(postid) },
            { $push: { 'comments': { 
              id,
                authorName:req.decodedData.name,
                authorId:req.decodedData._id,
               text:message,
               timestamp:new Date()
            } ,
            
            } 
        }
          );
        
        res.send({message:"comment added",data:{
            id,
            authorName:req.decodedData.name,
            authorId:req.decodedData._id,
           text:message,
           timestamp:new Date()
        }})

        notify(`article/${post?.ArticleUrl}?C=${id}` , `${req.decodedData.name} just Commented`)
        
     } catch (error) {
        res.status(500).send(error)
     }
})
router.post("/addReply/:postid/:commentid",authMiddleware, async(req,res ,next)=>{
    const postid = req.params.postid
    const commentid = req.params.commentid
    const {reply} = req.body

    try {
        const post = await col.findOne({_id : new ObjectId(postid)})

    
        const comment = post?.comments?.findIndex((comment)=>{ comment.id === commentid})
        console.log(comment)
        if (comment > -1) {
            res.status(404).send("comment does not exist")
            return
        }
        
        await col.updateOne(
            { _id: new ObjectId(postid) , "comments.id": new ObjectId(commentid) },
            { $push: { 'comments.$.replies': { 
              id: new ObjectId(),
                authorName:req.decodedData.name,
                authorId:req.decodedData._id,
               text:reply,
               timestamp:new Date()
            } ,
            
            } 
        }
          );
        
        res.send({
            id: new ObjectId(),
                authorName:req.decodedData.name,
                authorId:req.decodedData._id,
               text:reply,
               timestamp:new Date()
        })
        
     } catch (error) {
        res.status(500).send(error)
     }
})



// DELETE  /api/v1/post/:userId/:postId




export default router