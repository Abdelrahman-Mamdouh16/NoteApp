import { Note } from "../../DB/modules/note.module.js";
import { User } from "../../DB/modules/user.module.js";

export const createNote = async (req, res, next) => {
  // try {
  // console.log(req.body);

  const { content, isComplete, userId } = req.body;

  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }

  const notes = await Note.create({ content, isComplete, userId });
  // const addUserNote = await User.findByIdAndUpdate(
  //   userId,
  //   { $push: { notesId: notes._id } },
  //   { new: true },
  // );
  isUserExist.notesId.push(notes._id);
  await isUserExist.save();
  return res.status(200).json({
    success: true,
    message: "Note created successfully",
    data: notes,
  });
  // } catch (err) {
  //   const error = err.message;
  //   error.statusCode = 500;
  //   return next(error);
  // }
};
export const getAllNotes = async (req, res, next) => {
  // try {
  const notes = await Note.find().populate("userId", "name email");
  return res.status(200).json({
    success: true,
    message: "Notes retrieved successfully",
    data: notes,
  });
  // } catch (err) {
  //   const error = err.message;
  //   error.statusCode = 500;
  //   return next(error);
  // }
};
export const getNoteById = async (req, res, next) => {
  // try {
  const { id } = req.params;
  const note = await Note.findById(id).populate("userId", "email age -_id");
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
  // } catch (err) {
  //   const error = err.message;
  //   error.statusCode = 500;
  //   return next(error);
  // }
};
export const updateNote = async (req, res, next) => {
  // try {
  const { id } = req.params;
  const { content, isComplete, userId } = req.body;
  const note = await Note.findById(id);
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    return next(error);
  }
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }
  const isNoteBelongsToUser = note.userId.toString() === userId;
  if (!isNoteBelongsToUser) {
    const error = new Error("Note does not belong to the specified user");
    error.statusCode = 400;
    return next(error);
  }
  // const updatedNote = await Note.findByIdAndUpdate(
  //   id,
  //   { content, isComplete },
  //   { new: true },
  // );
  note.content = content;
  note.isComplete = isComplete;

  await note.save();
  return res.status(200).json({
    success: true,
    message: "Note updated successfully",
    data: note,
  });
  // } catch (err) {
  //   const error = err.message;
  //   error.statusCode = 500;
  //   return next(error);
  // }
};
export const deleteNote = async (req, res, next) => {
  // try {
  const { id } = req.params;
  const { userId } = req.body;
  const note = await Note.findById(id);
  if (!note) {
    const error = new Error("Note not found");
    error.statusCode = 404;
    return next(error);
  }
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }
  const isNoteBelongsToUser = note.userId.toString() === userId;
  if (!isNoteBelongsToUser) {
    const error = new Error("Note does not belong to the specified user");
    error.statusCode = 400;
    return next(error);
  }
  await note.deleteOne();
  await User.findByIdAndUpdate(userId, { $pull: { notesId: id } });
  return res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
  // } catch (err) {
  //   const error = err.message;
  //   error.statusCode = 500;
  //   return next(error);
  // }
};
export const getUserNotes = async (req, res, next) => {
  // try {
  const { id } = req.params;
  const user = await User.findById(id, {
    notesId: 1,
    _id: 0,
  }).populate("notesId", "content isComplete -_id");
  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    return next(error);
  }
  return res.status(200).json({
    success: true,
    message: "User notes retrieved successfully",
    data: user,
  });
  // } catch (err) {
  //   const error = err.message;
  //   error.statusCode = 500;
  //   return next(error);
  // }
};
