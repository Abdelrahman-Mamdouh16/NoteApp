import { Router } from "express";
import * as NoteController from "./note.controller.js";
import { isAuthenticated } from "../../middleware/auth.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const NoteRouter = Router();

NoteRouter.post(
  "/createNote",
  isAuthenticated,
  asyncHandler(NoteController.createNote),
);

NoteRouter.get(
  "/getAllNotes",
  isAuthenticated,
  asyncHandler(NoteController.getAllNotes),
);

NoteRouter.get(
  "/getNoteById/:id",
  isAuthenticated,
  asyncHandler(NoteController.getNoteById),
);

NoteRouter.put(
  "/updateNote/:id",
  isAuthenticated,
  asyncHandler(NoteController.updateNote),
);

NoteRouter.delete(
  "/deleteNote/:id",
  isAuthenticated,
  asyncHandler(NoteController.deleteNote),
);

NoteRouter.get(
  "/getUserNotes/:id",
  isAuthenticated,
  asyncHandler(NoteController.getUserNotes),
);

export default NoteRouter;
