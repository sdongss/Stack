import React from 'react'
import './index.css'
import {Link} from 'react-router-dom'
export default function StartUp() {
  return (
    <div className='start'>
        <Link to="/stack">Start App</Link>
    </div>
  )
}
