import React from "react"
import Logo from "../logo/Logo"
import "./header.css"

const header = ({ setIsAuthenticated }) => {
  const handleLogout = () => {
    setIsAuthenticated(false)
    sessionStorage.setItem("auth", false)
    //remove uniquement le token dans le local storage
    localStorage.removeItem("token")
    //si je veux clear tout le local storage
    // localStorage.clear()
  }
  return (
    <div className="header">
      <div className="logo">
        <Logo />
      </div>
      <div>
        <p onClick={() => handleLogout()}>Deconnexion</p>
      </div>
    </div>
  )
}

export default header
