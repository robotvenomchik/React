import React, { useState, useEffect } from 'react';
import { TodosForm } from './components/TodosForm.jsx';
import { TodosLists } from './components/TodosLists.jsx';

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://680fc8ae27f2fdac240f60df.mockapi.io/tasks')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleStatusChange = (taskId, newStatus, originalStatus) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleArchive = (taskId, rollback = false) => {
    if (rollback) {
      fetch('https://680fc8ae27f2fdac240f60df.mockapi.io/tasks')
        .then(response => response.json())
        .then(data => setTasks(data));
    } else {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    }
  };

  const handleTaskCreated = (newTask) => {
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Task Board</h1>
      <TodosForm onTaskCreated={handleTaskCreated} />
      <TodosLists
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onArchive={handleArchive}
      />
    </div>
  );
}