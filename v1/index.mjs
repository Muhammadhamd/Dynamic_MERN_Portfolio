import express from "express"
import postRouter from "./routes/post.mjs"
import projectRouter from "./routes/project.mjs"
import userRouter from "./routes/user.mjs"
import ContactRouter from "./routes/contact.mjs"
import authRouter from "./routes/auth.mjs"
import chatbotRouter from "./routes/chatbot.mjs"
const router = express.Router()

router.use(postRouter)
router.use(chatbotRouter)
router.use(ContactRouter)
router.use(projectRouter)
router.use(authRouter)
router.use(userRouter)
export default router