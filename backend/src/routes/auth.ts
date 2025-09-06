import { Router } from "express";
import registerHandler from "../handlers/registerHandler";
import loginHandler from "../handlers/loginHandler";
import getUserHandler from "../handlers/getUserHandler";
import logoutHandler from "../handlers/logoutHandler";

const authRoute = Router()

authRoute.post('/register', registerHandler)
authRoute.post('/login', loginHandler)
authRoute.get('/getme', getUserHandler)
authRoute.post('/logout', logoutHandler)

export default authRoute