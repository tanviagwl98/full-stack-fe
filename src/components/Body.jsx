import Navbar from "./Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
export default function Body() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}