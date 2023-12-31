import express from "express";
import mongoose, { model } from "mongoose";
const router = express.Router();
import { client } from "../../mongodb.mjs";
import { ObjectId } from "mongodb";
const db = client.db("Portfolio");
const col = db.collection("userinfo");
const galary_col = db.collection("DP_GALARY");
const admincol = db.collection("admin");
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import cookieParser from "cookie-parser";
import app from "../../firebaseconfig.mjs";
import path from "path";
import jwt from "jsonwebtoken";
const __dirname = path.resolve();
const SECRET = process.env.SECRET || "topsecret";
import multer from "multer";
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
  },
});

const userSchema = new mongoose.Schema({
  timeStamp: {
    type: Date,
    default: Date.now,
  },
  paragraph: {
    type: String,
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  subline: {
    type: Array,
    required: true,
  },
});
function adminAuth(req, res, next) {
  if (!req.cookies.AdminToken) {
    return res.status(401).send("not login as admin");
  }

  const decodedData = jwt.verify(req.cookies.AdminToken, SECRET);

  if (decodedData.exp > Date.now()) {
    // If the token is valid, set the user data in the request object
    res.cookie("AdminToken", "", {
      maxAge: 1,
      httpOnly: true,
    });
    res.status(401).send("login again ");
  } else {
    req.body.decodedData = decodedData;
    console.log(decodedData);
    next();
  }
}
const userModel = mongoose.model("userinfo", userSchema);
router.put(
  "/userinfo",
  adminAuth,
  upload.single("dpImg"),
  async (req, res, next) => {
    const { heading, namey, subline, paragraphy, imagefromGalary } = req.body;
    const sublineArray = JSON.parse(subline); // Convert JSON string to array

    const addImgDB = req?.file;
    let imgUrl = null;
    try {
      if (addImgDB) {
        // If a new image is provided, upload and get the new image URL
        const name = +new Date() + "-" + addImgDB.originalname;
        const metadata = {
          contentType: addImgDB.mimetype,
        };
        const storageRef = ref(getStorage(app), name);
        const task = uploadBytes(storageRef, addImgDB.buffer, metadata);
        const snapshot = await task;
        imgUrl = await getDownloadURL(snapshot.ref);
      }
      const findData = await col.findOne( {
        _id: new ObjectId("64f04b2244f71fda1dc121f5"),
      },)
      console.log(findData.Galary)
      // Build the update object based on whether a new image is provided
      const updateObject = {
        timeStamp: new Date(),
        heading,
        paragraph: paragraphy,
        subline: sublineArray,
        name: namey,
        Galary:findData?.Galary ||[]
      };

      // i dont know why null is in string
      if (imgUrl || imagefromGalary !== "null") {
        console.log("imagefromGalary",imagefromGalary)
        console.log("imgUrl",imgUrl)
        updateObject.dp = imgUrl || imagefromGalary;
        if (imgUrl) {
        updateObject.Galary.push(imgUrl);
          
        }
      }

      // Update the document in the database
      const data = await col.findOneAndUpdate(
        {
          _id: new ObjectId("64f04b2244f71fda1dc121f5"),
        },
        {
          $set: updateObject,
        }
        , { returnDocument: 'after' }
      );
      console.log(data.value.name);

      res.status(200).send({message:"sucessfully Updated", data:data.value});
      
    } catch (error) {
      res.status(500).send("Internal error ", error);
    }
  }
);

router.get("/mydata", async (req, res) => {
  try {
    const user = await col.findOne({
      _id: new ObjectId("64f04b2244f71fda1dc121f5"),
    });

    // searchedUserData(user)
    if (user) {
      res.send(user);
      return;
    }

    res.send("not found haha");
  } catch (e) {
    console.log(e);
  }
});
export default router;
