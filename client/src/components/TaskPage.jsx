import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import TaskList from './child/TaskList';
import AddTask from './child/AddTask';
import './TaskPage.css';

const TaskPage = () => {
  const [loading, setLoading] = useState(false);

  // Function to handle loading state
  const handleLoading = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div className="task-page-container">
      <LoadingBar
        progress={loading ? 40 : 0}
        height={3}
        color="yellow"
        onLoaderFinished={() => setLoading(false)}
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
