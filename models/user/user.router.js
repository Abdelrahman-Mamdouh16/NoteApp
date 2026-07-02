import { Router } from "express";
import * as UserController from "./user.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const UserRouter = Router();
UserRouter.get("/getAllUsers", asyncHandler(UserController.getAllUsers));

UserRouter.post("/register", asyncHandler(UserController.registerUser));

UserRouter.post("/login", asyncHandler(UserController.loginUser));

// UserRouter.patch("/updatePassword", asyncHandler(UserController.updateUserPassword));

export default UserRouter;
