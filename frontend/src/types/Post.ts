export type Post = {
    _id: string;
    title: string;
    content: string;
    linkFlairID: string;
    postedBy: string;
    view: number;
    upvotes: number;
    members: string[];
}