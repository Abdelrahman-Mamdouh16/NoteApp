import Joi from "joi";
import { Types } from "mongoose";

export const registerSchema = Joi.object({
  name: Joi.string().min(5).max(20).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 5 characters long",
    "string.max": "Name must be at most 20 characters long",
    "any.required": "Name is required",
  }),

  email: Joi.string().email().required().messages({
    "string.base": "Email must be a string",
    "string.email": "Invalid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  age: Joi.number().min(18).max(100).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be at least 18",
    "number.max": "Age must be at most 100",
    "any.required": "Age is required",
  }),

  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .messages({
      "string.base": "Password must be a string",
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 30 characters long",
      "string.pattern.base": "Password must contain only letters and numbers",
      "any.required": "Password is required",
    }),

  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "string.empty": "Confirm password is required",
    "any.required": "Confirm password is required",
  }),
}).options({
  abortEarly: false,
  allowUnknown: false,
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
}).options({
  abortEarly: false,
  allowUnknown: false,
});

export const noteSchema = Joi.object({
  content: Joi.string().required().messages({
    "string.base": "Content must be a string",
    "string.empty": "Content is required",
    "any.required": "Content is required",
  }),

  isComplete: Joi.boolean().required().messages({
    "boolean.base": "isComplete must be a boolean",
    "any.required": "isComplete is required",
  }),

  userId: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.message("Invalid userId");
      }

      return value;
    })
    .required()
    .messages({
      "string.empty": "userId is required",
      "any.required": "userId is required",
    }),
}).options({
  abortEarly: false,
  allowUnknown: false,
});

// export const loginSchema ={body: joi.object({
//   email: joi.string().email().required(),
//   password: joi
//     .string()
//     .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
//     .required(),
// })
// .required(),
// query: joi.object({
//   email: joi.string().email().required(),
//   password: joi
//     .string()
//     .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
//     .required(),
// })
// .required()}
