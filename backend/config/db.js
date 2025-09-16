import mongoose from "mongoose";

export async function connectToDB() {
  try {
    await mongoose.connect(/*process.env.MONGO_URI*/'mongodb+srv://mongodbuser:MongoDbUser@cluster0.ntuilvw.mongodb.net/basiccrud?retryWrites=true&w=majority&appName=Cluster0').then(() => {
      console.log("MongoDB connected");
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}