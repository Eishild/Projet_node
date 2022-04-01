import React, { useEffect, useState } from "react"
import Logo from "../logo/Logo"
import Header from "../header/Header"
import "./home.css"

const Home = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("")
  fetch("http://localhost:3001/auth/isUser", {
    method: "GET",
    headers: { "x-access-token": localStorage.getItem("auth") },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      // setUsername(data.usename)
      // console.log(username)
    })

  return (
    <div className="home-page">
      <Header setIsAuthenticated={setIsAuthenticated} />
      <p>Home page</p>
      <p>{username}</p>
    </div>
  )
}

export default Home
