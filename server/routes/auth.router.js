import express from "express"
import { body, check } from "express-validator"
import {
  register,
  login,
  verifyJwt,
  logout,
} from "../controllers/auth.controller.js"
const router = express.Router()

router.get("/isUser", verifyJwt)
// router.get("/article", verifyJwt)
router.get("/logout", logout)
router.post("/login", login)
router.post("/register", register)

export default router
