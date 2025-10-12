import mongoose from "mongoose";
import {CurlModel} from "../models/dataModel.js"


export async function fetchData(req, res){
    try {
    const data = await CurlModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching data", error: error });
  }

}
export async function addData(req, res){
   try { const { name, email,phone } = req.body;
  const dataToAdd = new CurlModel({ name, email,phone, image: req.file.path });

  await dataToAdd.save();
  res
    .status(201)
    .json({ message: "Data added successfully", newRecord: dataToAdd });
}
catch(err){
  res.status(400).json({ error: err.message });
}
}
export async function fetchSingleData(req, res){
    try {
    const data = await CurlModel.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching data", error: error });
  }

}
export async function editData(req, res){
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
}
export async function deleteData(req, res){
   try{
    if (req.cookies?.authToken) {
      const deleteUser = await CurlModel.findByIdAndDelete(req.params.id)
      if(!deleteUser) {return res.status(400).json({error: "User not found"})}
      res.json({message:"User deleted", deleteUser})
  } else {
    res.status(401).json({ error: "User is not authenticated" });
  }

    
  }
  catch(err){
    res.status(400).json({error: err.message})
  } 
}