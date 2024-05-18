// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Taskpage from './components/TaskPage';
import Nav from './components/Nav';

function App() {
  const [progress, setProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    
    setProgress(30);

    
    const timer = setTimeout(() => {
      setProgress(100);
    }, 500); 

    
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <LoadingBar
        progress={progress}
        height={4}
        color="yellow"
        onLoaderFinished={() => setProgress(0)}
        
      />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Task" element={<Taskpage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}


export default App;