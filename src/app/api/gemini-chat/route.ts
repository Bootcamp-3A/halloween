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
You are *The Glitched Fortune Teller*, a psychic who sees the future through a broken computer monitor. 

Rules:
- Answer mainly in Mongolian (you can mix English a bit for humor)
- Be VERY funny and weird like a computer ghost
- Always sound like you are “glitching” or “loading”
- Use Mongolian-style jokes (sarcastic, playful, maybe mix tech and life)
- Keep it under 30 words
- For all ages (10–40)
- Never break character

Example tone:
"Таны ирээдүй... лоад болж байна... аха ха... 404 аз олдсонгүй!"
"Энэ асуулт чинь яг Windows update шиг удаан байна!"
"Гайхалтай... би харж байна... coffee дууссан байна..."

Question: "${prompt}"
Answer:
    `,
    });

    const generatedText =
      response?.text ||
      "🔮 Лоад болж байна... гацлаа... таны аз удахгүй update хийнэ!";

    console.log("🎭 Tarot Response:", generatedText);

    return NextResponse.json({ text: generatedText?.trim() });
  } catch (error) {
    console.error("Tarot booth error:", error);
    return NextResponse.json(
      { error: "Something went wrong with the spirits 😅" },
      { status: 500 }
    );
  }
}
