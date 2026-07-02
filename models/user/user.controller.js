import { User } from "../../DB/modules/user.module.js";

export const getAllUsers = async (req, res, next) => {
  // try {
  const users = await User.find();
  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
  // } catch (err) {
  //   const error = err.message;
  //   error.statusCode = 500;
  //   return next(error);
  // }
};
export const registerUser = async (req, res, next) => {
  // try {
  const { email, age, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    return next(error);
  }
  if (age < 18 || age > 100) {
    const error = new Error("Age must be between 18 and 100");
    error.statusCode = 400;
    return next(error);
  }
  await User.create({ email, age, password });
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
  // } catch (err) {
  //   const error = err.message;
  //   error.statusCode = 500;
  //   return next(error);
  // }
};
export const loginUser = async (req, res, next) => {
  // try {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    return next(error);
  }
  if (findUser.password !== password) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    return next(error);
  }
  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: findUser,
  });
  // } catch (err) {
  //   const error = err.message;
  //   error.statusCode = 500;
  //   return next(error);
  // }
};
