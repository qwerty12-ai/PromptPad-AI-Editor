import mongoose from "mongoose"

const PromptSchema = new mongoose.Schema({
    userId: {type: String, required: true, index: true},
    title: {type: String, default: "Untitled Prompt"},
    content: {type: String, default: ""},
    model: String,
    output: {type: String, default: ""},
    version: {type: Number, default: 1},
    latency: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

PromptSchema.pre("save", function(next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.models.Prompt || mongoose.model("Prompt", PromptSchema)