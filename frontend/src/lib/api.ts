import API from "../config/apiClient";
import type { Community, GetCommunityResponse } from "../types/Community";
import type { LinkFlair } from "../types/LinkFlair";
import type { Order } from "../types/Order";
import type { Post } from "../types/Post";
import type { User } from "../types/User";
type LoginPayload = {
    email: string;
    password: string;
}

type SignupPayload = {
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    password: string;
}

export const login = async (data: LoginPayload) =>
    API.post("/auth/login", data)
export const signup = async (data: SignupPayload) =>
    API.post("auth/register", data)
export const getUser = async (): Promise<User> =>
    API.get("/auth/getme")
export const logout = async () =>
    API.post("/auth/logout")
export const getLinkFlair = async (): Promise<LinkFlair> =>
    API.get("/linkFlair")
export const getCommunity = async (): Promise<GetCommunityResponse> =>
    API.get('/community')
export async function getPost(params: { order: Order; search?: string }): Promise<Post[]> {
    const { order, search } = params;
    const res = await API.get<Post[]>("/post", {
        params: { order, search: search?.trim() || undefined },
    })
    return Array.isArray(res) ? res : []
}
export const getCommunityById = async (id:string): Promise<Community> => 
    API.get(`/community/${id}`)
export const getPostByCommunityId = async (id:string, order:Order): Promise<Post[]> =>
    API.get(`/post/community/${id}`, {
        params:{order}
    })