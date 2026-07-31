import React from 'react'
import EditProfile from './EditProfile'
import { useSelector } from 'react-redux'

const Profile = () => {
  const userData = useSelector((store) => store.user)
  console.log(userData)
  return (
    userData &&
    (<div><EditProfile userData={userData}/></div>)
  )
}

export default Profile