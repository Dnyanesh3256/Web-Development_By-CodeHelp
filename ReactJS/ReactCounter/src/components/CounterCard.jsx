import React, { useState } from 'react'

import './CounterCard.css'

const CounterCard = () => {
    const[count, setCount] = useState(0)
  return (
    <div className='counterContainer'>
        <p id='para'>You have clicked {count} times</p>
        <button id='btn' onClick={ () => { setCount(count+1) } }>Click Me</button>
    </div>
  )
}

export default CounterCard