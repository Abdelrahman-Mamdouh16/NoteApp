import jwt from "jsonwebtoken";
import { User } from "../../../DB/modules/user.module.js";
import bcrypt from "bcryptjs";
import { Token, Token } from "../../../DB/modules/token.module.js";

export const getAllUsers = async (req, res, next) => {
  // try {
  const users = await User.find();
  return res.status(200).json({
    success: true,
    message: "Users retrieved successfully",
    data: users,
  });
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
  const passwordHashing = await bcrypt.hash(
    password,
    Number(process.env.passwordSaltRounds),
  );
  await User.create({ email, age, password: passwordHashing });
  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};
export const loginUser = async (req, res, next) => {
  // try {
  const { email, password: passwordBody } = req.body;
  if (!email || !passwordBody) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    return next(error);
  }
  const findUser = await User.findOne({ email }, { notesId: 0 });
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
  await Token.create({
    token,
    userId: findUser._id,
    agent: req.headers["user-agent"],
  });
  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: { userData, token },
  });
};
export const logoutUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const tokenDoc = await Token.findOneAndUpdate({ token }, { isValid: false });
  if (!tokenDoc) {
    const error = new Error("Token not found");
    error.statusCode = 404;
    return next(error);
  }
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
