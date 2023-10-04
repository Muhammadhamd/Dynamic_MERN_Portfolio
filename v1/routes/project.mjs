import express from "express"
import mongoose, { model } from "mongoose"
const router = express.Router()
import {client} from "../../mongodb.mjs"
import { ObjectId } from "mongodb"
const db = client.db("Portfolio");
const col = db.collection("projects")

const poojectSchema =  new mongoose.Schema({

  
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
    repolink:{
        type:String,
        required:true
    } ,
    videolink:{
        type:String,
        required:true
    } ,
    hostlink:{
        type:String,
        required:true
    } ,
        
})
const projectModel = mongoose.model("project", poojectSchema)
router.post('/project', async(req,res,next)=>{

   const  {Heading, description, tags, imgURL ,repolink , hostlink , videolink} = req.body

   console.log('Received data:', Heading, description, tags, imgURL ,repolink , hostlink , videolink);
//    console.log(`
//    datais:{
//     ${Heading}
//     ${description}
//     ${imgURL}
//    }`)
    const post = await projectModel.create({
        timeStamp: new Date(),
        heading: Heading,
        description: description,
        image: imgURL,
        tags:tags,
        repolink:repolink,
        videolink:videolink,
        hostlink:hostlink
      });
    res.status(200).send("post suecssfully")
})

router.get("/projects",async(req ,res)=>{

    const postsData = await col.find({}).toArray()

    res.send(postsData)
})

router.delete("/project/:postid",async(req,res)=>{
    const postid = req.params.postid
    const update =  await col.findOneAndDelete({_id:new ObjectId(postid)})
    update ? res.send("post deleted") : res.send('error deleting post')
})

export default router