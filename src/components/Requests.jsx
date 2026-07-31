import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from "../utils/requestSlice"

const Requests = () => {
        const requests = useSelector((store) => store.request)
        const dispatch = useDispatch()
        const fetchRequest = async () => {
            try {
                const res = await axios.get(BASE_URL + "/user/request/received", { withCredentials: true })
                dispatch(addRequest(res.data?.data))
            } catch (err) {
                console.log(err)
            }
        }

        const reviewRequest = async(status, id) => {
          try {
            const res = await axios.post(
              BASE_URL + "/request/review/" + status + "/" + id ,
              {},
               { withCredentials: true })
            dispatch(removeRequest(id))
        } catch (err) {
            console.log(err)
        }

        }
        useEffect(() => {
            fetchRequest()
        }, [])

        if (!requests) return
        if (requests.length === 0) return (<div>No Requests Found</div>)

        return (
            <div className='text-center my-10'>
                <h1 className='text-bold text-white text-4xl'>Requests</h1>
                <div className='my-8'>
                    {requests.length> 0 && requests.map((connection) => {
                        return (
                            <div key={connection._id} className="flex justify-between items-center p-4 my-4 border rounded-lg bg-base-300 w-2/3 mx-auto">
                                <div>
                                    <img alt="user" 
                                    className="w-20 h-20 rounded-full" 
                                    src={connection.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                                </div>
                                <div className='text-left mx-4'> 
                                    <h2 className='font-bold'>{connection.fromUserId?.firstName + " " + connection.fromUserId?.lastName}</h2>
                                    {connection.fromUserId?.age && connection.fromUserId?.gender && <p>{connection.fromUserId?.age + " " + connection.fromUserId?.gender}</p>}
                                    <p>About is missing</p>
                                </div>
                                <div className='mx-2 py-2'>
                                <button className="btn btn-primary m-2" onClick={() => {reviewRequest("rejected", connection._id)}}>Reject</button>
                                <button className="btn btn-secondary m-2" onClick={() => {reviewRequest("accepted", connection._id)}}>Accept</button>
                                </div>
                            </div>

                        )

                    })}
                </div>
            </div>
        )
    }

export default Requests