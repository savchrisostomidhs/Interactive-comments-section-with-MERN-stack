import mongoose from "mongoose";

const user = new mongoose.Schema({
    username: String,
    image: {
        png: String,
        webp: String
    }
});

const User = mongoose.model("User", user);

const comments = new mongoose.Schema({
    content: String,
    createdAt: String,
    score: Number,
    user: String,
    replies: [
        {
            content: String,
            createdAt: String,
            score: { type: Number, default: 0 },
            replyingTo: String,
            user: String
        },
    ]
});

const Comment = new mongoose.model("Comment", comments);

export { User, Comment }