import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { MdPerson } from "react-icons/md";

const About = ({ darkTheme, toggleTheme }) => {



  // Effect to scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`about-container ${darkTheme ? "bg-[#1E1E1E] text-white" : "bg-white text-black"}  pt-24 h-[100vh]`}>
      {/* Profile Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Profile Image and Information */}
          <div className="flex ">
          <img
            src="https://avatars.githubusercontent.com/u/62688713?v=4"
            alt="Logo"
            className="h-36 mr-2 border-none rounded-3xl"
          />
            <div>
              <h2 className="text-3xl font-bold mb-4">Bikram Dey</h2>
              <p className="text-lg leading-relaxed">
                Hi there, I'm Bikram Dey! I'm a passionate cybersecurity enthusiast with a keen interest in programming. Currently learning AngularJS and CEH, and actively looking to collaborate on exciting projects. Ask me anything about computer networks!
              </p>
              <div className="mt-4 flex ">
                <a href="https://www.linkedin.com/in/bikram-dey-503975209" className="mr-4">
                  <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
                </a>
                <a href="https://twitter.com/Bikramdey2003" className="mr-4">
                  <img src="https://img.icons8.com/color/48/000000/twitter.png" alt="Twitter" className="w-8 h-8" />
                </a>
                <a href="mailto:bikram20031213@gmail.com" className="mr-4">
                  <img src="https://img.icons8.com/color/48/000000/gmail.png" alt="Email" className="w-8 h-8" />
                </a>
                <a href="https://www.facebook.com/bikram.dey.94849">
                  <img src="https://img.icons8.com/color/48/000000/facebook.png" alt="Facebook" className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>

          {/* GitHub Stats */}
          <div>
            <h2 className="text-3xl font-bold mb-4">GitHub Stats</h2>
            <img src="https://github-readme-stats.vercel.app/api?username=Modhack2003&theme=radical&hide_border=false&include_all_commits=false&count_private=false" alt="GitHub Stats" />
            <div className="mt-4">
              <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=Modhack2003&theme=radical&hide_border=false&include_all_commits=false&count_private=false&layout=compact" alt="Top Languages" />
            </div>
          </div>
        </div>
        <div className="thank-you flex justify-center text-3xl font-serif my-8 ">Thank you so much soumodip da & IEMLABS.. </div>
      </div>
    </div>
  );
};

About.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};

export default About;
