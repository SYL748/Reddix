import { Router } from "express";
import createCommentHandler from "../handlers/createCommentHandler";
import deleteCommentHandler from "../handlers/deleteCommentHandler";

const commentRoute = Router()

commentRoute.post('/create', createCommentHandler)
commentRoute.delete('/delete/:id', deleteCommentHandler)

export default commentRoute