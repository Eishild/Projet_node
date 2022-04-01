import mongoose from "mongoose"

const usersSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
})

export const Users = mongoose.model("users", usersSchema)
