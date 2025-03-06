import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Heart, HeartFill, Pencil, Trash } from 'react-bootstrap-icons';
// Component to display an individual profile card
function ProfileCard({ profile, onLike, onDelete, onEdit }) {
  return (
    <Card className="h-100 shadow profile-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <Card.Title>{profile.name}</Card.Title>
          <Badge bg="info">{profile.year}</Badge>
        </div>
        <Card.Subtitle className="mb-2 text-muted">{profile.major}</Card.Subtitle>
        <Card.Text>{profile.bio}</Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <Button 
            variant="outline-danger" 
            size="sm" 
            onClick={() => onLike(profile.id)}// Handle like button click
            className="d-flex align-items-center gap-1"
          >
            {profile.likes > 0 ? <HeartFill /> : <Heart />}
            <span>{profile.likes}</span>
          </Button>
          
          <div>
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="me-2"
              onClick={() => onEdit(profile)} // Handle edit button click
            >
              <Pencil />
            </Button>
            <Button 
              variant="outline-danger" 
              size="sm"
              onClick={() => onDelete(profile.id)} // Handle delete button click
            >
              <Trash />
            </Button>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
}

export default ProfileCard;
