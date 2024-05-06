import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/webshop");
    console.log("Connected to MongoDB!")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
