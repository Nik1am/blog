import { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
import posts from "./postIndex.json";

// Markdown files live in public/posts and are served from this directory.
const POSTS_DIR = `${import.meta.env.BASE_URL}posts/`;

// Resolve a path written in a markdown file against that file's directory.
// Local markdown readers (VS Code, GitHub, Obsidian) resolve relative paths
// the same way, so a single relative path works both locally and on the site.
function resolveAssetUrl(url, baseDir) {
  if (!url) return url;
  // Absolute URLs, protocol-relative URLs, root-relative paths, data URIs
  // and in-page anchors are already unambiguous.
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(url)) return url;
  return new URL(url, window.location.origin + baseDir).pathname;
}

// function CustomImage(props) {
//   props = props.props; // what?
//   return (
//     <img
//       style={{
//         "transition-duration": "0.1s",
//       }}
//       onMouseMove={(e) => {
//         const rect = e.currentTarget.getBoundingClientRect();
//         const x = (e.clientX - rect.left) / e.currentTarget.width;
//         const y = (e.clientY - rect.top) / e.currentTarget.height;
//         const rot = 30;
//         e.currentTarget.style.transform = `perspective(800px) rotateX(${rot * (y * -2 + 1)}deg) rotateY(${rot * (x * 2 - 1)}deg)`;
//       }}
//       onMouseLeave={(e) => {
//         e.target.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;
//       }}
//       src={props.src}
//       alt={props.alt}
//       title={props.title}
//     ></img>
//   );
// }

function App() {
  const [content, setContent] = useState("");
  return (
    <>
      <main>
        <div id="sidebar">
          <header>
            <h1>CheemsDFI's blog</h1>
            <hr></hr>
          </header>
          <ul id="sidebar-list">
            {posts.map((post) => (
              <li class="sidebar-post">
                &gt;
                <a
                  href={`${POSTS_DIR}${post.file}.md`}
                  onClick={(e) => {
                    e.preventDefault();
                    fetch(`${POSTS_DIR}${post.file}.md`)
                      .then((res) => res.text())
                      .then((text) => setContent(text));
                  }}
                >
                  {post.name}
                </a>
              </li>
            ))}
          </ul>
          <footer>
            <hr></hr>
            <h3>Contact me</h3>
            Discord:@16x9
          </footer>
        </div>
        <article id="markdown-viewer">
          <ReactMarkdown
            components={{
              img(props) {
                return (
                  <img
                    src={resolveAssetUrl(props.src, POSTS_DIR)}
                    alt={props.alt}
                    title={props.title}
                  ></img>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </article>
      </main>
    </>
  );
}

export default App;
