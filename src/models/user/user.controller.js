import jwt from "jsonwebtoken";
import { User } from "../../../DB/modules/user.module.js";
import bcrypt from "bcryptjs";
import { Token } from "../../../DB/modules/token.module.js";

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
    return next(new Error("All fields are required", { cause: 400 }));
  }
  if (password !== confirmPassword) {
    return next(new Error("Passwords do not match", { cause: 400 }));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new Error("User already exists", { cause: 400 }));
  }
  if (age < 18 || age > 100) {
    return next(new Error("Age must be between 18 and 100", { cause: 400 }));
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
    return next(new Error("Email and password are required", { cause: 400 }));
  }
  const findUser = await User.findOne({ email }, { notesId: 0 });
  if (!findUser) {
    return next(new Error("Invalid email or password", { cause: 401 }));
  }
  const isPasswordValid = await bcrypt.compareSync(
    passwordBody,
    findUser.password,
  );
  if (!isPasswordValid) {
    return next(new Error("Invalid email or password", { cause: 401 }));
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
    return next(new Error("Token not found", { cause: 404 }));
  }
  return res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};
