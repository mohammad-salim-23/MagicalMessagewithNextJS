/* eslint-disable @typescript-eslint/no-explicit-any */
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
   try{
   const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform. The questions should be thought-provoking and designed to encourage users to share their thoughts and experiences. Focus on universal themes that foster friendly and meaningful interaction. For example, 'What is the most memorable experience you’ve had in your life?' || 'If you could travel anywhere in the world, where would you go and why?' || 'What’s a simple thing that makes you happy?'.";

    const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-3.5-turbo'),
    maxTokens: 400,
    prompt,
    messages,
  });

  return result.toDataStreamResponse();
   }catch (error : any) {
    if(error instanceof OpenAI.APIError){
        const {name,status, headers,message} = error;
        return NextResponse.json({
            name,status,headers,message
        }, {status: status || 500});
        
    }
    else{
        console.error("Unexpected error:", error);
        return Response.json({
            success: false,
            message: "An unexpected error occurred"
        }, {status: 500});
    }
   }
}