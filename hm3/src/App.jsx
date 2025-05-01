import { useState, useEffect } from 'react';
import './App.css';

function UserItem({ user, onUpdate, onDelete }) {
  const handleNameChange = (e) => {
    onUpdate(user.id, { ...user, name: e.target.value });
  };

  const handleMarriedChange = (e) => {
    onUpdate(user.id, { ...user, married: e.target.checked });
  };

  const renderNested = (obj, path = '') => {
    return Object.entries(obj).map(([key, value], index) => {
      const uniqueKey = `${user.id}-${path}${key}-${index}`;
      if (typeof value === 'object' && value !== null) {
        return (
          <div key={uniqueKey} className="ml-4">
            <strong>{key}:</strong>
            {renderNested(value, `${path}${key}-`)}
          </div>
        );
      }
      return (
        <div key={uniqueKey}>
          <strong>{key}:</strong> {String(value)}
        </div>
      );
    });
  };

  return (
    <div className="border p-4 mb-2 rounded">
      {renderNested(user)}
      <div className="mt-2">
        <label>
          Name:
          <input
            type="text"
            value={user.name || ''}
            onChange={handleNameChange}
            className="border ml-2 p-1"
          />
        </label>
        <label className="ml-4">
          Married:
          <input
            type="checkbox"
            checked={user.married || false}
            onChange={handleMarriedChange}
            className="ml-2"
          />
        </label>
        <button
          onClick={() => onDelete(user.id)}
          className="bg-red-500 text-white px-2 py-1 ml-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://680fc8ae27f2fdac240f60df.mockapi.io/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      console.log('Fetched users:', data);
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users');
      setLoading(false);
    }
  };

  const updateUser = async (id, updatedData) => {
    try {
      const response = await fetch(`https://680fc8ae27f2fdac240f60df.mockapi.io/users/${String(id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => (user.id === id ? updatedUser : user)));
        setError(null);
      } else {
        setError('Failed to update user');
      }
    } catch (err) {
      setError('Error updating user');
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`https://680fc8ae27f2fdac240f60df.mockapi.io/users/${String(id)}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setUsers(users.filter(user => user.id !== id));
        setError(null);
      } else {
        setError('Failed to delete user');
      }
    } catch (err) {
      setError('Error deleting user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {users.map(user => (
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