import "dotenv/config.js";
import cors from "cors";
import express from "express";
import connectDB from "./connectDB.js";
import { User } from "./models/Comments.js";
import { Comment } from "./models/Comments.js";

const app = express();

connectDB();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const users = await User.find({});
        const comments = await Comment.find({});

        if (!users || !comments) throw new Error("Something went wrong.");

        res.status(200).json({ users, comments });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post("/", async (req, res) => {
    try {
        const { content, createdAt, score, user, replies } = req.body;

        const data = await Comment.create({ content, createdAt, score, user, replies });

        if (!data) throw new Error("Something went wrong.");

        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/", async (req, res) => {
    try {
        const { id, content, createdAt, score, user, replies } = req.body;

        const updated = await Comment.findByIdAndUpdate(id, { content, createdAt, score, user, replies });

        if (!updated) throw new Error("Something went wrong.");

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/", async (req, res) => {
    try {
        const { id } = req.body;

        const deleted = await Comment.findByIdAndDelete(id);

        if (!deleted) throw new Error("Something went wrong.");

        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(process.env.PORT, () => console.log("Server is running"));