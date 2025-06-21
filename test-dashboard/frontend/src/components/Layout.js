import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const role = getUserRole();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <div style={{
  background: 'linear-gradient(90deg, #6366f1 60%, #4f46e5 100%)',
  color: '#fff',
  padding: '16px 32px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 12px rgba(99,102,241,0.08)'
}}>
        <h2 style={{ margin: 0 }}>🧪 Test Dashboard</h2>
        <div>
          <Link to="/tests" style={linkStyle}>Testler</Link>
          <Link to="/results" style={linkStyle}>Sonuçlarım</Link>
          {role === 'admin' && (
            <Link to="/admin/create-test" style={linkStyle}>+ Test Oluştur</Link>
          )}
          <button onClick={handleLogout} style={logoutStyle}>Çıkış</button>
        </div>
      </div>

      <div style={{ padding: 20 }}>
        {children}
      </div>
    </div>
  );
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  marginRight: 15
};

const logoutStyle = {
  backgroundColor: '#ff6666',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  cursor: 'pointer'
};

export default Layout;
