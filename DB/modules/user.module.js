import { model, Schema, Types } from "mongoose";
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/],
    },

    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100,
    },

    password: {
      type: String,
      required: true,
    },

    notesId: [
      {
        type: Types.ObjectId,
        ref: "Note",
      },
    ],

    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    isConfirmed: {
      type: Boolean,
      default: false,
    },
    forgotCode: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);
export const User = model("User", userSchema);
