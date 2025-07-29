import type { User, Comment as CommentType, CommentsResponse } from "../Types/Types"
import CommentSection from "./CommentSection"
import { useState } from "react"
import Replies from "./Replies"
import "./Comment.css"

function Comment({ data, user, comment }: { data: CommentsResponse, user: User, comment: CommentType }) {
    const [reply, setReply] = useState<boolean>(false);

    return (
        <div className="comment-section">
            <CommentSection
                user={user}
                comment={comment}
                setReply={() => setReply(prev => !prev)}
                reply={reply}
            />
            {comment.replies.length > 0 && <Replies data={data} comment={comment} />}
        </div>
    )
}

export default Comment