import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';  // Import the CSS file if it's not already imported

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <div className="list-head"> <h1>Assiged Tasks</h1>
      <div className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task._id} task={task} updateTask={updateTask} deleteTask={deleteTask} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;