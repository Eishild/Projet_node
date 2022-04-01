import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import "./App.css"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import React, { useEffect, useState } from "react"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("auth") || false
  )

  // useEffect(() => {
  //   setIsAuthenticated(sessionStorage.getItem("auth"))
  // }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              !isAuthenticated ? (
                <Navigate to="/login" />
              ) : (
                <Home setIsAuthenticated={setIsAuthenticated} />
              )
            }
          />

          {/* <PrivateRoute
            path="/"
            isAuthenticated={isAuthenticated}
            component={<Home />}
          /> */}
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
