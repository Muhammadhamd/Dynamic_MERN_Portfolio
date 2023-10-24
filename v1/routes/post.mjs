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
const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
    },
  });
  
// const postSchema =  new mongoose.Schema({

  
//     timeStamp:{
//         type: Date,
//         default: Date.now
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     heading:{
//         type:String,
//         required:true
//     },
//     tags:{
//         type:Array,
//         required:true
//     },
   
  
//     image:{
//         type:String,
//         required:true
//     } ,
        
// })

function adminAuth(req,res,next){
    if(!req.cookies.AdminToken){
        return res.status(401).send('not login as admin')
    }

    const decodedData = jwt.verify(req.cookies.AdminToken , SECRET)

    if (decodedData.exp > Date.now()) {
        // If the token is valid, set the user data in the request object
        res.cookie('AdminToken', '', {
            maxAge: 1,
            httpOnly: true,
          })
           res.status(401).send("login again ")
           
      }else{
        req.body.decodedData = decodedData;
        console.log(decodedData)
        next()
      }
}
// const postModel = mongoose.model("post", postSchema)
router.post('/post',upload.single('image'),adminAuth, async(req,res,next)=>{

   const  {Heading , content , setUrl } = req.body
   console.log(req.body)

   const checkUrl = await col.findOne({ArticleUrl : setUrl})
   if (checkUrl) {
    return res.status(400).send("there is already a post exist with this url")
   }
   try {
    const addImgDB = req?.file
    let imgUrl = ''
 if (addImgDB) {
 const name = +new Date() + "-" + addImgDB.originalname;
 const metadata = {
  contentType: addImgDB.mimetype
 };
 const storageRef = ref(getStorage(app), name)
 
 const task = uploadBytes(storageRef, addImgDB.buffer, metadata);
 
 
 const snapshot = await task
 
 imgUrl =await getDownloadURL(snapshot.ref)
 console.log(imgUrl)
       
 }
     const post = await col.insertOne({
         timeStamp: new Date(),
         heading: Heading,
         content: content,
         image: imgUrl,
         ArticleUrl:setUrl
       });
     res.status(200).send("post suecssfully")
   } catch (error) {
    res.status(500).send("internal error ")
   }
  
})

router.get("/posts",async(req ,res)=>{

    const postsData = await col.find({}).toArray()

    res.send(postsData)
})

router.get('/post/:postId', async (req, res) => {

    const postID = req.params.postId
    console.log(postID)

    const data = await col.findOne(
        { 
            ArticleUrl: postID }
       
      );
      if(data){
        res.send(data)
        return
      }
      res.send('post not found')
})

router.delete("/post/:postid",async(req,res)=>{
    const postid = req.params.postid
    const update =  await col.findOneAndDelete({_id:new ObjectId(postid)})
    update ? res.send("post deleted") : res.send('error deleting post')
})

export default router