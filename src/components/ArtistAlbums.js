import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const clientId = 'd6b82abe11344c6c8c11b05d894e6386';
const clientSecret = '08661ac108fc4ea7a673509c77036c35';
const auth = 'Basic ' + btoa(clientId + ':' + clientSecret);

const fetchAlbums = async (artistName) => {
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Authorization': auth,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' })
  });

  const { access_token } = await tokenResponse.json();

  const artistResponse = await fetch(`https://api.spotify.com/v1/search?q=${artistName}&type=artist`, {
    headers: { 'Authorization': `Bearer ${access_token}` }
  });

  const artistData = await artistResponse.json();
  const artistId = artistData.artists.items[0]?.id;

  const albumsResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}/albums`, {
    headers: { 'Authorization': `Bearer ${access_token}` }
  });

  return albumsResponse.json();
};

function ArtistAlbums({ artistName }) {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (artistName) {
      fetchAlbums(artistName).then(data => {
        setAlbums(data.items);
      });
    }
  }, [artistName]);

  const handleSearchAgain = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Albums by {artistName}</h2>
      <Button onClick={handleSearchAgain} variant="secondary" className="mb-4">
        Search Again
      </Button>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {albums.map((album) => (
          <Col key={album.id}>
            <Card>
              <Card.Img variant="top" src={album.images[0]?.url} />
              <Card.Body>
                <Card.Title>{album.name}</Card.Title>
                <Card.Text>
                  Released: {album.release_date}
                </Card.Text>
                <Card.Link href={album.external_urls.spotify} target="_blank">Spotify</Card.Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ArtistAlbums;
