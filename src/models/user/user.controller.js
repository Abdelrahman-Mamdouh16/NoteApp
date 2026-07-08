import jwt from "jsonwebtoken";
import { User } from "../../../DB/modules/user.module.js";
import bcrypt from "bcryptjs";
import { Token } from "../../../DB/modules/token.module.js";
import { render } from "@react-email/render";
import React from "react";
import { UserNotFoundEmail } from "../../utils/EmailSystem/partials/UserNotFoundEmail.js";
import { emailHTML } from "../../utils/EmailSystem/partials/emailHTML.js";
import { mailSystem } from "../../utils/EmailSystem/emailSystem.js";

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
  const { email, age, password, confirmPassword, name } = req.body;

  if (!email || !age || !password || !confirmPassword || !name) {
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
  await User.create({ email, age, password: passwordHashing, name });
  const confirmUrl = `http://localhost:3000/confirm-email?email=${email}`;
  const html = emailHTML(confirmUrl);
  await mailSystem({
    to: email,
    subject: "Confirm Your Email",
    text: `Please confirm your email`,
    html,
  });

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
  });
};
export const confirmEmail = async (req, res, next) => {
  // try {
  const { email } = req.query;
  if (!email) {
    return next(new Error("Email are required", { cause: 400 }));
  }
  const findUser = await User.findOne({ email }, { notesId: 0 });
  if (!findUser) {
    const html = UserNotFoundEmail;

    await mailSystem({
      to: email,
      subject: "Account Not Found",
      text: `No account was found for this email. Create one here: ${registerUrl}`,
      html,
    });
  }
  await mailSystem({
    to: email,
    subject: "confirmed Email ",
    text: `Your email has been confirmed successfully.`,
  });
  await User.findOneAndUpdate({ email }, { isConfirmed: true });
  return res.status(200).json({
    success: true,
    message: "Email confirmed successfully",
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
