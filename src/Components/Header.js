import React from 'react'
import "../Assets/App.css"
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <div className='header w-100'>
        <Link to={"/"}>
            <h2 className='w-100'>Play n Pause</h2>
        </Link>
    </div>
  )
}

export default Header