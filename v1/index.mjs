import express from "express";
import postRouter from "./routes/post.mjs";
import projectRouter from "./routes/project.mjs";
import userRouter from "./routes/user.mjs";
import ContactRouter from "./routes/contact.mjs";
import authRouter from "./routes/auth.mjs";
import userauthRouter from "./routes/userauth.mjs";
import chatbotRouter from "./routes/chatbot.mjs";
import CommentROuter from "./routes/comment.mjs";
import notification from "./routes/notification.mjs";
const router = express.Router();

router.use(postRouter);
router.use(userRouter);

router.use(notification);
router.use(CommentROuter);
router.use(chatbotRouter);
router.use(ContactRouter);
router.use(projectRouter);
router.use(authRouter);
router.use(userauthRouter);
export default router;
