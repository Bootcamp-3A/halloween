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

Rules:
- Answer only in Mongolian or English.
-
- Keep it under 30 words


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
