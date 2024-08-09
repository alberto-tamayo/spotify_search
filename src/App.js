import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import Search from './components/Search';
import ArtistAlbums from './components/ArtistAlbums';
import Login from './components/Login';
import Logout from './components/Logout';
import './App.css';

function App() {
  const [artistName, setArtistName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
        <Navbar.Brand as={Link} to="/">
          <img 
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Primary_Logo_RGB_White.png" 
            alt="Spotify Logo" 
            className="spotify-logo" 
          />
          Spotify Search
        </Navbar.Brand>
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
          ) : (
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
          )}
        </Nav>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Search onSearch={setArtistName} /> : <Navigate to="/login" />} />
          <Route path="/albums" element={isAuthenticated ? <ArtistAlbums artistName={artistName} /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="/logout" element={<Logout onLogout={logout} />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
