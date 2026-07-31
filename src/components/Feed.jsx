import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import {addFeed} from "../utils/feedSlice"
import UserCard from './UserCard'
const Feed = () => {
  const feed = useSelector((store) => store.feed)
  console.log(feed)
  const dispatch = useDispatch()

  const fetchFeedData = async () => {
    debugger
    if (feed?.length > 0) return
    try {
      debugger
      const res = await axios.get(BASE_URL + "/feed", {withCredentials:true})
      dispatch(addFeed(res.data))
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    debugger
    fetchFeedData()
  }, [])

  if(feed?.length === 0) return <h1 className='flex my-10 justify-center'>No New Users Found</h1>
  return (
    feed && (
    <div className='flex justify-center my-10 flex-wrap'>
     <UserCard user={feed[0]} />
    </div>
    )
  )
}

export default Feed