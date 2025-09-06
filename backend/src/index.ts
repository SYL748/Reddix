import express, { Request, request, Response } from "express"
import cors from "cors"
import session from "express-session"
import connectToDatabase from "./config/db";
import MongoStore from "connect-mongo";
import authRoute from "./routes/auth";
import errorHandler from "./middleware/errorMiddleware";
import postRoute from "./routes/post";
import communityRoute from "./routes/community";
import commentRoute from "./routes/comment";
import catchError from "./utils/catchError";
import LinkFlair from "./model/LinkFlair";

declare module "express-session" {
  interface SessionData {
    userId?: string
  }
}

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/reddit_clone",
      collectionName: "sessions",
      touchAfter: 300
    }),
    cookie: {
      maxAge: 1000 * 60 * 60,
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    }
  })
)
app.use(express.json())

app.use('/auth', authRoute)
app.use('/post', postRoute)
app.use("/linkFlair", async (_req, res, next) => {
  try {
    const flairs = await LinkFlair.find()
    res.status(200).json(flairs)
  } catch (err) {
    next(err)
  }
})
app.use('/community', communityRoute)
app.use('/comment', commentRoute)
app.use(errorHandler)

app.listen(8000, async () => {
  console.log(`Server running on port 8000`)
  await connectToDatabase();
})