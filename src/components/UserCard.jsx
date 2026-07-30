import React from 'react'

const UserCard = ({user}) => {
    return (
        <div className="card bg-base-100 w-96 shadow-xl m-4">
            <figure>
                <img
                    src={user.photoUrl || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt="user" />
            </figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{user.firstName} {user.lastName}</h2>
                {user.age && user.gender && (<p>{user.age + " " + user.gender}</p>)}
                <div className="card-actions justify-center">
                <button className="btn btn-primary">Ignore</button>              
                <button className="btn btn-secondary">Interested</button> 
                </div>
            </div>
        </div>
    )
}

export default UserCard