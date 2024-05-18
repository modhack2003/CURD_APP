// components/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css'

const Signup = () => {
  
  const [email, setEmail] = useState('');
  const [name ,  setName]= useState('')
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      if (response.ok) {
        // Redirect to login or set user state
      } else {
        const data = await response.json();
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
  
       <div className="containers"> 
      <div className="signup-cards">
        <div className="signup-title">Sign Up</div>
        <div className="signup-subtitle">Create an account</div>
        <form onSubmit={handleSubmit}>
        <input
            type="name"
            placeholder="name"
            value={email}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="signup-btn">Sign Up</button> 
        </form>
        <p className="login">
          Already have an account? <Link to="/login" className="login-link">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
