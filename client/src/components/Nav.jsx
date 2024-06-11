import { Link } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";
import PropTypes from "prop-types";
import './Nav.css'


const Nav = (darkTheme) => {
  const showSidebar = ()=> {
    const sidebar = document.querySelector('.sidebar');
    
    sidebar.style.display = 'flex'
    
  }
  const hideSidebar = ()=> {
    const sidebar = document.querySelector('.sidebar');
   
    sidebar.style.display = 'none'

  }
  
  const themeMode = darkTheme ? 'navbar light' : 'navbar dark'
  console.log(darkTheme ? 'navbar light' : 'navbar dark')
  console.log(darkTheme)
  return (
    <>
      <div className={themeMode}>
      <ul className='sidebar'>
      <li onClick={hideSidebar} className='close'><IoCloseSharp  className='close-icon'/>
      </li>
      <li >
          <Link to="/" className='a' >Home</Link>
        </li>
        <li>
          <Link to="/task"  className='a'>Task</Link>
        </li>
        <li>
          <Link to="http://localhost:4000/login"  className='a'>Login</Link>
        </li>
        <li>
          <Link to="http://localhost:4000/register"  className='a'>Signup</Link>
        </li>
        
      </ul>
      <ul>
        <li className='hideOnMobile' >
          <Link to="/" className='a' >Home</Link>
        </li>
        <li className='hideOnMobile'>
          <Link to="/task"  className='a'>Task</Link>
        </li>
        <li className='hideOnMobile'>
          <Link to="http://localhost:4000/login"  className='a'>Login</Link>
        </li>
        <li className='hideOnMobile'>
          <Link to="http://localhost:4000/register"  className='a'>Signup</Link>
        </li>
        <li className='menu' onClick={showSidebar}><RxHamburgerMenu  className='menu-icon'/></li>
      </ul>
      </div>
    </>
  );
};
Nav.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
};
export default Nav;
