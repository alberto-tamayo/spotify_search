import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const VALID_USERNAME1 = 'n01408424';
const VALID_USERNAME2 = 'n01627827';
const VALID_PASSWORD = 'Humber';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      (username === VALID_USERNAME1 || username === VALID_USERNAME2) &&
      password === VALID_PASSWORD
    ) {
      onLogin();
      navigate('/');
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="bg-dark rounded p-4 text-light">
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        {error && <p className="text-danger">{error}</p>}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
