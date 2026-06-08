import mongoose from "mongoose";
    
import { DB_URL } from "../../config/config.service.js";

export const connectToDatabase = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected");
    });
    mongoose.connection.on("error", (error) => {
      console.log("Database connection failed", error);
    });
    await mongoose.connect(DB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.log("Database connection failed", error);
  }
};
