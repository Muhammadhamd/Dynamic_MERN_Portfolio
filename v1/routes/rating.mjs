import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
import { ObjectId } from "mongodb"
import jwt from 'jsonwebtoken'

const __dirname = path.resolve()
const router = express.Router()
import {client} from "./../../mongodb.mjs"

const db = client.db("userdatabase"),
      userCol = db.collection("users"),
      postsCol = db.collection('posts')


   



  
           
   
      const SECRET = process.env.SECRET || "topsecret";

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
            console.log(decodedData)
          }
        }
        next();
      }
    

router.post("/post-rating/:productId", authenticateUser, async(req,res)=>{

  if (!req.body.decodedData) {
    return res.status(401).send('login first')
  }
    const currentUserId = req.body.decodedData._id
    const currentUserImage = req.body.decodedData?.image
    const currentUserName = req.body.decodedData.name
  const productId = req.params.productId

    // const userData =await userCol.findOne({email:currentUserEmail})
   const {rating , message}= req.body

   const product = await postsCol.findOne({_id: new ObjectId(productId)})

   const matchRating = product.rating?.findIndex((eachrate)=> eachrate.currentUserId === currentUserId)
   console.log(matchRating)
   if(matchRating  > -1){

    res.send("olready rated")
    return
   }
   await postsCol.updateOne(
    { _id: new ObjectId(productId) },
    { $push: { 'rating': {rating, message ,currentUserName , currentUserId ,
    timestamp:Date.now(),
    userprofileImage:currentUserImage
    } ,
    
    } 
}
  );
    
     
   res.send("rated")
})



  


export default router