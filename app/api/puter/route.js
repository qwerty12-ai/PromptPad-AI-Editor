// import { NextResponse } from "next/server";
// import { runPrompt } from "@/lib/openai";

// export async function POST(request) {
//     try {
//         const { prompt } = await request.json()
//         if(!prompt) {
//             return NextResponse.json({
//                 error: "Prompt missing",
//                 description: "Not able to find a prompt"
//             },{ status: 400 });
//         }

//         const output = await runPrompt(prompt);
//         return NextResponse.json({output})
//     } catch (error) {
//         return NextResponse.json({
//             error: "Something went wrong"
//         }, { status: 500 })
//     }
// }

import { NextResponse } from "next/server";
import { runPrompt } from "@/lib/puter";
import connectDB from "@/lib/db";
import Prompt from "@/models/Prompt";

export async function POST(request) {
    try {
        const { prompt, userId, title, model } = await request.json()
        if(!prompt) {
            return NextResponse.json({
                error: "Prompt missing",
                description: "Not able to find a prompt"
            },{ status: 400 });
        }

        const {output, latency} = await runPrompt(prompt, model);
        await connectDB();
        const saved = await Prompt.create({
            userId,
            title: title || "Untitled Prompt",
            content: prompt,
            output,
            model: model || "open-llama-3b",
            latency,
        })
        return NextResponse.json({output, latency, saved})
    } catch (error) {
        return NextResponse.json({
            error: "Something went wrong"
        }, { status: 500 })
    }
}