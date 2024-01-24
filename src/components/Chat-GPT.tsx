"use client";
import React, { useState } from "react";
const ChatGPT = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState([]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: question,
      }),
    });
    const result = await res.json();
    setAnswer(result.choices);
  };

  return (
    <div>
      <form>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          질문하기
        </button>

        {answer.map((a: any) => {
          return <p key={a.index}>{a.message.content}</p>;
        })}
      </form>
    </div>
  );
};

export default ChatGPT;
