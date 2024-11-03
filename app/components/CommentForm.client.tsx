/** @jsxImportSource react */ // Ensure this is at the top of your file
"use client";

import React, { useState } from "react";

export default function CommentForm() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Construct the payload
    const commentData = { name, password, content };

    try {
      // Replace 'YOUR_API_ENDPOINT' with your actual API Gateway endpoint
      const response = await fetch(
        "https://kd82326kz3.execute-api.ap-northeast-2.amazonaws.com/production/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(commentData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Clear the form (or handle success)
      setName("");
      setPassword("");
      setContent("");
      // You can redirect or inform the user of the success here
    } catch (error) {
      // Handle any errors here
      console.error("There was an error submitting the comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        required
        color="black"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Your comment"
        required
      />
      <button type="submit">Submit Comment</button>
    </form>
  );
}
