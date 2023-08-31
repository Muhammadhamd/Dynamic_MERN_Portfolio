import express from "express"
import postRouter from "./routes/post.mjs"
import userRouter from "./routes/user.mjs"
import authRouter from "./routes/auth.mjs"
const router = express.Router()

router.use(postRouter)
router.use(authRouter)
router.use(userRouter)
export default router