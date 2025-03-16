import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/styles.css'; // Import styles

const Profile: React.FC = () => {
  const { user } = useAuth();

  // Retrieve user data from local storage
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const currentUser = users.find((u: { username: string }) => u.username === user?.username);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {currentUser ? (
        <div className="profile-details">
          <p><strong>Role:</strong> {currentUser.role}</p>
          <p><strong>First Name:</strong> {currentUser.firstName}</p>
          <p><strong>Last Name:</strong> {currentUser.lastName}</p>
          <p><strong>Phone Number:</strong> {currentUser.phoneNumber}</p>
          <p><strong>Age:</strong> {currentUser.age}</p>
          <p><strong>Address:</strong> {currentUser.address}</p>
          <p><strong>Referral Code:</strong> {currentUser.referralCode}</p>
          <p><strong>Username:</strong> {currentUser.username}</p>
          <p><strong>Email:</strong> {currentUser.email}</p>
        </div>
      ) : (
        <p>No profile data found.</p>
      )}
    </div>
  );
};

export default Profile;