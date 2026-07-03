import mongoose from "mongoose";

export const DBconnection = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      process.env.NODE_ENV !== "production" &&
        console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error("Error connecting to database:", err);
    });
};
