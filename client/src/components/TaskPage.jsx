import { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import TaskList from './child/TaskList';
import AddTask from './child/AddTask';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Nav from './Nav';

const TaskPage = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [darkTheme, setDarkTheme] = useState(true);

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
    if (isLoading) {
      setProgress(30);
    } else {
      setProgress(100);
    }
  };

  useEffect(() => {
    if (!loading && progress === 100) {
      const timeout = setTimeout(() => setProgress(0), 500);
      return () => clearTimeout(timeout);
    }
  }, [loading, progress]);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className={`${darkTheme ? 'bg-[#1E1E1E] text-white' : 'bg-white text-black'} min-h-screen w-full md:min-h-[120vh] lg:min-h-[210vh]`}>
      <LoadingBar
        progress={progress}
        height={3}
        color="#f09"
        onLoaderFinished={() => setProgress(0)}
      />
      <Nav darkTheme={darkTheme} />
      <div className="flex flex-col md:flex-row w-full h-auto">
        <AddTask handleLoading={handleLoading} darkTheme={darkTheme} />
        <TaskList handleLoading={handleLoading} darkTheme={darkTheme} />
      </div>
      <button 
        className={`absolute ${darkTheme ? 'text-white' : 'text-black'} top-[7vh] right-[5px] md:top-[-10vh] lg:top-[8vh] md:right-[10px] lg:right-[15px] w-[30px] md:w-[35px] lg:w-[40px] h-[30px] md:h-[35px] lg:h-[40px] rounded-full bg-transparent border-none cursor-pointer transition-all duration-300 ease-in-out`} 
        onClick={toggleTheme}
      >
        {darkTheme ? <MdLightMode size="100%" /> : <MdDarkMode size="100%" />}
      </button>
    </div>
  );
};

export default TaskPage;
