import { Request, Response } from "express";
import catchError from "../utils/catchError";
import Community from "../model/Community";
import appAssert from "../utils/AppAssert";

const fetchCommunityByIdHandler = catchError(async(req:Request, res:Response)=>{
    const { id } = req.params
    const community = await Community.findById(id)
    appAssert(community, 404, "Coummunity Not Found")
    return res.status(200).json(community)
})

export default fetchCommunityByIdHandler;