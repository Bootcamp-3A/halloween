"use client";

import { Button, Input, Textarea } from "@/components/ui";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { GiGhost } from "react-icons/gi";

const HomePage = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [data, setData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateChat = async () => {
    setLoading(true);
    const response = await fetch("/api/gemini-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const result = await response.json();
    if (result.text) {
      setData(result.text);
    } else {
      alert("Failed to generate data");
    }
    setLoading(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center m-auto justify-between">
      <TypeAnimation
        sequence={[
          "Pine..",
          500,
          "..cone",
          500,
          "3A",
          500,
          "Hello..",
          500,
          "..we..",
          500,
          "..in",
          500,
        ]}
        speed={50}
        style={{ fontSize: 40 }}
        repeat={Infinity}
      />
      <div className="w-full px-6 py-4 h-88 overflow-scroll border border-border">
        {data && data}
      </div>

      <div className="w-full flex gap-2 py-2 px-4">
        <Textarea
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generateChat()}
          className="h-full rounded-lg text-sm leading-5 "
          placeholder="Type your message..."
        />
        <Button onClick={generateChat} className="w-30 h-30 rounded-full">
          <GiGhost className="size-20" />
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
