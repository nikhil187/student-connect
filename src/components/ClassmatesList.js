import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ClassmateCard from './ClassmateCard';

function ClassmatesList({ profiles, setProfiles, setEditingProfile, setShowForm }) {
  // Handle like functionality
  const handleLike = (id) => {
    setProfiles(profiles.map(profile => 
      profile.id === id ? { ...profile, likes: profile.likes + 1 } : profile
    ));
  };

  // Handle delete functionality
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this classmate?')) {
      setProfiles(profiles.filter(profile => profile.id !== id));
    }
  };

  // Handle edit functionality
  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setShowForm(true);
  };

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">My Classmates</h2>
      <Row>
        {profiles.map((profile) => (
          <Col key={profile.id} xs={12} md={6} lg={4} className="mb-4">
            <ClassmateCard
              profile={profile}
              onLike={handleLike}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ClassmatesList;