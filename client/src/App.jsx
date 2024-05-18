import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Taskpage from './components/TaskPage';
import Nav from './components/Nav';

function App() {
  const [progress, setProgress] = useState(0);
  const [showLoadingBar, setShowLoadingBar] = useState(false);

  // Listen to route changes and update loading progress
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoadingBar(false);
      console.log("hello")
    }, 1500); // You can adjust the duration of the loading bar

    return () => clearTimeout(timeout);
  }, []); // useEffect runs only once, no dependencies needed

  return (
    <Router> {/* Wrap your entire component tree with Router */}
      <LoadingBar
        progress={progress}
        height={3}
        color="yellow"
        onLoaderFinished={() => setProgress(0)}
        loaderSpeed={1000}
        show={showLoadingBar}
      />
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Task" element={<Taskpage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
