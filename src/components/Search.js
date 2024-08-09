import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Search({ onSearch }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError('Please enter an artist name.');
    } else {
      setError('');
      onSearch(name);
      navigate('/albums');
    }
  };

  return (
    <div className="bg-dark rounded p-4 text-light">
      <h2>Search for Artist</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formArtistName">
          <Form.Label>Artist Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter artist name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default Search;
