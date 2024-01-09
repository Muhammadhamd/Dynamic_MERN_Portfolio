import express from 'express';
import {client} from '../../mongodb.mjs'
const db = client.db('userdatabase')
const col = db.collection("Orders")
const router = express.Router()


router.post('/order',async(req,res)=>{

    const currentUser = req.body.decodedData

    console.log(req.body)
    const {User_Cnic , User_cartNumber ,products , totalPrice} = req.body

    if (!User_Cnic || !User_cartNumber){
        res.send("please fill all fields")
        return
    }

    const order = await col.insertOne({
        User_Cnic,
        User_cartNumber,
        authorName: currentUser.name,
        authoremail: currentUser.email,
        authorID: currentUser._id,

    })

})