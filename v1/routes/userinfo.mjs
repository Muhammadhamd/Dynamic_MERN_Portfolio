import express from 'express'
import jwt from "jsonwebtoken"
import  mongoose, { connect }  from 'mongoose'
const router = express.Router()
import {client} from "./../../mongodb.mjs"
const SECRET = process.env.SECRET || "topsecret";

const db = client.db("userdatabase"),
      col = db.collection("users")
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
    //   AdminToken
router.get("/currentuser", authenticateUser, async(req,res)=>{

    const currentUserEmail = req.body.decodedData
    if (currentUserEmail) {
        console.log(currentUserEmail)


    res.send(currentUserEmail)
    return
    }

    res.status(401).send("not login ")

    // res.status()

   

})

function authenticateAdmin(req, res, next) {
    const token = req.cookies.AdminToken; // Assuming you store the token in a cookie
    if (token) {
      // Verify and decode the token here (use your actual logic)
      // For example, you can use the 'jsonwebtoken' library
      const decodedData = jwt.verify(token, SECRET);
  
      if (decodedData) {
          req.body.admin = decodedData
      }
    
    }
    next();
  }
  
router.get("/Admincheck", authenticateAdmin, async(req,res)=>{

    if (req.body?.admin) {

    res.send(true)
    return
    }

    res.status(401).send("not login ")

    // res.status()

   

})

router.get(`/users`, async(req,res,next)=>{

    let  accountid = req.params.userAPIs
 
     const accountsData =  col.find({})
 
     const accounts = await accountsData.toArray()
 
         res.send(accounts)
 
         // iDURL(accounts.id)
         
     
 
 })


export default router