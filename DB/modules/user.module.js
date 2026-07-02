import { model, Schema, Types } from "mongoose";
const userSchema = new Schema(
  {
    email: { type: String, require: true, unique: true },
    age: { type: Number, require: true, min: 18, max: 100 },
    password: { type: String, require: true },
    notesId: [{ type: Types.ObjectId, ref: "Note", require: true }],
  },
  {
    timestamps: true,
  },
);
export const User = model("User", userSchema);
