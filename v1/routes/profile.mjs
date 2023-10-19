import express from "express"
import path from "path"
const __dirname = path.resolve()
const router = express.Router()
import {client} from "./../../mongodb.mjs"
import { ObjectId } from "mongodb"
const db = client.db("userdatabase");
const col = db.collection("users")







// function userIdfun(userId) {
//     console.log(userId)
//         
//      }




            // router.get(`/account/:usertId`, async (req,res,next)=>{
            //         const userId = req.params.usertId;
            //         console.log(userId)
                    
            //     try{
            //          const user = await col.findOne({_id : new ObjectId(userId)})

            //         // searchedUserData(user)
            //         if (user) {
            //             // res.sendFile(path.join(__dirname , "public/profile.html"))
            //         return;
            //     }
                
            //         res.send("not found haha")
                
                     

            //     } catch(e){

            //         console.log(e)
            //     }
                

            //     })

            //     // function searchedUserData(user){

            //         // console.log(user)

            //          router.get(`/userdata/:userid`, async(req,res)=>{
            //             const userId = req.params.userid;
            //             const user = await col.findOne({_id : new ObjectId(userId)})
            //             res.send(user)

            //         })
                // }

                   

                
export default router