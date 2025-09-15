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

const CurlModel = mongoose.model("user", CrudSchema);


export async function fetchData(req, res){
    try {
    const data = await CurlModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error in fetching data", error: error });
  }

}
export async function addData(req, res){
    const { name, email } = req.body;
  const dataToAdd = new CurlModel({ name, email });
  await dataToAdd.save();
  res
    .status(201)
    .json({ message: "Data added successfully", newRecord: dataToAdd });
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
    const deleteUser = await CurlModel.findByIdAndDelete(req.params.id)
    if(!deleteUser) {return res.status(400).json({error: "User not found"})}
    res.json({message:"User deleted", deleteUser})
  }
  catch(err){
    res.status(400).json({error: err.message})
  } 
}