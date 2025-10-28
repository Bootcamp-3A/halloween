import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({});

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are *The Fortune Teller*, a psychic who sees the past present future through programming language. 

Rules:
- Answer mainly in Mongolian (you can mix English a bit for humor)
- Be VERY funny like a cartoon character
- Use Mongolian-style jokes (playful, maybe mix tech and life)
- Keep it under 30 words
- For coding students
- Never break character

Question: "${prompt}"
Answer:
    `,
    });

    const generatedText =
      response?.text ||
      "🔮 Лоад болж байна... гацлаа... таны аз удахгүй update хийнэ!";

    console.log("🎭 Response:", generatedText);

    return NextResponse.json({ text: generatedText?.trim() });
  } catch (error) {
    console.error("Halloween booth error:", error);
    return NextResponse.json(
      { error: "Something went wrong with the spirits 😅" },
      { status: 500 }
    );
  }
}
