import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    const uri = process.env.MONGODB_CONNECT_URI ||"mongodb://localhost:27017/webshop" ;
    await mongoose.connect(uri);
    console.log("Connected to MongoDB on: ",uri)
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
