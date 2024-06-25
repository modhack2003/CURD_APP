import  { useState } from 'react';
import PropTypes from 'prop-types';
import { BsDatabaseFillAdd } from "react-icons/bs";


const AddTask = ({ handleLoading, darkTheme }) => {
  const [title, setTitle] = useState('');
  const [reps, setReps] = useState('');
  const [load, setLoad] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLoading(true);
    fetch('https://curd-g5va.onrender.com/api/tasks', {
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
        handleLoading(false);
      })
      .catch(error => {
        console.error('Error adding task:', error);
        handleLoading(false);
      });
  };

  const formClass = darkTheme ? 'dark' : 'light';

  return (
    <div className="flex justify-center items-center w-full  md:w-2/5 md order-3">
      <form
        className={`flex flex-col items-center justify-between gap-0 rounded-lg w-full h-auto max-w-[400px] p-5 m-5 ${formClass === 'dark' ? 'bg-[#1e1e1e] text-white shadow-dark-neumorphism' : 'bg-[#f4f4f4] text-black shadow-light-neumorphism'}`}
        onSubmit={handleSubmit}
      >
        <h1 className={`relative mb-5 text-base ${formClass === 'dark' ? 'text-white/80' : 'text-black/80'}`}>Task Form</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          required
          className={`w-11/12 p-2.5 focus:w-11/12    text-base border-none outline-none rounded-lg mb-2 ${formClass === 'dark' ? 'bg-[#2a2a2a] text-white placeholder-[#dcdcdc]' : 'bg-[#e0e0e0] text-black placeholder-black'} ${formClass === 'dark' ? 'shadow-dark-input' : 'shadow-light-input'}`}
        />
        <input
          type="number"
          value={reps}
          onChange={(e) => setReps(Number(e.target.value))}
          placeholder="Reps"
          required
          className={`w-11/12 p-2.5 focus:w-11/12    text-base border-none outline-none rounded-lg mb-2  ${formClass === 'dark' ? 'bg-[#2a2a2a] text-white placeholder-[#dcdcdc]' : 'bg-[#e0e0e0] text-black placeholder-black'} ${formClass === 'dark' ? 'shadow-dark-input' : 'shadow-light-input'}`}
        />
        <input
          type="number"
          value={load}
          onChange={(e) => setLoad(Number(e.target.value))}
          placeholder="Load"
          required
          className={`w-11/12 p-2.5 focus:w-11/12    text-base border-none outline-none rounded-lg mb-2 ${formClass === 'dark' ? 'bg-[#2a2a2a] text-white placeholder-[#dcdcdc]' : 'bg-[#e0e0e0] text-black placeholder-black'} ${formClass === 'dark' ? 'shadow-dark-input' : 'shadow-light-input'}`}
        />
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          required
          className={`w-11/12 p-2.5 focus:w-11/12    text-base border-none outline-none rounded-lg mb-2  ${formClass === 'dark' ? 'bg-[#2a2a2a] text-white placeholder-[#dcdcdc]' : 'bg-[#e0e0e0] text-black placeholder-black'} ${formClass === 'dark' ? 'shadow-dark-input' : 'shadow-light-input'}`}
        />
        <button type="submit" className={`p-2.5 text-center text-base rounded-lg  ${formClass === 'dark' ? 'bg-[#1e1e1e] text-[#198754] hover:text-white hover:bg-green-900 shadow-dark-button' : 'bg-[#f4f4f4] text-[#198754] shadow-light-button hover:bg-green-100'}`}>
          <BsDatabaseFillAdd className='task-icon' />
        </button>
      </form>
    </div>
  );
};

AddTask.propTypes = {
  handleLoading: PropTypes.func.isRequired,
  darkTheme: PropTypes.bool.isRequired,
};

export default AddTask;
