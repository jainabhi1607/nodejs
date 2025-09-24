import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthModel } from "../models/authModel.js";

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await AuthModel.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res.status(404).json({ error: "Invalid credentials" });

    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
export async function register(req, res) {
  try {
    let { name, email, username, password, phone } = req.body;
    password = await bcrypt.hash(password, 10);

    const dataToAdd = new AuthModel({ name, email, username, password, phone });
    await dataToAdd.save();
    res
      .status(201)
      .json({ message: "Data added successfully", newRecord: dataToAdd });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export function authCheck(req, res) {
  console.log(req.cookies);             // <-- plural
  console.log(req.cookies?.authToken);
  if (req.cookies?.authToken) {
    res.status(200).json({ message: "User is authenticated" });
  } else {
    res.status(401).json({ error: "User is not authenticated" });
  }
}
