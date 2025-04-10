import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './ClassmatesList.css';

const ClassmatesList = ({ profiles, onDelete, onEdit, onLike }) => {
  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {profiles.map((profile) => (
        <Col key={profile.id}>
          <Card className="profile-card h-100">
            <Card.Body>
              <Card.Title>{profile.name}</Card.Title>
              <Card.Text>
                <p><strong>Favorite Color:</strong> {profile.favoriteColor}</p>
                <p><strong>Favorite Food:</strong> {profile.favoriteFood}</p>
                <p><strong>Likes:</strong> {profile.likes}</p>
              </Card.Text>
              <div className="d-flex justify-content-between">
                <Button variant="outline-primary" onClick={() => onLike(profile.id)}>
                  ❤️ Like
                </Button>
                <Button variant="outline-secondary" onClick={() => onEdit(profile)}>
                  ✏️ Edit
                </Button>
                <Button variant="outline-danger" onClick={() => onDelete(profile.id)}>
                  🗑️ Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ClassmatesList;