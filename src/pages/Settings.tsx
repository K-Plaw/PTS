import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/styles.css'; // Import styles

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem('users') || '[]')
  );

  // Function to delete a single user
  const deleteUser = (username: string) => {
    const updatedUsers = users.filter((u: { username: string }) => u.username !== username);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    alert(`User ${username} deleted successfully.`);
  };

  // Function to delete all users
  const deleteAllUsers = () => {
    localStorage.setItem('users', JSON.stringify([]));
    setUsers([]);
    alert('All users deleted successfully.');
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      {user?.role === 'Admin' && (
        <div className="manage-users-section">
          <h2>Manage Users</h2>
          <button onClick={deleteAllUsers} className="delete-all-button">
            Delete All Users
          </button>
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: { username: string; role: string }) => (
                <tr key={u.username}>
                  <td>{u.username}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      onClick={() => deleteUser(u.username)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {user?.role !== 'Admin' && <p>You do not have access to manage users.</p>}
    </div>
  );
};

export default Settings;