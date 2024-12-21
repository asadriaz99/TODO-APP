import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiEdit, FiTrash, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login'); // Redirect to login if token is not present
    } else {
      fetchTasks();
    }
  }, [token, navigate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: token },
      });
      setTasks(response.data);
    } catch (error) {
      alert('Failed to fetch tasks');
    }
  };

  const handleAddOrUpdateTask = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:5000/api/tasks/${editTaskId}`,
          { name, dueDate },
          { headers: { Authorization: token } }
        );
        setIsEditing(false);
        setEditTaskId(null);
      } else {
        await axios.post(
          'http://localhost:5000/api/tasks',
          { name, dueDate },
          { headers: { Authorization: token } }
        );
      }

      fetchTasks();
      setName('');
      setDueDate('');
    } catch (error) {
      alert(isEditing ? 'Failed to update task' : 'Failed to add task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: token },
      });
      fetchTasks();
    } catch (error) {
      alert('Failed to delete task');
    }
  };

  const handleEditTask = (task) => {
    setName(task.name);
    setDueDate(task.dueDate.split('T')[0]);
    setIsEditing(true);
    setEditTaskId(task._id);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Task Management</h2>

      <div className="mb-4 flex justify-end">
        <button
          onClick={handleLogout}
          className="flex items-center text-red-500 hover:text-red-700 font-semibold"
        >
          <FiLogOut className="w-5 h-5 mr-2" /> Logout
        </button>
      </div>

      <form
        onSubmit={handleAddOrUpdateTask}
        className="bg-gray-100 p-4 rounded-lg shadow-lg mb-8"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Task Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-md text-white ${
              isEditing ? 'bg-yellow-500' : 'bg-blue-500'
            } hover:opacity-90`}
          >
            {isEditing ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>

      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md"
          >
            <div>
              <p className="font-semibold text-lg">{task.name}</p>
              <p className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleEditTask(task)}
                className="text-blue-500 hover:text-blue-700"
              >
                <FiEdit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="text-red-500 hover:text-red-700"
              >
                <FiTrash className="w-5 h-5" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
