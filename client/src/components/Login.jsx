import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  return (
    <div className="main"> 
      <div className="cards">
        <div className="title">Login</div>
        <div className="subtitle">Welcome back!</div>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input" 
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input" 
          />
          <button type="submit" className="btn">Login</button> 
        </form>
        <p className="forgot">
          <Link to="/forgotpassword">Forgot password?</Link>
        </p>
        <p className="new">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
