import express from "express"
import mongoose, { model } from "mongoose"
const router = express.Router()
import {client} from "../../mongodb.mjs"
import { ObjectId } from "mongodb"
const db = client.db("Portfolio");
const col = db.collection("posts")

const postSchema =  new mongoose.Schema({

  
    timeStamp:{
        type: Date,
        default: Date.now
    },
    description:{
        type:String,
        required:true
    },
    heading:{
        type:String,
        required:true
    },
    tags:{
        type:Array,
        required:true
    },
   
  
    image:{
        type:String,
        required:true
    } ,
        
})
const postModel = mongoose.model("post", postSchema)
router.post('/post', async(req,res,next)=>{

   const  { Heading , description , tags , imgURL} = req.body

   console.log('Received data:', Heading, description, tags, imgURL);
//    console.log(`
//    datais:{
//     ${Heading}
//     ${description}
//     ${imgURL}
//    }`)
    const post = await postModel.create({
        timeStamp: new Date(),
        heading: Heading,
        description: description,
        image: imgURL,
        tags:tags
      });
    res.status(200).send("post suecssfully")
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
            _id: new ObjectId(postID) } // ObjectId as a string
       
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