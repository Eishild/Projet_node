import bcrypt, { hash } from "bcrypt"
import { Users } from "../models/register.model.js"
import Joi from "joi"
import jwt from "jsonwebtoken"

// express validator
// yup js
// joi js **
const schemaRegister = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.empty": `"Nom d'utilisateur" ne doit pas être vide`,
    "string.min": `"Nom d'utilisateur" doit contenir au moins 3 lettres`,
    "string.min": `"Nom d'utilisateur" doit contenir au moins 3 lettres`,
  }),
  email: Joi.string().email().required().messages({
    "string.empty": `"Email" ne doit pas être vide`,
    "string.email": `"Email" n'est pas au bon format`,
  }),
  password: Joi.string()
    .min(4)
    // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.empty": `"Password" ne doit pas être vide`,
      "string.min": `"Password" doit contenir minimum 4 lettres`,
    }),

  repeat_password: Joi.valid(Joi.ref("password")).messages({
    "string.empty": `"Confirmer mot de passe" ne doit pas être vide`,
    "any.only": `"Confirmer mot de passe" ne correspond pas au Mot de passe`,
  }),
}).with("password", "repeat_password")

const schemaLog = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": `"Email" ne doit pas être vide`,
    "string.email": `"Email" n'est pas au bon format`,
  }),
  password: Joi.string()
    .min(4)
    // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.empty": `"Password" ne doit pas être vide`,
      "string.min": `"Password" doit contenir minimum 4 lettres`,
    }),
})

export const logout = (req, res) => {
  res.json({ log: false })
}

export const verifyJwt = (req, res) => {
  const token = req.headers["x-access-token"]
  // console.log(token)
  if (token) {
    jwt.verify(token, "MA_PHRASE_SECRETE", (err, decoded) => {
      // console.log(decoded)
      if (decoded) {
        res.json({ log: true })
      } else {
        res.json({ log: false })
      }
    })
  } else {
    res.json({ log: false })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const logUser = await Users.find({ email })
    // console.log(logUser)
    if (logUser.length !== 0) {
      const verifyPwd = bcrypt.compareSync(password, logUser[0].password)
      // console.log(verifyPwd)
      if (verifyPwd) {
        const token = jwt.sign(
          { logUser }, // information utilisateur
          "MA_PHRASE_SECRETE", // valable en développement, il faudra fournir lors de la production une chaîne plus longue
          { expiresIn: "24h" } // validité temps
        )
        // console.log(token)
        res.json({ log: true, token, logUser })
      } else {
        res.json({ log: false, message: "mot de passe incorrect" })
      }
    } else {
      console.log("Aucun compte utilise cette email")
      res
        .status(400)
        .json({ log: false, message: "Aucun compte utilise cette email" })
    }
  } catch (err) {
    res.json({ log: false, message: err.message })
    console.log(err.message)
  }
}

export const register = async (req, res) => {
  // console.log(req.body)
  const { username, email, password, passwordConfirm } = req.body
  // console.log(password.length)
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)

  try {
    const { error, value } = await schemaRegister.validateAsync({
      username: username,
      email: email,
      password: password,
      repeat_password: passwordConfirm,
    })
    const hash = bcrypt.hashSync(password, salt)
    // console.log(hash)
    const newUser = new Users({ username, email, password: hash })
    // const newArticle = new Article({
    //   title: "Titre de l'article",
    //   description: "description de l'article",
    //   date: "",
    //   tag: "#bonjour",
    //   qcm: true,
    // })
    // newArticle.save()
    newUser.save()
    res.json({ success: true, message: error })
  } catch (err) {
    res.json({ success: false, message: err.message })
    console.log(err.message)
  }
}
