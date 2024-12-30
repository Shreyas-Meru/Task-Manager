import React from 'react';
import { toast } from 'react-toastify'; // Import toast for notifications
import './TaskItem.css'; // Make sure to add appropriate styles for this component

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const handleStatusChange = () => {
    const updatedTask = { ...task, status: task.status === 'Pending' ? 'Completed' : 'Pending' };
    updateTask(updatedTask);
    
    // Show a notification after the status change
    if (updatedTask.status === 'Completed') {
      toast.success(`Task "${task.title}" marked as completed!`);
    } else {
      toast.info(`Task "${task.title}" reopened.`);
    }
  };

  const getStatusClass = () => {
    return task.status === 'Pending' ? 'pending' : 'completed';
  };

  const getPriorityClass = () => {
    switch (task.priority) {
      case 'High':
        return 'high-priority';
      case 'Medium':
        return 'medium-priority';
      default:
        return 'low-priority';
    }
  };

  const handleDelete = () => {
    deleteTask(task._id);
    // Show a notification after task deletion
    toast.error(`Task "${task.title}" has been deleted.`);
  };

  return (
    <div className={`task-item ${getStatusClass()}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <span className={`priority-badge ${getPriorityClass()}`}style={{ marginLeft: '2.5px' }}>{task.priority}</span>
      </div>

      <div className="task-details">
        <div className="task-info">
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="task-actions">
        <button onClick={handleStatusChange} className="status-btn">
          {task.status === 'Pending' ? (
            <span className="icon-check" />
          ) : (
            <span className="icon-reopen" />
          )}
          {task.status === 'Pending' ? 'Complete' : 'Reopen'}
        </button>
        <button onClick={handleDelete} className="delete-btn">
          <span className="icon-trash" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
