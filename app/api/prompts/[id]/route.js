import connectDB from "@/lib/db";
import { authOptions } from "@/lib/options";
import Prompt from "@/models/Prompt";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

function isValid(id) {
    return mongoose.Types.ObjectId.isValid(String(id));
}

export async function PUT(req, context) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({error: "Unauthorized"}, {status: 401})

        const {params} = await context
        const {id} = params;
        if (!isValid(id))  return NextResponse.json({error: "Invalid id"}, {status: 400})


        const body = await req.json()
        const allowed = {};
        if (body.title !== undefined) allowed.title = body.title
        if (body.content !== undefined) allowed.content = body.content
        if (body.output !== undefined) allowed.output = body.output
        if (body.model !== undefined) allowed.model = body.model
        if (body.tags !== undefined) allowed.tags = body.tags

        allowed.updatedAt = Date.now()

        await connectDB()

        const updated = await Prompt.findOneAndUpdate(
            {_id: params.id, userId: session.user.id},
            allowed,
            {new: true}
        ).lean();

        if (!updated) return NextResponse.json({error: "Prompt not found"},{status: 404})

        return NextResponse.json({prompt: updated}, {status: 200})
        
    } catch(error) {
        console.error("POST /api/prompts/output error: ", error);
        return NextResponse.json({error: "Failed to update output"}, {status: 500})
    }
}

export async function DELETE(req, context) {
     try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({error: "Unauthorized"}, {status: 401})
        
        const {params} = await context
        const { id } = params
        if (!isValid(id))  return NextResponse.json({error: "Invalid id"}, {status: 400})
        await connectDB()
           
        const deleted = await Prompt.findOneAndDelete({_id: params.id, userId: session.user.id})
        if (!deleted) return NextResponse.json({error: "Prompt not found"},{status: 404})

        return NextResponse.json({message: "Delete successfully"}, {status: 200})
        
    } catch(error) {
        console.error("POST /api/prompts/[id] error: ", error);
        return NextResponse.json({error: "Failed to delete prompt"}, {status: 500})
    }
}

export async function GET(request, {params}) {
    try {
        const session = await getServerSession(authOptions);
        if(!session) return NextResponse.json({error: "Unauthorized"}, {status: 401})

        const {id} = params;
        if(!isValid(id)) return NextResponse.json({error: "Invalid id"}, {status: 400})
        await connectDB();
        const prompt = await Prompt.findOne({_id: id, userId: session.user.id}).lean()
        if(!prompt) return NextResponse.json({error: "Prompt not found"},{status: 404})
        return NextResponse.json(prompt,{status: 200})
    } catch (error) {
        console.error("GET api/prompts/[id] error: ", error)
        return NextResponse.json({error: "Failed to fetch prompt"},{status: 500})
    }
}