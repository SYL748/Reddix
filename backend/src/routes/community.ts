import { Router } from "express";
import createCommunityHandler from "../handlers/createCommunityHandler";
import fetchCommunityHandler from "../handlers/fetchCommunityHandler";
import deleteCommunityHandler from "../handlers/deleteCommunityHandler";
import fetchCommunityByIdHandler from "../handlers/fetchCommunityByIdHandler";

const communityRoute = Router()

communityRoute.post('/create', createCommunityHandler)
communityRoute.get('/', fetchCommunityHandler)
communityRoute.get('/:id', fetchCommunityByIdHandler)
communityRoute.delete('/delete/:id', deleteCommunityHandler)

export default communityRoute