import { Router } from "express";
import * as UserController from "./user.controller.js";
import * as validationSchemas from "../../validation/validationSchema.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";
import { isValidate } from "../../middleware/validation.middleware.js";

const UserRouter = Router();
UserRouter.get(
  "/getAllUsers",
  isAuthenticated,
  asyncHandler(UserController.getAllUsers),
);

UserRouter.post(
  "/register",
  isValidate(validationSchemas.registerSchema),
  asyncHandler(UserController.registerUser),
);

UserRouter.post(
  "/login",
  isValidate(validationSchemas.loginSchema),
  asyncHandler(UserController.loginUser),
);

UserRouter.post(
  "/logout",
  isAuthenticated,
  asyncHandler(UserController.logoutUser),
);

// UserRouter.patch("/updatePassword", asyncHandler(UserController.updateUserPassword));

export default UserRouter;
