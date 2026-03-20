import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import users from "./MOCK_DATA.json" with { type: "json" };
import { type } from "os";

const app = express();
const PORT = 3000;

mongoose.connect("mongodb+srv://sanappratik07_db_user:6XnGWgfq4XSIIQA3@cluster0.c2vhvea.mongodb.net/")
.then(() => console.log("mongoDB connected"))
.catch((err) => console.log("connection error"))


const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String
  }
})

const User = mongoose.model("user", userSchema)

// Middleware to read JSON body
app.use(express.urlencoded({ extended: false }));

app.get("/api/users", async (req, res) => {
  const users = await User.find({})
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id)
    return res.json(user);
  })
  .put(async (req, res) => {
    // Edit the user
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body)

      return res.sendStatus(200).json(updateUser)
    })
  .delete(async (req,res) => {
    await User .findByIdAndDelete(req.params.id)
    res.json({msg: "user deleted"})
  })

app.post("/api/users", async (req, res) => {
  // Create new user
  const body = req.body;

  if (!body.first_name || !body.last_name || !body.email || !body.gender) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender
  });

  return res.status(201).json({msg: "Created Successfully"})

});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
