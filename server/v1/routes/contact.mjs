import express from "express"
import mongoose, { model } from "mongoose"
const router = express.Router()
import {client} from "../../mongodb.mjs"
import { ObjectId } from "mongodb"
const db = client.db("Portfolio");
const col = db.collection("contacts")

const postSchema =  new mongoose.Schema({

  
    timeStamp:{
        type: Date,
        default: Date.now
    },
    name:{
        type:String,
        required:true
    },
    phno:{
        type:String,
        required:true
    },
    email:{
        type:Array,
        required:true
    },
   
  
    messege:{
        type:String,
        required:true
    } ,
        
})
const postModel = mongoose.model("contact", postSchema)
router.post('/contact', async(req,res,next)=>{

   const  { name , email , phno , messege} = req.body

   console.log('Received data:',name , email , phno , messege);
//    console.log(`
//    datais:{
//     ${Heading}
//     ${description}
//     ${imgURL}
//    }`)
    const post = await postModel.create({
        timeStamp:new Date(),
        name:name ,
         email: email,
         phno: phno,
         messege:messege
      });
    res.status(200).send("post suecssfully")
})

router.get("/contacts",async(req ,res)=>{

    const postsData = await col.find({}).toArray()

    res.send(postsData)
})

export default router