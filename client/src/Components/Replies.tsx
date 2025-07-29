import type { Comment, CommentsResponse } from "../Types/Types"
import { useState } from "react";
import "./Replies.css"
import ReplySection from "./ReplySection";

function Replies({ data, comment }: { data: CommentsResponse, comment: Comment }) {
    const [replyClicked, setReplyClicked] = useState<boolean[]>(comment.replies.map(() => false));

    return (
        <div className="replies-section">
            <div className="left-section">
                <div className="line"></div>
            </div>
            <div className="replies">
                {comment.replies.map((reply, i) => {
                    const user = data.users.find(user => user.username === reply.user);
                    return <div key={i}>
                        <ReplySection
                            user={user!}
                            comment={comment}
                            commentReply={reply}
                            setReply={() => setReplyClicked(comment.replies.map((_, ind) => ind === i ? !replyClicked[ind] : replyClicked[ind]))}
                            reply={replyClicked[i]}
                            index={i}
                        />
                    </div>
                })}
            </div>
        </div>
    )
}

export default Replies