import { useContext, useEffect } from "react";
import ReloadContext from "./ReloadContext";
import "./Delete.css"
import type { Comment } from "../Types/Types";

function Delete({ id, comment, setRemove }: { id: number, comment: Comment | null, setRemove: () => void }) {
    const render = useContext(ReloadContext);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const deleteComment = async () => {
        try {
            if (comment) {
                const newReplies = comment.replies;
                newReplies.splice(id, 1);

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
            } else {
                const deleted = await fetch(import.meta.env.VITE_BACKEND_URL, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                })

                if (!deleted) throw new Error("Something went wrong.");
            }

            render();
            setRemove();
        } catch (error) {
            throw new Error(`Something went wrong, ${error}`);
        }
    }

    return (
        <div className="bg">
            <div className="message">
                <h2>Delete comment</h2>
                <p className="dlt-message">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                <div className="buttons">
                    <button className="cancel-button btn" onClick={setRemove}>
                        no, cancel
                    </button>
                    <button onClick={deleteComment} className="delete-button btn">
                        yes, delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Delete