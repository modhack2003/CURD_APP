import { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import TaskList from './child/TaskList';
import AddTask from './child/AddTask';
import './TaskPage.css'
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
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

  // Function to toggle theme
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  return (
    <div className={darkTheme ? 'task-page-container dark' : 'task-page-container light'}>
      <LoadingBar
        progress={progress}
        height={3}
        color="#f09"
        onLoaderFinished={() => setProgress(0)}
      />
      <Nav darkTheme={darkTheme}/>      
      <div className="task-content">
        
        <AddTask handleLoading={handleLoading} darkTheme={darkTheme} />
        <TaskList handleLoading={handleLoading} darkTheme={darkTheme} />
      </div>
      
      <button className={darkTheme?"theme-toggle-button dark":"theme-toggle-button light"} onClick={toggleTheme}>
        {darkTheme ? <MdLightMode/> : <MdDarkMode/>} 
      </button>     
    </div>
  );
};

export default TaskPage;
