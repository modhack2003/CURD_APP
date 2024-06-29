import { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import TaskList from './child/TaskList';
import AddTask from './child/AddTask';
import PropTypes from 'prop-types';
import Navbar from './Nav';

const TaskPage = ({ darkTheme, toggleTheme, setAnimateNavbar }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setAnimateNavbar(true);
  }, [setAnimateNavbar]);

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
    if (isLoading) {
      setProgress(30);
    } else {
      setProgress(100);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!loading && progress === 100) {
      const timeout = setTimeout(() => setProgress(0), 500);
      return () => clearTimeout(timeout);
    }
  }, [loading, progress]);

  return (
    <div className={`${darkTheme ? 'bg-[#1E1E1E] text-white' : 'bg-white text-black'} mt-0 pt-32 min-h-screen w-full md:min-h-[120vh] lg:min-h-[210vh] transition-colors duration-300`}>
      <LoadingBar
        progress={progress}
        height={4}
        color="#f09"
        onLoaderFinished={() => setProgress(0)}
      />
      
      <div className="flex flex-col md:flex-row w-full h-auto">
        <AddTask handleLoading={handleLoading} darkTheme={darkTheme} />
        <TaskList handleLoading={handleLoading} darkTheme={darkTheme} />
      </div>
    </div>
  );
};

TaskPage.propTypes = {
  darkTheme: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  setAnimateNavbar: PropTypes.func.isRequired,
  animateNavbar: PropTypes.bool.isRequired,
};

export default TaskPage;
