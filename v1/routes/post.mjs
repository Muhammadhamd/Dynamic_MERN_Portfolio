import express from "express";
import mongoose, { model } from "mongoose";
const router = express.Router();
import { client } from "../../mongodb.mjs";
import { ObjectId } from "mongodb";
const db = client.db("Portfolio");
const col = db.collection("posts");
const admincol = db.collection("admin");
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import cookieParser from "cookie-parser";
import app from "../../firebaseconfig.mjs";
import path from "path";
import jwt from "jsonwebtoken";
const __dirname = path.resolve();
const SECRET = process.env.SECRET || "topsecret";
import multer from "multer";
import { verify } from "crypto";
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit (adjust as needed)
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
// const postModel = mongoose.model("post", postSchema)
router.post(
  "/post",
  upload.single("image"),
  adminAuth,
  async (req, res, next) => {
    const { Heading, content, setUrl } = req.body;
    console.log(req.body);

    const checkUrl = await col.findOne({ ArticleUrl: setUrl });
    if (checkUrl) {
      return res
        .status(400)
        .send("there is already a post exist with this url");
    }
    try {
      const addImgDB = req?.file;
      let imgUrl = "";
      if (addImgDB) {
        const name = +new Date() + "-" + addImgDB.originalname;
        const metadata = {
          contentType: addImgDB.mimetype,
        };
        const storageRef = ref(getStorage(app), name);

        const task = uploadBytes(storageRef, addImgDB.buffer, metadata);

        const snapshot = await task;

        imgUrl = await getDownloadURL(snapshot.ref);
        console.log(imgUrl);
      }
      const post = await col.insertOne({
        timeStamp: new Date(),
        heading: Heading,
        content: content,
        image: imgUrl,
        ArticleUrl: setUrl,
      });
      res.status(200).send("post suecssfully");
    } catch (error) {
      res.status(500).send("internal error ");
    }
  }
);

router.get("/posts", async (req, res) => {
  const postsData = await col.find({visibility:true}).sort({ _id: -1 }).toArray();

  res.send(postsData);
});

router.get("/post/:postId", async (req, res) => {
  const postID = req.params.postId;
  console.log(postID);

   if (!ObjectId.isValid(postID)) {
    const data = await col.findOne({
      ArticleUrl: postID,
      visibility:true
    });
    if (data) {
      res.send(data);
      return;
    }
   }
  
  

  if (ObjectId.isValid(postID)) {
    const databyid = await col.findOne({
      _id: new ObjectId(postID),
      visibility:true
    });
    if(databyid){
      res.send(databyid)
      return
    }
    
  }
  
  res.status(404).send("post not found");
});
router.get("/ToEditPost/:postId",adminAuth, async (req, res) => {
  const postID = req.params.postId;
  console.log(postID);

  const data = await col.findOne({
    _id: new ObjectId(postID),
  });
  if (data) {
    res.send(data);
    return;
  }
  res.status(404).send("post not found");
});
router.get("/Admin-Article",adminAuth, async (req, res) => {
  
  

  const data = await col.find({}).sort({ _id: -1 }).toArray();
  
  res.send(data);
});
router.put("/editArticle/:postId",adminAuth, upload.single("image"), async (req, res) => {
  const postID = req.params.postId;
  const { Heading, content, setUrl } = req.body;
 console.log(Heading, content, setUrl)

  if (!Heading && !content && !setUrl) {
    res.status(401).send("input all data")
    return false
  }
  const data = await col.findOneAndUpdate({
    _id: new ObjectId(postID),
  }
  ,
  {
  $set:{
    content:content,
    heading:Heading,
    ArticleUrl:setUrl
  }
  },
  {returnDocument:"after"}
  );
  if (data) {
    res.send({data:data.value,messsage:"Article is updated"});
    return;
  }
  res.status(404).send("post not found");
});
router.delete("/deleteArticle/:postid",adminAuth, async (req, res) => {
  const postid = req.params.postid;
  const update = await col.findOneAndDelete({ _id: new ObjectId(postid) });
  update ? res.send("post deleted") : res.send("error deleting post");
});
router.put("/Article-visibility/:postid", adminAuth, async (req, res) => {
  const postid = req.params.postid;
  
  try {

    const update = await col.findOneAndUpdate(
      { _id: new ObjectId(postid) },
      { $set: { visibility: req?.body?.visibility ? false : true } }
      ,{returnDocument:"after"}
      );

    res.send({Message:"post updated",data:update.value});
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

export default router;
