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