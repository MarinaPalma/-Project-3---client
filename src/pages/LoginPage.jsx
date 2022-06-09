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
<div className="loginform">
    <h1 className="mt-3 mb-3 shadow-sm">Login</h1>
    <Form onSubmit={handleSubmit} style={{ width: '18rem', borderTop:"4px solid #d44a1e"}}  className="">
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className="text-end">Email </Form.Label>
    <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmail}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
    </Form.Group>

     <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" value={password} onChange={handlePassword}/>
   </Form.Group>
  <Button style={{ backgroundColor: "#068a9c"}} type="submit" name="password" >
    Login
  </Button>
    </Form>

    <div className="loginformbtm">
{errorMessage && <p className="error-message">{errorMessage}</p>}
    
     <p>Don't have an account?</p>
     <Link to="/signup"> Sign up</Link>
     </div>
     </div>

</div>








    // <div className="LoginPage">
    //   <h1>Login</h1>

    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="email">Email</label>
    //     <input type="text" name="email" value={email} onChange={handleEmail} />

    //     <label htmlFor="password">Password</label>
    //     <input type="password" name="password" value={password} onChange={handlePassword} />

    //     <button type="submit">Login</button>
    //   </form>

    //   {errorMessage && <p className="error-message">{errorMessage}</p>}
    //   <p>Don't have an account?</p>
    //   <Link to="/signup"> Sign up</Link>
    // </div>
  );
}

export default LoginPage