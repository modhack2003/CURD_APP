import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import PropTypes from 'prop-types';


const Navbar = ({ darkTheme, toggleTheme, animateNavbar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [slideDown, setSlideDown] = useState(false);
  const [slideUp, setSlideUp] = useState(false);

  useEffect(() => {
    if (animateNavbar !== undefined) {
      if (animateNavbar) {
        setSlideDown(true);
        setSlideUp(false);
      } else {
        setSlideUp(true);
        setSlideDown(false);
      }
    }
  }, [animateNavbar]);

  return (
    <nav className={`w-full p-4 fixed z-10 top-0 transition-transform duration-300 ${slideDown ? 'navbar-slide-down' : ''} ${slideUp ? 'navbar-slide-up' : ''} ${darkTheme ? 'bg-[#1E1E1E]' : 'bg-white'} bg-opacity-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-3xl border border-gray-500`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://avatars.githubusercontent.com/u/62688713?v=4"
            alt="Logo"
            className="h-12 mr-2 border-none rounded-full"
          />
        </div>

        <div className="hidden md:flex md:space-x-10">
          <Link to="/" className={`${darkTheme ? "text-white" : "text-black"} dark:text-white text-3xl block mt-4 md:inline-block md:mt-0`}>
            Home
          </Link>
          <Link to="/task" className={`${darkTheme ? "text-white" : "text-black"} dark:text-white text-3xl block mt-4 md:inline-block md:mt-0`}>
            Tasks
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <Link to="/about" className={`${darkTheme ? "text-white" : "text-black"} dark:text-white block mt-4 md:inline-block md:mt-0`}>
              About
            </Link>
          </div>
          <button onClick={toggleTheme} className={`${darkTheme ? "text-white" : "text-black"} focus:outline-none`}>
            {darkTheme ? <MdLightMode size="24" /> : <MdDarkMode size="24" />}
          </button>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)} className={`${darkTheme ? "text-white" : "text-black"} focus:outline-none`}>
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className={`fixed inset-0 bg-gray-800 bg-opacity-90 backdrop-blur-lg flex flex-col items-center justify-center h-[100vh] z-20 space-y-16`}>
          <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white focus:outline-none">
            <FiX className="h-8 w-8" />
          </button>
          <Link to="/" onClick={() => setIsOpen(false)} className="text-white text-5xl mb-8">
            Home
          </Link>
          <Link to="/task" onClick={() => setIsOpen(false)} className="text-white text-5xl mb-8">
            Tasks
          </Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="text-white text-5xl mb-16">
            About
          </Link>
        </div>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  animateNavbar: PropTypes.bool.isRequired,
};

export default Navbar;
