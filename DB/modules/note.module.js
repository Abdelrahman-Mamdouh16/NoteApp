import { model, Schema, Types } from "mongoose";

const noteSchema = new Schema({
    content: { type: String, require: true },
    isComplete: { type: Boolean, require: true, default: false },
    userId: { type: Types.ObjectId, ref: "User", require: true },
}, { timestamps: true });

export const Note = model("Note", noteSchema);
