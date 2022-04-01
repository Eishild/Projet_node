import mongoose from "mongoose"

const articleSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  tag: String,
  qcm: Boolean,
})

export const Article = mongoose.model("articles", articleSchema)
