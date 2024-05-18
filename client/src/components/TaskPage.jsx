import React from 'react';
import TaskList from './child/TaskList';
import AddTask from './child/AddTask';
import './TaskPage.css';
const TaskPage = () => {
  return (
    <div>
    <div className="task-page-container" >
      <h1 className="task-page-title" >Task Manager</h1>
        <AddTask />
      <div className="task-list-container">
       <TaskList />
      </div>
    </div>
    </div>
  );
};

export default TaskPage;
