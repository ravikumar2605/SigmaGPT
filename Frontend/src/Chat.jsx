import "./Chat.css";
import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat() {
  const { newChat, prevChats, reply, setPrompt } = useContext(MyContext);
  const [latestReply, setLatestReply] = useState(null);

  useEffect(() => {
    if (reply === null) {
      setLatestReply(null); //prevchat load
      return;
    }

    if (!prevChats?.length) return;

    const content = reply.split(" "); //individual words

    let idx = 0;
    const interval = setInterval(() => {
      setLatestReply(content.slice(0, idx + 1).join(" "));

      idx++;
      if (idx >= content.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, [prevChats, reply]);

  return (
    <>
      {newChat || prevChats.length === 0 ? (
        <div className="emptyState">
          <img
            src="./src/assets/blacklogo.png"
            alt="SigmaGPT Logo"
            className="emptyLogo chatLogo"
          />
          <h2>Welcome to SigmaGPT!</h2>
          <p className="emptySubtitle">How can I help you today?</p>
          <div className="examplePrompts">
            <div
              className="prompt"
              onClick={() =>
                setPrompt("Explain quantum computing in simple terms")
              }
            >
              "Explain quantum computing in simple terms"
            </div>
            <div
              className="prompt"
              onClick={() => setPrompt("Write a poem about the sea")}
            >
              "Write a poem about the sea"
            </div>
            <div
              className="prompt"
              onClick={() => setPrompt("How do I center a div in CSS?")}
            >
              "How do I center a div in CSS?"
            </div>
          </div>
        </div>
      ) : (
        <div className="chats">
          {prevChats?.slice(0, -1).map((chat, idx) => (
            <div
              className={chat.role === "user" ? "userDiv" : "gptDiv"}
              key={idx}
            >
              {chat.role === "user" ? (
                <p className="userMessage">{chat.content}</p>
              ) : (
                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                  {chat.content}
                </ReactMarkdown>
              )}
            </div>
          ))}
          {prevChats.length > 0 && (
            <>
              {latestReply === null ? (
                <div className="gptDiv" key={"non-typing"}>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {prevChats[prevChats.length - 1].content}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="gptDiv" key={"typing"}>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {latestReply}
                  </ReactMarkdown>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Chat;
