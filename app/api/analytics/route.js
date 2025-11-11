import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Prompt from "@/models/Prompt";

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if(!session) return NextResponse.json({error: "Unauthorized"},{status: 401});
        await connectDB();
        const {searchParams} = new URL(request.url);
        const promptId = searchParams.get("promptId");
        if(!promptId) return NextResponse.json({error: "Missing promptId"}, {status: 400})
        const prompt = await Prompt.findById(promptId)
        if(!prompt) return NextResponse.json({error: "Missing prompt"}, {status: 404})
        // const totalPrompts = await Prompt.countDocuments({ userId });
        return NextResponse.json({totalPrompts: 1, 
            latency: prompt.latency || 0,
        }, {status: 200});
    } catch (error) {
        console.error("GET api/analytics error: ", error)
        return NextResponse.json({error: "Failed to fetch stats"}, {status: 500})
    }
}