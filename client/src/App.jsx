import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Home from './components/Home';
import TaskPage from './components/TaskPage';


function App() {
  const [progress, setProgress] = useState(0);
  const [darkTheme, setDarkTheme] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setProgress(30);
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500); 

    return () => clearTimeout(timer);
  }, [location]);
  
  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
    
  };
 
  return (
    <>
      <LoadingBar
        progress={progress}
        height={4}
        color="yellow"
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route path="/" element={<Home darkTheme={darkTheme} toggleTheme={toggleTheme} />} />
        <Route path="/task" element={<TaskPage darkTheme={darkTheme} toggleTheme={toggleTheme} />} />
        <Route path="/home" element={<Home darkTheme={darkTheme} toggleTheme={toggleTheme} />} />
        <Route path="*" element={<Home darkTheme={darkTheme} toggleTheme={toggleTheme} />} />
      </Routes>
    </>
  );
}

export default App;
