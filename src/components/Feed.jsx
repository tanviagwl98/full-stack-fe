import React, { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from 'react-redux'
import {addFeed} from "../utils/feedSlice"
import UserCard from './UserCard'
const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()

  const fetchFeedData = async () => {
    if (feed) return
    try {
      const res = await axios.get(BASE_URL + "/feed", {withCredentials:true})
      dispatch(addFeed(res.data))
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchFeedData()
  }, [])

  return (
    feed && (
    <div className='flex justify-center my-10 flex-wrap'>
      {feed && feed.map((user) => <UserCard user={user}/>)}
        
    </div>
    )
  )
}

export default Feed