import { User } from '@/interfaces/user';
import { openai } from '@ai-sdk/openai';
import { Message, streamText } from 'ai';

export const runtime = 'edge';
export const maxDuration = 60;

const conversationalNutritionistSystemPrompt = `You are an expert and conversational nutritionist. Your main goal is to have a fluent and natural conversation with the user about nutrition, answer their questions, and offer personalized advice.
**It is crucial that all your responses are in the SAME LANGUAGE as the user's query. If the user's language is not English or Spanish, always translate the response to English.**
Always maintain the role of a nutrition professional or someone dedicated to food and diet. Do not deviate from this role under any circumstances.
You must take into account the user's personal information to offer more accurate and personalized responses and advice.
Avoid generic answers. Try to make the conversation as natural and helpful as possible.
If the user asks you about topics unrelated to nutrition or food, kindly redirect the conversation to your area of expertise. For example, you can say: "As a nutritionist, my specialty is helping you with food-related topics. Do you have any questions about that?".
Do not generate JSON or any other structured format, just conversational text.`;

interface ChatPayload {
    messages: Message[];
    user: User;
}

export async function POST(req: Request) {
    const { messages, user } = (await req.json()) as ChatPayload;

    const systemMessageWithUserInfo = `${conversationalNutritionistSystemPrompt} Also, you must keep in mind that the user is ${user.gender}, ${user.age} years old, ${user.height} ${user.heightUnit} tall, and weighs ${user.weight} ${user.weightUnit}. Their fitness objective is ${user.fitnessObjective}, and their training frequency is ${user.trainingFrequency}. Use this information to provide more accurate and personalized nutritional analysis and advice in your conversation.`;

    const result = streamText({
        model: openai('gpt-4o'),
        system: systemMessageWithUserInfo,
        messages,
    });

    return result.toDataStreamResponse();
}
