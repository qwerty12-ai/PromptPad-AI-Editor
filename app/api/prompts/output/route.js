import connectDB from "@/lib/db";
import { runPrompt } from "@/lib/puter";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Prompt from "@/models/Prompt";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions)
        if(!session) return NextResponse.json({error: "Unauthorized"}, {status: 401})
        await connectDB()

        const {promptId, output} = await req.json()
        if(!promptId) return NextResponse.json({error: "Missing promptID"},{status: 400})

        const updated = await Prompt.findByIdAndUpdate(
            promptId,
            {output},
            {new: true}
        )

        return NextResponse.json({success: true,prompt: updated})

    } catch(error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
        
}