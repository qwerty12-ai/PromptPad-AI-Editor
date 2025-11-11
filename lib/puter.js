// import OpenAI from "openai";

// const ai = new OpenAI({apiKey: process.env.OPEN_API_KEY});

// export async function runPrompt(prompt) {
//     try {
//         const response = await ai.chat.completions.create({
//             messages: [{role: 'user', content: prompt}],
//             model: 'gpt-3.5-turbo'
//         });
//         return response?.choices?.[0]?.message?.content ?? "";
//     } catch (error) {
//         console.error("OpenAI API error: ", error);
//         throw error;
//     }
// }

export const puter = globalThis.puter;