import express from "express"
import mongoose from "mongoose"
import path from "path"
import axios from "axios"
import { ObjectId } from "mongodb"
import jwt from 'jsonwebtoken'

const __dirname = path.resolve()
const router = express.Router()
import {client} from "./../../mongodb.mjs"
import { type } from "os"
import { match } from "assert"

const db = client.db("userdatabase"),
      productcol = db.collection("posts"),
      cartsCol = db.collection('carts')


   



   
    
   
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
  
       
    

router.post("/addtocart", authenticateUser , async(req,res)=>{

    // const currentUserEmail = res.locals.decodedData
    const {isdata}= req.body
    console.log(isdata)

    // if (!req?.body?.decodedData) {
    //     res.status(401).send("login first")
    //     return
    // }
    const cart =await cartsCol.findOne({userId : req?.body?.decodedData?._id})

    if (cart) {
        const cartItemArray = cart.cartItems

       const matchitems =  cartItemArray.findIndex((item)=> {
        return item.productId === isdata.productid
       })

      if (matchitems > -1) {
console.log(matchitems)

        cartItemArray[matchitems].quantity = isdata.Quantity
        // console.log(cartItemArray[matchitems].quantity)
         cartsCol.updateOne(
            {
                userId:req.body.decodedData._id,
            }
            ,{
                $set:{
                    cartItems: cartItemArray,
                }
            }
        )
       
    res.send("updated")
    console.log(cartItemArray[matchitems])
        return
      }
        const newcartItem = {
            productId:isdata.productid,
            quantity:isdata.Quantity
        }
        
        console.log("fa",cartItemArray)
        cart.cartItems.push(newcartItem)

        cartsCol.updateOne(
            {userId:req.body.decodedData._id},
            { $set:{cartItems:cart.cartItems}}
        )
        res.send("added to cart")
        return;
    }else{
        // const userData =await userCol.findOne({email:currentUserEmail})

   console.log(isdata)
   const dataTOarray= [isdata]


   const addtocart = await cartsCol.insertOne({
  
    userId:req.body.decodedData._id,
    cartItems:[
        {
            productId:isdata.productid,
            quantity:isdata.Quantity
        }
    ]
});
   res.send(addtocart)
    }
})


router.get("/getcartdata",authenticateUser,async(req,res)=>{

    const cart =await cartsCol.findOne({userId:req?.body?.decodedData?._id})

    if (!cart) {
      res.status(404).send("no querry found in cart")
      console.log('noquerryt')
      return
    
    }

        const cartItems = await cart.cartItems
        console.log(cartItems)
        const productid = cartItems?.map((item) => new ObjectId(item.productId));
        console.log(productid)
        const posts = await productcol.find({ _id: { $in: productid } }).toArray()
        // res.send(posts)
        
        const cartData = cartItems.map((cartItem) => {
            const product = posts.find((p) => p._id.equals(cartItem.productId));
            return {
              ...product,
              quantity: cartItem.quantity,
            };
          });
        res.json(cartData)
})
export default router   
            


router.delete('/remove-from-cart/:cartId',authenticateUser,async(req,res)=>{
    try {
        const cart =await cartsCol.findOne({userId : req?.body?.decodedData?._id})

        if (cart) {
            const cartItemArray = cart.cartItems
    
           const matchitems =  cartItemArray.findIndex((item)=> {
            return item.productId === req.params.cartId

           })
    console.log("coming", req.params.cartId)
    
          if (matchitems > -1) {
    console.log(matchitems)
      

   
            cartItemArray.splice(matchitems , 1)
            // console.log(cartItemArray[matchitems].quantity)
             cartsCol.updateOne(
                {
                    userId:req.body.decodedData._id,
                }
                ,{
                    $set:{
                        cartItems: cartItemArray,
                    }
                }
            )
           
        res.send("updated")
        console.log(cartItemArray[matchitems])
            return
          }
            const newcartItem = {
                productId:isdata.productid,
                quantity:isdata.Quantity
            }
            
            console.log("fa",cartItemArray)
            cart.cartItems.push(newcartItem)
    
            cartsCol.updateOne(
                {userId:req.body.decodedData._id},
                { $set:{cartItems:cart.cartItems}}
            )
            res.send("added to cart")
            return;
        }
    } catch (error) {
        
    }
})