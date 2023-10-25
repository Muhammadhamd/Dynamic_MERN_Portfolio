import express from "express"
import mongoose, { model } from "mongoose"
const router = express.Router()
import {client} from "../../mongodb.mjs"
import { ObjectId } from "mongodb"
const db = client.db("Portfolio");
const col = db.collection("projects")
import {  getStorage, ref, uploadBytes , getDownloadURL  } from "firebase/storage";
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

router.post('/Add-project',upload.single('image'),adminAuth, async(req,res,next)=>{

   const  { RepoLink , hostlink} = req.body

   

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
        image: imgUrl,
        RepoLink ,
        hostlink
      });
    res.status(200).send("post suecssfully")
} catch (error) {
    res.status(500).send('iternal error')
}
   
})

router.get("/api/projects",async(req ,res)=>{

    const postsData = await col.find({}).toArray()

    res.send(postsData)
})

router.delete("/project/:postid",async(req,res)=>{
    const postid = req.params.postid
    const update =  await col.findOneAndDelete({_id:new ObjectId(postid)})
    update ? res.send("post deleted") : res.send('error deleting post')
})

  function authenticateUser(req, res, next) {
        const token = req.cookies.Token; // Assuming you store the token in a cookie
        console.log("token here ahha",token)
        if (token) {
          // Verify and decode the token here (use your actual logic)
          // For example, you can use the 'jsonwebtoken' library
          const decodedData = jwt.verify(token, SECRET);
      
          if (decodedData.exp > Date.now()) {
            // If the token is valid, set the user data in the request object
            res.cookie('Token', '', {
                maxAge: 1,
                httpOnly: true,
              });
            
          }else{
            req.body.decodedData = decodedData;
            next();

          }
        }
      }
    

router.post("/api/project-like/:productId", authenticateUser, async(req,res)=>{

    const AuthorId = req.body.decodedData._id
    const currentUserName = req.body.decodedData.name
  const productId = req.params.productId

    // const userData =await userCol.findOne({email:currentUserEmail})
   const {rating , message}= req.body

   const product = await col.findOne({_id: new ObjectId(productId)})
  
   const matchRating = product.likes?.findIndex((eachrate)=> eachrate.AuthorId === AuthorId)
   console.log(matchRating)
   if(matchRating  > -1){

    await col.updateOne(
        { _id: new ObjectId(productId) },
        { $pull: { 'likes': { AuthorId: AuthorId , currentUserName} ,
        
        } 
    }
      );
      return res.json({'Added':false});
   }
   await col.updateOne(
    { _id: new ObjectId(productId) },
    { $push: { 'likes': { currentUserName , AuthorId ,
    } ,
    
    } 
}
  );
    
     
  return res.json({'Added':true});
})

export default router