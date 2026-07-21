import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
import posts from "./postIndex.json";
function App() {
  const [content, setContent] = useState("");
  return (
    <>
      <div>
        <div id="sidebar">
          <ul>
            {posts.map((e) => (
              <li>
                <button
                  onClick={() => {
                    fetch(`/posts/${e.file}.md`)
                      .then((res) => res.text())
                      .then((text) => setContent(text));
                  }}
                >
                  {e.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <main>
          <ReactMarkdown>{content}</ReactMarkdown>
        </main>
      </div>
    </>
  );
}

export default App;
