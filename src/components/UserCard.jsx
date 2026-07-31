import React from 'react'
import axios from 'axios'
import { BASE_URL } from "../utils/constants"
import { useDispatch } from 'react-redux'
import { removeFeed } from "../utils/feedSlice"

const UserCard = ({ user }) => {
    const { firstName, lastName, photoUrl, age, gender, desc, _id } = user;
    const dispatch = useDispatch()

    const handleReceivedRequests = async (status, userId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/send/request/" + status + "/" + userId,
                {},
                { withCredentials: true }
            )
            dispatch(removeFeed(userId))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="card bg-base-200 w-96 shadow-xl m-4">
            <figure>
                <img
                    src={photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt="user" />
            </figure>
            <div className="card-body place-items-center">
                <h2 className="card-title">{firstName} {lastName}</h2>
                {user.age && gender && (<p>{user.age + " " + gender}</p>)}
                {user.desc && (<p>{desc}</p>)}
                <div className="card-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => { handleReceivedRequests("ignored", _id) }}
                    >
                        Ignore</button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => { handleReceivedRequests("interested", _id) }}>
                        Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard