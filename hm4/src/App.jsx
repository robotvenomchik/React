import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm.jsx';
import UserItem from './components/UserItem.jsx';
import Filters from './components/Filters.jsx';
import service from './services/api.js';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const data = await service.get('users');
      setUsers(data);
      setFilteredUsers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    try {
      const newUser = await service.post('users', user);
      setUsers([...users, newUser]);
      setFilteredUsers([...users, newUser]);
      setError(null);
    } catch (err) {
      setError('Failed to create user');
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      const updatedUser = await service.put('users', id, updatedData);
      const newUsers = users.map((user) => (user.id === id ? updatedUser : user));
      setUsers(newUsers);
      setFilteredUsers(newUsers);
      setError(null);
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const deleteUser = async (id) => {
    try {
      await service.delete('users', id);
      const newUsers = users.filter((user) => user.id !== id);
      setUsers(newUsers);
      setFilteredUsers(newUsers);
      setError(null);
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleFilter = (filter) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSort = (sortType) => {
    let sorted = [...filteredUsers];
    if (sortType === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === 'name-desc') {
      sorted.sort((a, b) => b.name.localeCompare(b.name));
    } else if (sortType === 'email-asc') {
      sorted.sort((a, b) => a.email.localeCompare(b.email));
    } else if (sortType === 'email-desc') {
      sorted.sort((a, b) => b.email.localeCompare(b.email));
    }
    setFilteredUsers(sorted);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="app">
      <h1>User Management</h1>
      <UserForm onSubmit={addUser} />
      <Filters onFilter={handleFilter} onSort={handleSort} />
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      <div>
        {filteredUsers.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onUpdate={updateUser}
            onDelete={deleteUser}
          />
        ))}
      </div>
    </div>
  );
}

export default App;