import { authOptions } from "@/lib/options";
import Prompt from "@/models/Prompt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import mongoose from "mongoose";

export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if(!session) return NextResponse.json({error: "Unauthorized"},{status: 401});
        await connectDB();
        const url = new URL(request.url)
        const idsParams = url.searchParams.get("ids")
        if (!idsParams) return NextResponse.json({error: "Missing ids params"},{status: 400})
         // ex: ?ids=234,456 and we compare these ids
        const ids = idsParams.split(",").map(s => s.trim()).filter(Boolean);
        const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(String(id)))
        if(!validIds.length) return NextResponse.json({error: "No valid ids"},{status: 400}) 
        const prompts = await Prompt.find({_id: {$in: validIds}, userId: session.user.id}).lean()
        return NextResponse.json(prompts,{status: 200})
    } catch (error) {
        console.error("GET api/compare error: ", error)
        return NextResponse.json({error:"Failed to fetch prompts to compare"},{status: 500})
    }
}