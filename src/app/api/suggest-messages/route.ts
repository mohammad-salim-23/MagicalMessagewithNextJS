/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt = `Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform.`;

    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      prompt,
      maxTokens: 300,
    });

    const text = await result.text; // get plain text

    return NextResponse.json({
      success: true,
      suggestions: text,
    });
  } catch (error: any) {
    console.error("Unexpected error:", error);
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    }
    return NextResponse.json(
      { success: false, message: "Unexpected server error" },
      { status: 500 }
    );
  }
}
