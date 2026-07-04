import { Token } from "../../DB/modules/token.module.js";
import { User } from "../../DB/modules/user.module.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Authorization header missing or invalid");
    error.statusCode = 401;
    return next(error);
  }

  const token = authHeader.split(" ")[1];
  const tokenDoc = await Token.findOne({ token, isValid: true });

  if (!tokenDoc) {
    const error = new Error("Invalid or expired token");
    error.statusCode = 401;
    return next(error);
  }
  if (new Date() >= tokenDoc.expiresAt) {
    tokenDoc.isValid = false;
    await tokenDoc.save();

    const error = new Error("Token expired");
    error.statusCode = 401;
    return next(error);
  }
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(payload.id);

  if (!currentUser) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }

  req.user = currentUser;

  return next();
});
