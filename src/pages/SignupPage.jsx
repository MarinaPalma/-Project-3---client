import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" value={name} onChange={handleName} />


        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Already have an account?</p>
      <Link to="/login"> Login</Link>
    </div>
  );
}








export default SingupPage