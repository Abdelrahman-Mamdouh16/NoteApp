import { Token } from "../../DB/modules/token.module.js";
import { User } from "../../DB/modules/user.module.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new Error("Authorization header missing or invalid", { cause: 401 }));
  }

  const token = authHeader.split(" ")[1];
  const tokenDoc = await Token.findOne({ token, isValid: true });

  if (!tokenDoc) {
    return next(new Error("Invalid or expired token", { cause: 401 }));
  }
  if (new Date() >= tokenDoc.expiresAt) {
    tokenDoc.isValid = false;
    await tokenDoc.save();

    return next(new Error("Token expired", { cause: 401 }));
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(payload.id);

  if (!currentUser) {
    return next(new Error("User not found", { cause: 404 }));
  }

  req.user = currentUser;

  return next();
});
