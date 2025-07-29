import type { Comment } from "../Types/Types";
import { useState } from "react"
import "./Reply.css"

function Reply({ comment, username, render, setCommentReply }:
    { comment: Comment, username: string, render: () => void, setCommentReply: () => void }) {
    const [reply, setReply] = useState<string>("");

    const postReply = async (e: React.FormEvent) => {
        e.preventDefault();

        if (reply !== "") {
            const newReplies = comment.replies;

            newReplies.push({
                content: reply,
                createdAt: "today",
                score: 0,
                replyingTo: username,
                user: "juliusomo"
            });

            try {
                const update = await fetch(import.meta.env.VITE_BACKEND_URL, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: comment._id,
                        content: comment.content,
                        createdAt: comment.createdAt,
                        score: comment.score,
                        user: comment.user,
                        replies: newReplies
                    })
                })

                if (!update) throw new Error("Something went wrong.");

                setReply("");
                setCommentReply();
                render();
            } catch (error) {
                throw new Error(`Something went wrong, ${error}`);
            }
        }
    }

    return (
        <form name="send-reply" onSubmit={postReply}>
            <img src="avatars/image-juliusomo.webp" alt="juliusomo" />
            <textarea value={reply} onChange={(e) => setReply(e.target.value)}></textarea>
            <button type="submit">Reply</button>
        </form>
    )
}

export default Reply