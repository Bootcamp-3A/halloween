"use client";

import { Button, Textarea } from "@/components/ui";
import { useState } from "react";
import { TypeAnimation } from "react-type-animation";
import { GiGhost } from "react-icons/gi";
import Image from "next/image";

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
    <div className="w-screen h-screen flex flex-col items-center justify-between bg-gradient-to-b from-[#0b0b0b] via-[#1f1f1f] to-[#2a2a2a] text-white">
      {/* Type Animation Header */}
      <div className="w-full flex justify-center mt-10">
        <TypeAnimation
          sequence={[
            "👻 Welcome...",
            500,
            "..to the Halloween Booth!",
            500,
            "Ask a question...",
            500,
            "Get a spooky answer!",
            500,
          ]}
          speed={50}
          style={{ fontSize: 60, fontWeight: "bold", color: "#ff6f61" }}
          repeat={Infinity}
        />
      </div>

      {/* Chat Display */}
      <div className="flex-1 w-4/5 overflow-auto mt-10 p-6 rounded-xl border-2 border-orange-500 bg-black/70">
        {data ? (
          <p className="text-2xl">{data}</p>
        ) : (
          <p className="text-xl text-gray-400">
            Your answers will appear here… 🎃
          </p>
        )}
      </div>

      {/* Input Section */}
      <div className="w-4/5 flex gap-5 mt-6 mb-10">
        <Textarea
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && generateChat()}
          className="flex-1 rounded-xl text-2xl leading-8 p-4 bg-black/70 text-white border-orange-500 focus:ring-orange-400"
          placeholder="Ask the spooky oracle..."
        />
        <Button
          onClick={generateChat}
          className="w-20 h-20 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center"
        >
          <GiGhost className="w-10 h-10 text-white animate-bounce" />
        </Button>
      </div>

      {/* Loading Halloween Image */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
          <Image
            src="/pumpkin.jpeg"
            alt="Loading..."
            width={300}
            height={300}
            className="animate-pulse"
            unoptimized
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;
