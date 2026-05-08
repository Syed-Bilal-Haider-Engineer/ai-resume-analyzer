import React from 'react'
import { Link } from 'react-router';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
      <p className="text-2xl font-bold text-gradient">Resume</p>
      </Link>
       <Link to="/upload" className="primary-button w-fit">Upload</Link>
     </nav>
  )
}

export default Navbar
