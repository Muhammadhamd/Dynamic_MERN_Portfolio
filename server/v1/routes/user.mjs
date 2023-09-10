import express from "express"
import mongoose, { model } from "mongoose"
const router = express.Router()
import {client} from "../../mongodb.mjs"
import { ObjectId } from "mongodb"
const db = client.db("Portfolio");
const col = db.collection("userinfo")

const userSchema =  new mongoose.Schema({

  
    timeStamp:{
        type: Date,
        default: Date.now
    },
    paragraph:{
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
   
  
    subline:{
        type:String,
        required:true
    } ,
        
})
const userModel = mongoose.model("userinfo", userSchema)
router.put('/userinfo', async(req,res,next)=>{

   const  { headingy , namey , subliney , paragraphy , dpImg} = req.body

//    console.log('Received data:', headingy , namey , subliney , paragraphy);

const data = await col.findOneAndUpdate(
    { 
        _id: new ObjectId('64f04b2244f71fda1dc121f5') }, // ObjectId as a string
    {
      $set: {
        timeStamp: new Date(),
        heading: headingy,
        paragraph: paragraphy,
        subline: subliney,
        name: namey,
        dp:dpImg
      }
    }
  );
  console.log(data)
    res.status(200).send("post suecssfully")
})

router.get("/mydata",async(req , res)=>{

    try{
        const user = await col.findOne({_id : new ObjectId('64f04b2244f71fda1dc121f5')})

       // searchedUserData(user)
       if (user) {
           res.send(user)
       return;
   }
   
       res.send("not found haha")
   
        

   } catch(e){

       console.log(e)
   }
   

})
export default router