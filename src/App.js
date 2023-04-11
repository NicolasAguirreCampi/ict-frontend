import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const API_BASE_URL = 'http://localhost:8000/api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ name: '', completed: false });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/get_list_of_tasks`, { params: filters });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
    setLoading(false);
  };

  const createTask = async (taskData) => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/task`, taskData);
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
    setLoading(false);
  };

  const updateTask = async (id, taskData) => {
    setLoading(true);
    try {
      await axios.put(`${API_BASE_URL}/task/${id}`, taskData);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
    setLoading(false);
  };

  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/task/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editing) {
      updateTask(task.id, task);
    } else {
      createTask(task);
    }
    setTask({ name: '', completed: false });
    setEditing(false);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (name === 'completed' && value === '') {
        delete newFilters.completed;
      } else {
        newFilters[name] = value;
      }

      return newFilters;
    });
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>

      <TaskForm
        task={task}
        editing={editing}
        onSubmit={(taskData) => {
          if (editing) {
            updateTask(task.id, taskData);
          } else {
            createTask(taskData);
          }
          setTask({ name: '', completed: false });
          setEditing(false);
        }}
        onChange={setTask}
      />

      <h2>Filter Tasks</h2>
      <div>
        <label>
          Name:
          <input type="text" name="name" onChange={handleFilterChange} />
        </label>
        <label>
          Completed:
          <select name="completed" onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="true">Completed</option>
          </select>
        </label>
      </div>

      <h2>Task List</h2>
        {
          loading ? (
            <p>Loading tasks...</p>
          ) : (
            <TaskList tasks={tasks} onEdit={(task) => { setTask(task); setEditing(true); }} onDelete={(id) => deleteTask(id)} />
          )
        }
     </div>
   );
 }
 
 export default App;
 