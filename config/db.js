import mongoose from "mongoose";

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("MongoDB connected");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}