// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

const Nav = () => {
  return (
    <nav>
      <ul>
        <li >
          <Link to="/" className='a' >Home</Link>
        </li>
        <li>
          <Link to="/task"  className='a'>Task</Link>
        </li>
        <li>
          <Link to="/login"  className='a'>Login</Link>
        </li>
        <li>
          <Link to="/signup"  className='a'>Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
