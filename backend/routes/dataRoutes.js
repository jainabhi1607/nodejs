import { Router } from "express";
import multer from "multer";  
import {
  fetchData,
  fetchSingleData,
  addData,
  editData,
  deleteData,
} from "../controllers/dataController.js";

import path from 'path'; 

const dataRouter = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+ext)
  }
})
const upload = multer({storage: storage})

dataRouter.get("/get", fetchData);
dataRouter.get("/user/:id", fetchSingleData);
dataRouter.post("/add", upload.single('image'), addData);
dataRouter.put("/edit/:id", editData);
dataRouter.delete("/delete/:id", deleteData);

export default dataRouter;
