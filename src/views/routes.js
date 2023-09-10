import React from "react"
import HomePage from "../views/pages/homepage"
import Login from "../views/pages/auth/Login"
import Register from "./pages/auth/Register"
const Home = React.lazy(props => HomePage)


/* IF ANYONE CAN ACCESS THESE ROUTES */
export const publicRoute = [
  {
    path: "/login",
    display: true,
    exact: true,
    name: "Login",
    component: Login,
    className: ""
  },
  {
    path: "/register",
    display: true,
    exact: true,
    name: "Register",
    component: Register,
    className: ""
  },
]

/* IF USER IS LOGGED-IN THEN HE/SHE/TIKTOKER CAN'T ACCESS THESE ROUTES */
export const nonAuthRoutes = [
 
]

/* IF USER IS LOGGED-IN THEN HE/SHE/TIKTOKER CAN ACCESS THESE ROUTES */
export const authRoutes = [
  {
    path: "/",
    display: true,
    exact: true,
    name: "Home",
    component: HomePage,
    className: ""
  } 
]