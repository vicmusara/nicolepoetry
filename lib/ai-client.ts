import { generateText } from 'ai'
import { google } from "@ai-sdk/google"


if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    throw new Error("GOOGLE_GENERATIVE_AI_API_KEY environment variable is required")
}
export async function generateAIResponse(systemPrompt: string, userMessage: string) {
    const { text } = await generateText({
        model:  google('gemini-1.5-flash'), // Directly use the imported google object to access the model
        system: systemPrompt,
        prompt: userMessage,
        temperature: 0.7,
        maxTokens: 1000,
    })

    return text
}