import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Form, Button, InputGroup} from 'react-bootstrap';

function SingupPage() {

  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);


  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { name, email, password };
    
    axios
      .post(`${process.env.REACT_APP_BASE_API_URL}/auth/signup`, body)
      .then(() => {
        navigate('/login');
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
          <img src="https://i.postimg.cc/1XvYM67V/restraunt2.jpg" alt="signupimage" />
        </div>

        <div class="form-container">
        <form onSubmit={handleSubmit}>
          <h2 className="title">Signup</h2>
          <input  value={name} onChange={handleName} type="text" placeholder="Your name" />
          <input type="email" placeholder="E-mail" value={email} onChange={handleEmail}/>
          <input type="password" placeholder="Password"  value={password} onChange={handlePassword}/>
          <Button className="remove-brd" style={{ backgroundColor: "#068a9c"}} type="submit" name="password" >
    Signup
  </Button>
          </form>
          <div className="loginformbtm center">
{errorMessage && <p className="error-message">{errorMessage}</p>}
    
     <p>Already have an account?</p>
     <Link to="/login"> <p>Login</p></Link>
     </div>
     
        </div>
      </div>
    </section>

</div>


  
  );
}








export default SingupPage