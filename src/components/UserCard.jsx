import React from 'react'

const UserCard = ({user}) => {
    const { firstName, lastName, photoUrl, age, gender, desc } = user;
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
                <button className="btn btn-primary">Ignore</button>              
                <button className="btn btn-secondary">Interested</button> 
                </div>
            </div>
        </div>
    )
}

export default UserCard