import ReloadContext from "./Components/ReloadContext";
import { useState } from "react";
import { BeatLoader } from "react-spinners";
import Comment from "./Components/Comment";
import useFetch from "./Hooks/useFetch";
import "./App.css"

function App() {
  const [sendComment, setSendComment] = useState<string | number | readonly string[] | undefined>("");
  const { data, loading, render } = useFetch(import.meta.env.VITE_BACKEND_URL);

  const postComment = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (sendComment !== "") {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: sendComment,
            createdAt: "today",
            score: 0,
            user: "juliusomo",
            replies: []
          })
        })

        if (!res) throw new Error("An error occured!");

        setSendComment("");
        render(import.meta.env.VITE_BACKEND_URL);
      } catch (error) {
        throw new Error(`Something went wrong, ${error}`);
      }
    }
  }

  return (
    <ReloadContext.Provider value={() => render(import.meta.env.VITE_BACKEND_URL)}>
      {loading ? <BeatLoader className="loading" /> :
        <div className="comments">
          {data?.comments.map(comment => {
            const user = data.users.find(user => user.username === comment.user);
            return <Comment key={comment._id} data={data} user={user!} comment={comment} />
          })}
          <form name="send-comment" onSubmit={postComment}>
            <img src="avatars/image-juliusomo.webp" alt="juliusomo" />
            <textarea
              value={sendComment}
              placeholder="Add a comment..."
              onChange={(e) => setSendComment(e.target.value)}
            >
            </textarea>
            <button type="submit">Send</button>
          </form>
        </div>}
      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
        Coded by <a href="https://github.com/savchrisostomidhs">savchrisostomidhs</a>.
      </div>
    </ReloadContext.Provider>
  )
}

export default App
