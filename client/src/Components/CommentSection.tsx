import type { commentSection, Reply as ReplyType } from "../Types/Types"
import { useContext, useState } from "react"
import ReloadContext from "./ReloadContext"
import Delete from "./Delete"
import Reply from "./Reply"
import "./CommentSection.css"

function CommentSection({ user, comment, setReply, reply }: commentSection) {
    const [replyContent, setReplyContent] = useState<string>(comment.content);
    const [remove, setRemove] = useState<boolean>(false);
    const [edit, setEdit] = useState<boolean>(false);
    const render = useContext(ReloadContext);

    const updateComment = async (id: number, con: string, time: string, scr: number, usr: string, replies: ReplyType[] | null | undefined) => {
        try {
            const update = await fetch(import.meta.env.VITE_BACKEND_URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id,
                    content: con,
                    createdAt: time,
                    score: scr,
                    user: usr,
                    replies: replies
                })
            })

            if (!update) throw new Error("Something went wrong.");

            render();
        } catch (error) {
            throw new Error(`Something went wrong, ${error}`);
        }
    }

    const editComment = async (cont: string) => {
        try {
            const update = await fetch(import.meta.env.VITE_BACKEND_URL, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: comment._id,
                    content: cont,
                    createdAt: comment.createdAt,
                    score: comment.score,
                    user: comment.user,
                    replies: comment.replies
                })
            })

            if (!update) throw new Error("Something went wrong.");

            setEdit(!edit);
            render();
        } catch (error) {
            throw new Error(`Something went wrong, ${error}`);
        }
    }

    const handleIncrease = (): void => {
        const newScore = comment.score + 1;
        updateComment(comment._id, comment.content, comment.createdAt, newScore, comment.user, comment.replies);
    }

    const handleDecrease = (): void => {
        const newScore = comment.score - 1;
        updateComment(comment._id, comment.content, comment.createdAt, newScore, comment.user, comment.replies);
    }

    const handleEditButton = (): void => {
        setEdit(!edit);
        setReplyContent(comment.content)
    }

    const handleEdit = (): void => {
        editComment(replyContent);
    }

    return (
        <>
            {remove && <Delete id={comment._id} comment={null} setRemove={() => setRemove(prev => !prev)} />}
            <div className="comment">
                <div className="score">
                    <span className="increase" onClick={handleIncrease}>+</span>
                    {comment.score}
                    <span className="decrease" onClick={handleDecrease}>-</span>
                </div>
                <div className="comment-body">
                    <div className="comment-top">
                        <div className="comment-info">
                            <img src={`avatars/${user.image.webp}`} alt={user.username} />
                            <p className="username">{user.username}</p>
                            {user.username === "juliusomo" && <p className="you">you</p>}
                            <p className="post-time">{comment.createdAt}</p>
                        </div>
                        {user.username === "juliusomo" ?
                            <div className="comment-options">
                                <div className="delete option" onClick={() => setRemove(!remove)}>
                                    <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368" />
                                    </svg>
                                    Delete
                                </div>
                                <div className="edit option" onClick={handleEditButton}>
                                    <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6" />
                                    </svg>
                                    Edit
                                </div>
                            </div> :
                            <div className="reply" onClick={() => setReply()}>
                                <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6" />
                                </svg>
                                Reply
                            </div>}
                    </div>
                    {edit ?
                        <textarea className="comment-content" value={replyContent} name="edit-comment"
                            onChange={(e) => setReplyContent(e.target.value)}></textarea> :
                        <div className="comment-content">
                            {comment.content}
                        </div>}
                    {edit && <button className="update-button" onClick={handleEdit}>Update</button>}
                </div>
            </div>
            {reply && <Reply comment={comment} username={user.username} render={render} setCommentReply={setReply} />}
        </>
    )
}

export default CommentSection