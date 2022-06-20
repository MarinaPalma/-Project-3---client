import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import {Form, Button, InputGroup} from 'react-bootstrap';


import axios from 'axios';

function LoginPage() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);


  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handlePassword = (e) => setPassword(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { email, password };
    

    axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/auth/login`, body)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate(`/profile`);
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
<div className='center'>

<section id="contact">
      <div class="contact-container loginForm">
        <div class="contact-img">
          <img src="https://i.postimg.cc/1XvYM67V/restraunt2.jpg" alt="loginimage" />
        </div>

        <div class="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Login</h2>
          <input type="email" placeholder="E-mail" value={email} onChange={handleEmail}/>
          <input type="password" placeholder="Password"  value={password} onChange={handlePassword}/>
          <Button className="remove-brd" style={{ backgroundColor: "#068a9c"}} type="submit" name="password" >
    Login
  </Button>
          </form>
          <div className="loginformbtm center">
{errorMessage && <p className="error-message">{errorMessage}</p>}
    
     <p>Don't have an account?</p>
     <Link to="/signup"> Sign up</Link>
     </div>
     
        </div>
      </div>
    </section>


</div>


  );
}

export default LoginPage