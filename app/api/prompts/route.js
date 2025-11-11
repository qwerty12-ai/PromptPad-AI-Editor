import { NextResponse } from "next/server";
import Prompt from "@/models/Prompt";
import connectDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/options";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if(!session) return NextResponse.json({error: "Unauthorized"},{status: 401});
        await connectDB();
        const {title, content, output="", tags=[]} = await request.json();

        const prompt = await Prompt.create({userId: session.user.id, title, content, output, tags});
        if(!prompt) {
            return NextResponse.json({
                error: "Unexpected error"
            },{status: 401})

        }
        return NextResponse.json(prompt);
    } catch (error) {
        return NextResponse.json({
            error: "Failed to save prompt"
        },{status: 500})
    }
}

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if(!session) return NextResponse.json({error: "Unauthorized"},{status: 401});
        await connectDB();
        const url = new URL(request.url)
        const qUserId = url.searchParams.get("userId")
        const filter = qUserId ? {userId: qUserId} : {userId: session.user.id}
        const prompts = await Prompt.find(filter).sort({updatedAt: -1}).lean()
        return NextResponse.json(prompts,{status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: "Failed to fetch prompts"
        }, {
            status: 500
        })
    }
}