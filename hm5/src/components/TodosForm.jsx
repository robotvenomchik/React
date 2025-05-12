import React, { useState } from 'react';
import { Button } from './Button.jsx';
import { STATUS_CONFIG } from '../utils/statusConfig.js';

export function TodosForm({ onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = { title, status };
    try {
      const response = await fetch('https://680fc8ae27f2fdac240f60df.mockapi.io/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      const createdTask = await response.json();
      onTaskCreated(createdTask);
      setTitle('');
      setStatus(0);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Task Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            {Object.entries(STATUS_CONFIG)
              .filter(([_, config]) => config.formInclude)
              .map(([status, config]) => (
                <option key={status} value={status}>
                  {config.name}
                </option>
              ))}
          </select>
        </div>
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
}