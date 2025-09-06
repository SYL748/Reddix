export type Community = {
  _id: string;
  name: string;
  description: string;
  creator: string;
}

export type GetCommunityResponse = {
  joined: Community[]
  others: Community[]
}