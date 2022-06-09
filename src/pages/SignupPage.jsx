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
<div className="loginform">
    <h1 className="mt-3 mb-3 shadow-sm">Sign up</h1>
    <Form onSubmit={handleSubmit} style={{ width: '18rem',  borderTop:"4px solid #d44a1e"}}  className="">
    <Form.Group className="mb-3" controlId="formBasicName">
    <Form.Label className="text-end">Name</Form.Label>
    <Form.Control type="text" placeholder="Enter your name" value={name} onChange={handleName}/>
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label className="text-end">Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter your email" value={email} onChange={handleEmail}/>
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
    </Form.Group>

     <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Enter your password" value={password} onChange={handlePassword}/>
   </Form.Group>
  <Button  style={{ backgroundColor: "#068a9c"}}  type="submit" name="password" >
    Sign up
  </Button>
    </Form>

    <div className="loginformbtm">
{errorMessage && <p className="error-message">{errorMessage}</p>}
    
    <p>Already have an account?</p>
      <Link to="/login"> Login</Link>
     </div>
     </div>

</div>



    // <div className="SignupPage">
    //   <h1>Sign Up</h1>

    //   <form onSubmit={handleSubmit}>
    //     <label htmlFor="name">Name</label>
    //     <input type="text" name="name" value={name} onChange={handleName} />


    //     <label htmlFor="email">Email</label>
    //     <input type="email" name="email" value={email} onChange={handleEmail} />

    //     <label htmlFor="password">Password</label>
    //     <input type="password" name="password" value={password} onChange={handlePassword} />

    //     <button type="submit">Sign Up</button>
    //   </form>

    //   {errorMessage && <p className="error-message">{errorMessage}</p>}
    //   <p>Already have an account?</p>
    //   <Link to="/login"> Login</Link>
    // </div>
  );
}








export default SingupPage