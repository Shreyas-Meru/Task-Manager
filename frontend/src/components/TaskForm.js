import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskForm = ({ addTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ title, description, priority, dueDate });
    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="date-priority-container">
        <div className="priority-dropdown">
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="date-picker-container">
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            dateFormat="dd/MM/yyyy"
          />
        </div>
      </div>
      <button className='sub_btn' type="submit">Add Task</button>
    </form> 
  );
};

export default TaskForm;
