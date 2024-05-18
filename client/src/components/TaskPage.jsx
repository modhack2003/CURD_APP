import { useState, useEffect } from 'react';
import LoadingBar from 'react-top-loading-bar';
import TaskList from './child/TaskList';
import AddTask from './child/AddTask';
import './TaskPage.css';

const TaskPage = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleLoading = (isLoading) => {
    setLoading(isLoading);
    if (isLoading) {
      setProgress(30); // Start the loading bar
    } else {
      setProgress(100); // Complete the loading bar
    }
  };

  useEffect(() => {
    if (!loading && progress === 100) {
      const timeout = setTimeout(() => setProgress(0), 500); // Reset the loading bar
      return () => clearTimeout(timeout);
    }
  }, [loading, progress]);

  return (
    <div className="task-page-container">
      <LoadingBar
        progress={progress}
        height={3}
        color="#f09"
        onLoaderFinished={() => setProgress(0)}
      />
      <h1 className="task-page-title">Task Manager</h1>
      <div className="task-content">
        <AddTask handleLoading={handleLoading} />
        <TaskList handleLoading={handleLoading} />
      </div>
    </div>
  );
};

export default TaskPage;
