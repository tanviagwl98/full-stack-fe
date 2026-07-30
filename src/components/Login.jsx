import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
  const [email, setEmail] = useState("tanviagarwal@gmail.com")
  const [password, setPassword] = useState("Atwz@123")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const handleLogin = async() => {
    try{
      const res = await axios.post(BASE_URL + "/login",
        {
          email, password
        }, {withCredentials:true}
       )
    dispatch(addUser(res.data))
    return navigate("/")
    } catch(err){
      setError(err?.response?.data || "Something went wrong")
      console.log("Something went wrong")
    }

  }
  return (
    <div className='flex justify-center my-10'>
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className='label my-4'>
                <span className="label-text">Enter Email</span>
              </div>
              <input value={email} 
              type="text" 
              className="input input-bordered w-full max-w-xs"
              placeholder="Type here" 
              onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className='label my-4'>
                <span className="label-text">Enter Password</span>
              </div>
              <input 
              value={password} 
              type="text" 
              className="input input-bordered w-full max-w-xs" 
              placeholder="Type here" 
              onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <input />
          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={() => handleLogin()}>Login</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login