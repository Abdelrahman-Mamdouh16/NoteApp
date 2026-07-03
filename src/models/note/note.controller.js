import { Note } from "../../../DB/modules/note.module.js";
import { User } from "../../../DB/modules/user.module.js";

export const createNote = async (req, res, next) => {
  const { content, isComplete } = req.body;
  const currentUser = req.user;
  if (content === undefined || isComplete === undefined) {
    const error = new Error("content and isComplete are required");
    error.statusCode = 400;
    return next(error);
  }
  const notes = await Note.create({
    content,
    isComplete,
    userId: currentUser._id,
  });
  currentUser.notesId.push(notes._id);
  await currentUser.save();

  return res.status(200).json({
    success: true,
    message: "Note created successfully",
    data: notes,
  });
};
export const getAllNotes = async (req, res, next) => {
  const notes = await Note.find().populate("userId", "name email");
  return res.status(200).json({
    success: true,
    message: "Notes retrieved successfully",
    data: notes,
  });
};
export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const note = await Note.findById(id).populate("userId", "email age -_id");
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    return next(error);
  }

  const currentUser = req.user;
  const isNoteBelongsToUser = note.userId.equals(currentUser._id);

  if (!isNoteBelongsToUser) {
    const error = new Error("Note does not belong to the specified user");
    error.statusCode = 403;
    return next(error);
  }

  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    return next(error);
  }

  return res.status(200).json({
    success: true,
    message: "Note retrieved successfully",
    data: note,
  });
};
export const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { content, isComplete } = req.body;
  if (content === undefined || isComplete === undefined) {
    const error = new Error("content and isComplete are required");
    error.statusCode = 400;
    return next(error);
  }
  if (content !== undefined) {
    note.content = content;
  }

  if (isComplete !== undefined) {
    note.isComplete = isComplete;
  }
  const userId = req.user._id;
  const note = await Note.findById(id);
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    return next(error);
  }

  const isNoteBelongsToUser = note.userId.equals(req.user._id);
  if (!isNoteBelongsToUser) {
    const error = new Error("Note does not belong to the specified user");
    error.statusCode = 403;
    return next(error);
  }

  note.content = content;
  note.isComplete = isComplete;

  await note.save();
  return res.status(200).json({
    success: true,
    message: "Note updated successfully",
    data: note,
  });
};
export const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;
  const note = await Note.findById(id);
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    return next(error);
  }
  const isNoteBelongsToUser = note.userId.equals(req.user._id);
  if (!isNoteBelongsToUser) {
    const error = new Error("Note does not belong to the specified user");
    error.statusCode = 403;
    return next(error);
  }
  await note.deleteOne();

  req.user.notesId.pull(id);
  await req.user.save();

  return res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
};
export const getUserNotes = async (req, res, next) => {
  const userNotes = await req.user.populate(
    "notesId",
    "content isComplete -_id",
  );

  return res.status(200).json({
    success: true,
    message: "User notes retrieved successfully",
    data: userNotes,
  });
};
