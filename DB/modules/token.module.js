import { model, Schema, Types } from "mongoose";

const tokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "user",
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    agent: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //7 * 24 * 60 * 60 * 1000
    },
  },
  {
    timestamps: true,
  },
);

tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Token = model("token", tokenSchema);
