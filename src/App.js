import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import ClassmatesList from './components/ClassmatesList';
import ProfileForm from './components/ProfileForm';
import ProfileTable from './components/ProfileTable';
import api from './services/api';
import './components/ClassmatesList.css';

function App() {
  const [viewMode, setViewMode] = useState('cards');
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch profiles when component mounts
  useEffect(() => {
    fetchProfiles();
  }, []);

  // Fetch all profiles from API
  const fetchProfiles = async () => {
    try {
      setLoading(true);
      const data = await api.getAllProfiles();
      setProfiles(data);
      setError(null);
    } catch (err) {
      setError('Error fetching profiles. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission (add or update profile)
  const handleFormSubmit = async (profileData) => {
    try {
      if (editingProfile) {
        // Update existing profile
        await api.updateProfile(editingProfile.id, profileData);
      } else {
        // Add new profile
        await api.createProfile(profileData);
      }
      // Refresh profiles list
      await fetchProfiles();
      setShowForm(false);
      setEditingProfile(null);
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Error saving profile. Please try again.');
    }
  };

  // Handle profile deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this classmate?')) {
      try {
        await api.deleteProfile(id);
        await fetchProfiles();
      } catch (err) {
        console.error('Error deleting profile:', err);
        setError('Error deleting profile. Please try again.');
      }
    }
  };

  // Handle like functionality
  const handleLike = async (id) => {
    try {
      const profile = profiles.find(p => p.id === id);
      if (profile) {
        const currentLikes = profile.likes || 0;
        const updatedProfile = await api.patchProfile(id, { likes: currentLikes + 1 });
        // Update the profiles state with the new data
        setProfiles(profiles.map(p => p.id === id ? updatedProfile : p));
        setError(null);
      }
    } catch (err) {
      console.error('Error updating likes:', err);
      setError('Error updating likes. Please try again.');
    }
  };

  // Handle edit functionality
  const handleEdit = (profile) => {
    setEditingProfile(profile);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Student Connect</Navbar.Brand>
          <Nav className="me-auto">
            <Button 
              variant={viewMode === 'cards' ? 'light' : 'outline-light'} 
              onClick={() => setViewMode('cards')}
              className="me-2"
            >
              Cards View
            </Button>
            <Button 
              variant={viewMode === 'table' ? 'light' : 'outline-light'} 
              onClick={() => setViewMode('table')}
            >
              Table View
            </Button>
          </Nav>
          <Button 
            variant="light" 
            onClick={() => {
              setEditingProfile(null);
              setShowForm(true);
            }}
          >
            Add Classmate
          </Button>
        </Container>
      </Navbar>

      <Container className="mt-4">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <>
            {showForm && (
              <ProfileForm 
                initialData={editingProfile}
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProfile(null);
                }}
              />
            )}

            {viewMode === 'cards' ? (
              <ClassmatesList 
                profiles={profiles}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onLike={handleLike}
              />
            ) : (
              <ProfileTable 
                profiles={profiles}
                setProfiles={setProfiles}
                setEditingProfile={handleEdit}
                setShowForm={setShowForm}
              />
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default App;