import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddTask.css';

const AddTask = ({ handleLoading }) => {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLoading(true); // Set loading to true when submitting data
    fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, reps, load, user_id: userId })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Task added:', data);
        setTitle('');
        setReps('');
        setLoad('');
        setUserId('');
        handleLoading(false); // Set loading to false after successful submission
      })
      .catch(error => {
        console.error('Error adding task:', error);
        handleLoading(false); // Set loading to false if there's an error
      });
  };

  return (
    <div className="add-task-container-child">
      <form className="add-task-form" onSubmit={handleSubmit}>
        <h1>Add Task</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
        />
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(Number(e.target.value))}
          placeholder="Reps"
          required
        />
        <input
          type="number"
          value={load}
          onChange={(e) => setLoad(Number(e.target.value))}
          placeholder="Load"
          required
        />
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          required
        />
        <button type="submit" className='task-btn'>Add Task</button>
      </form>
    </div>
  );
};

AddTask.propTypes = {
  handleLoading: PropTypes.func.isRequired,
};

export default AddTask;
