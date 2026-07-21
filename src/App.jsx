import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
import posts from "./postIndex.json";
function App() {
  const [content, setContent] = useState("");
  return (
    <>
      <main>
        <div id="sidebar">
          <div>
            <h1>CheemsDFI's blog</h1>
            <hr></hr>
          </div>
          <ul id="sidebar-list">
            {posts.map((post) => (
              <li class="sidebar-post">
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault()
                    fetch(`/posts/${post.file}.md`)
                      .then((res) => res.text())
                      .then((text) => setContent(text));
                  }}
                >
                  {post.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <article id="markdown-viewer">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </main>
    </>
  );
}

export default App;
