import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function HomePage() {
  return (
    <div>
    <Navbar/>
    <h1>Logotipo</h1>
    <h2>Find the best tascas in Portugal</h2>
     {/* <Link to="/signup"><button>Sign up</button></Link>
    <Link to="/login"><button>Login</button></Link> */}
    </div>
  )
}

export default HomePage