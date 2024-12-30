import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import the CSS for Toastify
import './styles.css';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data } = await axios.get('http://localhost:5000/api/tasks');
      setTasks(data);
    };
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks([...tasks, data]);

      // Display success toast notification
      toast.success('Task added successfully!');
    } catch (error) {
      toast.error('Error adding task!');
    }
  };

  const updateTask = async (task) => {
    try {
      const { data } = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, task);
      setTasks(tasks.map((t) => (t._id === data._id ? data : t)));
    } catch (error) {
      toast.error('Error updating task!');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Error deleting task!');
    }
  };

  return (
    <div>
      <h1>
        <img
          src="/icon.png"
          alt="Blog Icon"
          style={{ width: '30px', height: '30px', marginRight: '10px' }}
        />
        Task Manager
      </h1>
      <div className="home-page">
        <h1>Assign Task</h1>
        <TaskForm addTask={addTask} />
      </div>
      <div>
        <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
      </div>
      <ToastContainer /> {/* This will render the toast notifications */}
    </div>
  );
};

export default HomePage;
