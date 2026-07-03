import express from "express";
import cors from "cors";
import { DBconnection } from "./DB/connection.js";
import UserRouter from "./src/models/user/user.router.js";
import NoteRouter from "./src/models/note/note.router.js";

const app = express();
const port = process.env.PORT;

//parse application/json
app.use(express.json());
app.use(cors());
//DB Connection
await DBconnection();

//API Routes

//User Routes:-
app.use("/api/users", UserRouter);

//Note Routes:-
app.use("/api/notes", NoteRouter);

// 404 Route
app.all("/{*splat}", (req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

app.use((error, req, res, next) => {
  // console.error(error);

  return res.status(error.statusCode || 500).json({
    success: false,
    message:
      error.message === "jwt expired"
        ? "Token expired, please login again"
        : error.message,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
  });
});

app.listen(
  port,
  () =>
    process.env.NODE_ENV !== "production" &&
    console.log(`Example app listening on port ${port}!`),
);
