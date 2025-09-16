import mongoose from "mongoose";
const CrudSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

export const CurlModel = mongoose.model("user", CrudSchema);