import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar">
      <div>
        <h1>🏥 Clinic Management System</h1>
        <p style={{ fontSize: '14px', marginTop: '5px', opacity: 0.9 }}>
          {user?.full_name} - {user?.role.toUpperCase()}
        </p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
