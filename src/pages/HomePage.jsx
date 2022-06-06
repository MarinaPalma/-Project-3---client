import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  return (
    <div>
    <h1>Welcome to Taskas!</h1>
     <Link to="/signup"><button>Sign up</button></Link>
    <Link to="/login"><button>Login</button></Link>
    </div>
  )
}

export default HomePage