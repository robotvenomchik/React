import React, { useState, useEffect, useRef } from 'react';

function UserForm({ onSubmit, initialData = {}, buttonText = 'Add User' }) {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    email: initialData.email || '',
    color: initialData.color || '#ffffff'
  });
  const nameRef = useRef(null);

  useEffect(() => {
    nameRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData.id) {
      setFormData({ name: '', email: '', color: '#ffffff' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <div>
        <label>Name:</label>
        <input
          ref={nameRef}
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Color:</label>
        <input
          type="color"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
      </div>
      <button type="submit">{buttonText}</button>
    </form>
  );
}

export default UserForm;