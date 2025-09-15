import { Router } from "express";
import {
  fetchData,
  addData,
  editData,
  deleteData,
} from "../controllers/dataController.js";

const dataRouter = Router();

dataRouter.get("/get", fetchData);
dataRouter.post("/add", addData);
dataRouter.put("/edit/:id", editData);
dataRouter.delete("/delete/:id", deleteData);

export default dataRouter;
