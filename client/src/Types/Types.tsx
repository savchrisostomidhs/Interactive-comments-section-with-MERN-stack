type User = {
    username: string;
    image: {
        png: string;
        webp: string;
    };
};

type Reply = {
    content: string;
    createdAt: string;
    score: number;
    replyingTo: string;
    user: string;
}

type Comment = {
    _id: number;
    content: string;
    createdAt: string;
    score: number;
    user: string;
    replies: Reply[];
}

interface CommentsResponse {
    users: User[];
    comments: Comment[];
}

interface commentSection {
    user: User,
    comment: Comment,
    setReply: () => void,
    reply: boolean | boolean[],
}

interface replySection {
    user: User,
    comment: Comment,
    commentReply: Reply,
    setReply: () => void,
    reply: boolean | boolean[],
    index: number
}

export type { User, Reply, Comment, CommentsResponse, commentSection, replySection }