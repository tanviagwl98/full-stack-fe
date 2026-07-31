import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserCard from './UserCard'
import { addUser } from "../utils/userSlice"
import { BASE_URL } from '../utils/constants'
import axios from 'axios'

const EditProfile = ({ userData }) => {
    const [firstName, setFirstName] = useState(userData.firstName || "")
    const [lastName, setLastName] = useState(userData.lastName || "")
    const [age, setAge] = useState(userData.age || "")
    const [gender, setGender] = useState(userData.gender || "")
    const [desc, setDesc] = useState(userData.desc || "")
    const [skills, setSkills] = useState(userData.skills || [])
    const [error, setError] = useState("")
    const [photoUrl, setPhotoUrl] = useState(userData.photoUrl || "")
    const [showToaster, setShowToaster] = useState(false)
    const dropdownRef = useRef(null)
    const dispatch = useDispatch()
    const handleSaveProfile = async () => {
        setError("")
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", { firstName, lastName, photoUrl, age, gender, desc }, { withCredentials: true })
            dispatch(addUser(res.data?.data))
            setShowToaster(true)
            setTimeout(() => {
                setShowToaster(false)
            }, 3000)
        } catch (err) {
            setError(err?.response?.data)
        }
    }

    const hanldeChangeGender = (value) => {
        setGender(value);
        dropdownRef.current?.removeAttribute("open")
    }
    return (
        <>
            {showToaster && <div className="toast toast-top toast-start">

                <div className="alert alert-success">
                    <span>Profile updated successfully.</span>
                </div>
            </div>}
            <div className='flex justify-center my-10'>
                <div className='flex justify-center mx-10'>
                    <div className="card card-border bg-base-300 w-96">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>
                            <div>
                                <label className="form-control w-full max-w-xs">
                                    <div className='label my-4'>
                                        <span className="label-text">First Name</span>
                                    </div>
                                    <input value={firstName}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                        placeholder="Type here"
                                        onChange={(e) => setFirstName(e.target.value)} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className='label my-4'>
                                        <span className="label-text">Last Name</span>
                                    </div>
                                    <input
                                        value={lastName}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                        placeholder="Type here"
                                        onChange={(e) => setLastName(e.target.value)} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className='label my-4'>
                                        <span className="label-text">Age</span>
                                    </div>
                                    <input value={age}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                        placeholder="Type here"
                                        onChange={(e) => setAge(e.target.value)} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className='label my-4'>
                                        <span className="label-text">Gender</span>
                                    </div>
                                    <div>
                                    <details ref={dropdownRef} className="dropdown w-full">
                                        <summary className="btn btn-outline w-full justify-between">{gender|| "Select Gender"}</summary>
                                        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-full shadow">
                                            <li className="border-b border-base-100 hover:bg-primary hover:text-primary-content rounded-md" onClick={() => hanldeChangeGender("male")}>male</li>
                                            <li className="border-b border-base-100 hover:bg-primary hover:text-primary-content rounded-md" onClick={() => hanldeChangeGender("female")}>female</li>
                                            <li className="border-b border-base-100 hover:bg-primary hover:text-primary-content rounded-md" onClick={() => hanldeChangeGender("others")}>others</li>
                                        </ul>
                                    </details>
                                    </div>
                                    {/* <input
                                        value={gender}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                        placeholder="Type here"
                                        onChange={(e) => setGender(e.target.value)} /> */}
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className='label my-4'>
                                        <span className="label-text">About</span>
                                    </div>
                                    <input value={desc}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                        placeholder="Type here"
                                        onChange={(e) => setDesc(e.target.value)} />
                                </label>
                                <label className="form-control w-full max-w-xs">
                                    <div className='label my-4'>
                                        <span className="label-text">Skills</span>
                                    </div>
                                    <input
                                        value={skills}
                                        type="text"
                                        className="input input-bordered w-full max-w-xs"
                                        placeholder="Type here"
                                        onChange={(e) => setSkills(e.target.value)} />
                                </label>

                            </div>
                            {error && (<p className='text-red-500'>{error}</p>)}
                            <div className="card-actions justify-center m-2">
                                <button className="btn btn-primary" onClick={() => handleSaveProfile()}>Save Profile</button>
                            </div>
                        </div>
                    </div>

                </div>
                <UserCard user={{ firstName, lastName, photoUrl, age, gender, desc, _id }} />
            </div>
        </>)
}

export default EditProfile