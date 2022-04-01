import React, { useEffect, useState } from "react"
import "./register.css"
import { FaRegUser, FaLock, FaEnvelope } from "react-icons/fa"
import Logo from "../logo/Logo"
import { Link, Navigate, useNavigate } from "react-router-dom"

// Formik

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const handlSubmit = () => {
    fetch("http://localhost:3001/auth/register", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, email, password, passwordConfirm }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        !data.success ? setMessage(data.message) : navigate("/login")
      })
  }

  return (
    <div className="register-page">
      <Logo />
      <div className="input user-name">
        <label htmlFor="username">
          <FaRegUser />
        </label>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div className="input user-name">
        <label htmlFor="email">
          <FaEnvelope />
        </label>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>
      <div className="input password">
        <label htmlFor="password">
          <FaLock />
        </label>
        <input
          type="password"
          placeholder="Mot de passe"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      <div className="input password">
        <label htmlFor="passwordConfirm">
          <FaLock />
        </label>
        <input
          type="password"
          placeholder="Confirmer mot de passe"
          name="passwordConfirm"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        />
      </div>

      <div className="input submit">
        <input type="submit" value="INSCRIPTION" onClick={handlSubmit} />
      </div>
      <p>
        Déjà inscrit ? <Link to={"/login"}>Connectez-vous </Link>
      </p>
      {message !== "" && <p>{message}</p>}
    </div>
  )
}

export default Register
