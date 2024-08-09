import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Logout({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="bg-dark rounded p-4 text-light">
      <h2>Logout</h2>
      <p>You have been logged out.</p>
      <Button onClick={handleLogout}>
        Return to Home
      </Button>
    </div>
  );
}

export default Logout;
