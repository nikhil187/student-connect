import React from 'react';
import { Card, Button } from 'react-bootstrap';

function ClassmateCard({ profile, onLike, onDelete, onEdit }) {
  return (
    <Card className="classmate-card h-100">
      <Card.Body>
        <Card.Title className="mb-3">{profile.name}</Card.Title>
        
        <div className="mb-2">
          <strong>Favorite Color:</strong> {profile.favoriteColor}
        </div>
        <div className="mb-2">
          <strong>Favorite Food:</strong> {profile.favoriteFood}
        </div>
        
        <div className="d-flex justify-content-between mt-3">
          <Button 
            variant="secondary" 
            size="sm" 
            onClick={() => onLike(profile.id)}
          >
            Like ({profile.likes})
          </Button>
          
          <div>
            <Button 
              variant="primary" 
              size="sm" 
              className="me-2"
              onClick={() => onEdit(profile)}
            >
              Edit
            </Button>
            <Button 
              variant="danger" 
              size="sm"
              onClick={() => onDelete(profile.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ClassmateCard;