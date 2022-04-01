import express, { json } from "express"
import mongoose from "mongoose"
// import { Users } from "./models/register.model.js"
import cors from "cors"
import auth from "./routes/auth.router.js"
import authentification from "./middleware/users.js"
const app = express()
mongoose.connect("mongodb://localhost:27017/projet")

const PORT = 3001

app.use(json())
app.use(cors())
app.use("/auth", auth)

app.get("/", (req, res) => {
  res.send("hello")
})

app.listen(PORT, () => {
  console.log(`Le serveur est lancé sur le port : ${PORT}`)
})
