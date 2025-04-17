import React from 'react'

import "./UserCard.css"

const UserCard = (props) => {
  return (
    <div className='userContainer' style={props.style}>
        <p id='userName'>{props.name}</p>
        <img id='userImage' src={props.image} alt={props.name} />
        <p id='userDesc'>{props.desc}</p>
    </div>
  )
}

export default UserCard