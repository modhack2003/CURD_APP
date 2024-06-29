import { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Home from './components/Home';
import TaskPage from './components/TaskPage';
import Navbar from './components/Nav';
import About from './components/About';

function App() {
  const [progress, setProgress] = useState(0);
  const [darkTheme, setDarkTheme] = useState(true);
  const [animateNavbar, setAnimateNavbar] = useState(true);
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
      <Navbar darkTheme={darkTheme} toggleTheme={toggleTheme} animateNavbar={animateNavbar}  />
      <Routes>
        <Route path="/" element={<Home darkTheme={darkTheme} toggleTheme={toggleTheme} setAnimateNavbar={setAnimateNavbar} />} />
        <Route path="/task" element={<TaskPage darkTheme={darkTheme} toggleTheme={toggleTheme} animateNavbar={animateNavbar} setAnimateNavbar={setAnimateNavbar}/>} />
        <Route path="/home" element={<Home darkTheme={darkTheme} toggleTheme={toggleTheme} setAnimateNavbar={setAnimateNavbar} />} />
        <Route path="/about" element={<About darkTheme={darkTheme} toggleTheme={toggleTheme} />} />
        <Route path="*" element={<Home darkTheme={darkTheme} toggleTheme={toggleTheme} />} />
      </Routes>
    </>
  );
}

export default App;
