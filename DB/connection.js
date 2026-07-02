import mongoose from "mongoose";

export const DBconnection = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/notesAppDB")
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
    });
};
