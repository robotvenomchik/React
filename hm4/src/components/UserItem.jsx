import React, { useState } from 'react';
import UserForm from './UserForm';

function UserItem({ user, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (updatedData) => {
    onUpdate(user.id, updatedData);
    setIsEditing(false);
  };

  return (
    <div className="user-item" style={{ backgroundColor: user.color }}>
      {isEditing ? (
        <UserForm
          onSubmit={handleUpdate}
          initialData={user}
          buttonText="Update User"
        />
      ) : (
        <div className="user-item-content">
          <div>
            <strong>{user.name}</strong>
            <p>{user.email}</p>
          </div>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(user.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserItem;