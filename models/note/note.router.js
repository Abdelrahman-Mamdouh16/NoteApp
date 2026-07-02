import { Router } from "express";
import * as NoteController from "./note.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const NoteRouter = Router();

NoteRouter.post("/createNote", asyncHandler(NoteController.createNote));

NoteRouter.get("/getAllNotes", asyncHandler(NoteController.getAllNotes));

NoteRouter.get("/getNoteById/:id", asyncHandler(NoteController.getNoteById));

NoteRouter.put("/updateNote/:id", asyncHandler(NoteController.updateNote));

NoteRouter.delete("/deleteNote/:id", asyncHandler(NoteController.deleteNote));

NoteRouter.get("/getUserNotes/:id", asyncHandler(NoteController.getUserNotes));

export default NoteRouter;
