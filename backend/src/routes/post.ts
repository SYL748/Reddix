import { Router } from "express";
import createPostHandler from "../handlers/createPostHandler";
import fetchPostHandler from "../handlers/fetchPostHandler";
import deletePostHandler from "../handlers/deletePostHandler";

const postRoute = Router()

postRoute.post('/create', createPostHandler)
postRoute.get('/', fetchPostHandler)
postRoute.delete('/delete/:id', deletePostHandler)

export default postRoute