import express from "express";
const router = express.Router();
import path from "path";
const __dirname = path.resolve();
const SECRET = process.env.SECRET || "topsecret";
import {client} from "../../mongodb.mjs"
import { ObjectId } from "mongodb"
const db = client.db("Portfolio");
const col = db.collection("notification")


async function notify(link , title){

    try {
        const notify = await col.insertOne({
            link,
            title,
            timeStamp:new Date(),
            Status:"pending"
          })
      console.log(notify)

    } catch (error) {
        console.log(error)
    }
      
}

router.get("/notifications",async(req,res)=>{
    const data = await col.find({}).toArray()
    res.send(data)
})

router.put("/updateNotifyStatus/:id",async(req,res)=>{
    const id = req.params.id

    const updateStatus = await col.updateOne(
        {_id:new ObjectId(id)},
        {$set:{Status:"seen"}})
})
export { notify, router as default };