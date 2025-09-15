import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import { connectToDB } from "./config/db.js";
import dataRouter from "./routes/dataRoutes.js";
const app = express();
app.use(express.json());

await connectToDB();

app.use("/data",dataRouter)



const port = process.env.PORT;


// app.get("/data/get", (req, res) => {
//   res.json(data);
// });
// app.get("/data/get/:id", (req, res) => {
//   let { id } = req.params;
//   id = Number(id);
//   const dataFound = data.find((obj) => {
//     return obj.id === id;
//   });
//   res.json(dataFound);
// });

/*app.get("/data/get", async (req, res) => {
  try {
    const data = await CurlModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching data", error: error });
  }
});
app.get("/data/get/:id", async (req, res) => {
  try {
    const data = await CurlModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching data", error: error });
  }
});
app.post("/data/add", async (req, res) => {
  const { name, email } = req.body;
  const dataToAdd = new CurlModel({ name, email });
  await dataToAdd.save();
  res
    .status(201)
    .json({ message: "Data added successfully", newRecord: dataToAdd });
});
app.put("/data/edit/:id", async (req, res) => {
  try {
    const { name, email } = req.body;
    const updatedUser = await CurlModel.findByIdAndUpdate(
      req.params.id,
      { name, email },
      { new: true, runValidators: true }
    );
    if(!updatedUser){return res.status(400).json({error:"User not found"})}
    res.json({message: "User data updated",updatedUser})
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.delete("/data/delete/:id", async (req, res) =>{
  try{
    const deleteUser = await CurlModel.findByIdAndDelete(req.params.id)
    if(!deleteUser) {return res.status(400).json({error: "User not found"})}
    res.json({message:"User deleted", deleteUser})
  }
  catch(err){
    res.status(400).json({error: err.message})
  }
})*/
// app.put("/data/edit/:id", (req, res) => {
//   const { name, email } = req.body;
//   let { id } = req.params;
//   id = Number(id);

//   data = data.map((userData) =>
//     userData.id === id ? { ...userData, name: name, email: email } : userData
//   );

//   res.json(data);
// });
// app.delete("/data/delete/:id", (req, res) => {
//   let { id } = req.params;
//   id = Number(id);
//   data = data.filter((obj) => {
//     return obj.id !== id;
//   });
//   res.json(data);
// });

app.listen(port, () => console.log("Server start at post", port));
