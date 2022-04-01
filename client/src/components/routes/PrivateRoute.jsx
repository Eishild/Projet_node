import { Route, Navigate } from "react-router-dom"

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  // <Route path="/login" element={isLogin ? <Navigate to="/" /> : <Login />}/>
  return (
    <Route
      render={() =>
        isAuthenticated ? <Component {...rest} /> : <Navigate to={"/login"} />
      }
    />
  )
}

export default PrivateRoute
