import React from 'react';
import { useAuth } from '../context/AuthContext';

const RoleBasedDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      {user?.role === 'Admin' && <p>Admin Controls</p>}
      {user?.role === 'Editor' && <p>Content Editor Panel</p>}
      {user?.role === 'Viewer' && <p>Read-Only Reports</p>}
    </div>
  );
};

export default RoleBasedDashboard;