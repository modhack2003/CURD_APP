import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";
import Navbar from "./Nav";
import PropTypes from "prop-types";

const Home = ({ darkTheme, toggleTheme, setAnimateNavbar }) => {
  const navigate = useNavigate();
  const [animateText, setAnimateText] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setAnimateNavbar(true);
    const typingDuration = 3000;
    const timeout = setTimeout(() => {
      setShowButton(true);
    }, typingDuration);

    return () => clearTimeout(timeout);
  }, [setAnimateNavbar]);

  const handleClick = () => {
    setAnimateText(true);
    setFadeOut(true);
    setAnimateNavbar(false);
    setTimeout(() => {
      navigate("/task");
    }, 1000);
  };

  return (
    <>
      
      <div
        className={`home-container ${
          darkTheme ? "bg-[#1E1E1E] text-white" : "bg-white text-black"
        } flex flex-col items-center justify-center h-screen overflow-hidden relative ${
          fadeOut ? "fade-out" : ""
        }`}
      >
        <div className={`retro-grid ${darkTheme ? "darkgrid" : ""}`}></div>
        <div className="glass-card flex flex-col items-center justify-center p-8 rounded-lg backdrop-blur-lg bg-white/10 border border-white/20 shadow-lg">
          <div
            className={`title-home z-10 relative text-6xl md:text-8xl font-bold pb-26 md:mb-4 gradient-text ${
              animateText ? "animate-text" : ""
            }`}
          >
            WELCOME
          </div>
          <div className={`typing-text-container ${darkTheme ? "text-white" : "text-black"} text-base sm:text-xl md:text-lg mb-2 md:mb-8`}>
            <TypeAnimation
              sequence={[
                "Welcome to our CRUD application!",
                1000,
                "Here, you can create",
                500,
                "Here, you can read,",
                500,
                "Here, you can update",
                500,
                "Here, you can delete tasks seamlessly.",
                500,
                "Enjoy a smooth and intuitive user experience",
                1000,
                "designed to boost your productivity.",
                1000,
              ]}
              wrapper="p"
              cursor={true}
              repeat={Infinity}
              style={{ display: "inline" }}
            />
          </div>
          {showButton && (
            <div className="button-container-home z-10 relative mt-2 md:mt-4 show">
              <button className="home-page-button pb-2 font-Roboto" onClick={handleClick}>
                Task
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Home.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  setAnimateNavbar: PropTypes.func.isRequired,
};

export default Home;
