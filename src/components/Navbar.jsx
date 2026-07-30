import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import axios from "axios"
import { removeUser } from "../utils/userSlice"

export default function Navbar() {
  const user = useSelector((store) => store.user)
  console.log(user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = async() =>{
    debugger
    try{
      const res = await axios.post(BASE_URL + "/logout", {}, {withCredentials:true})
      dispatch(removeUser())
      return navigate("/login")

    } catch(err){
      console.log("Something went wrong")
    }
  }
  return (
    <div className="navbar bg-base-300 shadow-sm">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">👩🏻‍💻 Matching Developers</Link>
  </div>
  <div className="flex gap-2">
    {user && 
    <div className="flex dropdown dropdown-end mx-5 item-center">
      <div className="my-2 mx-2">Welcome, {user.firstName}</div>
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
      </div>
    </div>
    <ul
      tabIndex="-1"
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
      <li>
        <Link to="/Profile" className="justify-between">
          Profile
          <span className="badge">New</span>
        </Link>
      </li>
      <li><a>Settings</a></li>
      <li><a onClick={() => {handleLogout()}}>Logout</a></li>
    </ul>
  </div>
    }
    
  </div>
</div>
)
}