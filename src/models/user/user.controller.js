import  jwt  from "jsonwebtoken";
import { User } from "../../../DB/modules/user.module.js";
import bcrypt from "bcryptjs";

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
  const { email, age, password, confirmPassword } = req.body;

  if (!email || !age || !password || !confirmPassword) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    return next(error);
  }
  if (password !== confirmPassword) {
    const error = new Error("Passwords do not match");
    error.statusCode = 400;
    return next(error);
  }
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
  const passwordHashing = await bcrypt.hash(password, 8);
  await User.create({ email, age, password: passwordHashing });
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
  const { email, password: passwordBody } = req.body;
  if (!email || !passwordBody) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    return next(error);
  }
  const findUser = await User.findOne({ email });
  // console.log(findUser);

  if (!findUser) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    return next(error);
  }
  const isPasswordValid = await bcrypt.compareSync(
    passwordBody,
    findUser.password,
  );
  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    return next(error);
  }
  const { password, ...userData } = findUser.toObject();
  const token = jwt.sign(
    { id: findUser._id, email: findUser.email },
    process.env.JWT_SECRET,
    { expiresIn: "1w" },
  );

  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: { userData, token },
  });
};
