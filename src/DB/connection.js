import mongoose from "mongoose";
import { URL_DB } from "../config/process.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(URL_DB);
    console.log("Database connected");

  } catch (error) {
    console.log("Database connection failed", error);
  }
};

