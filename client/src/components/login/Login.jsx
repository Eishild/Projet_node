import React, { useState } from "react"
import { FaRegUser, FaLock } from "react-icons/fa"
import "./login.css"
import Logo from "../logo/Logo"
import { Link, Navigate, useNavigate } from "react-router-dom"

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate()

  const handlSubmit = () => {
    fetch("http://localhost:3001/auth/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.log && data.token) {
          localStorage.setItem("token", data.token)
          setIsAuthenticated(true)
          sessionStorage.setItem("auth", data.log)
          console.log("login success")
          navigate("/")
        } else {
          setMessage(data.message)
        }
        // console.log(data)
        // !data.log ? setMessage(data.message) : navigate("/")
      })
  }

  return (
    <div className="login-page">
      <div className="logo">
        <Logo />
      </div>
      <div className="input user-name">
        <label for="email">
          <FaRegUser />
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
        <label for="password">
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
      <div className="input submit">
        <input
          onClick={() => handlSubmit()}
          value={"CONNEXION"}
          type="submit"
        />
      </div>
      <p>
        Toujours pas inscrit ? <Link to={"/register"}>Enregistrez-vous </Link>
      </p>
      <p>{message}</p>
    </div>
  )
}

export default Login
