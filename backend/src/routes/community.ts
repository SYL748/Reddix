import { Router } from "express";
import createCommunityHandler from "../handlers/createCommunityHandler";
import fetchCommunityHandler from "../handlers/fetchCommunityHandler";
import deleteCommunityHandler from "../handlers/deleteCommunityHandler";

const communityRoute = Router()

communityRoute.post('/create', createCommunityHandler)
communityRoute.get('/', fetchCommunityHandler)
communityRoute.delete('/delete/:id', deleteCommunityHandler)

export default communityRoute