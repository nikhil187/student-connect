import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import ClassmatesList from './components/ClassmatesList';
import ProfileForm from './components/ProfileForm';
import ProfileTable from './components/ProfileTable';
import './components/ClassmatesList.css';

function App() {
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);
  const [profiles, setProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem('profiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [
      {
        id: 1,
        name: "Nikhil Shetty",
        favoriteColor: "Blue",
        favoriteFood: "Pizza",
        likes: 0
      },
      {
        id: 2,
        name: "Mehak",
        favoriteColor: "Green",
        favoriteFood: "Sushi",
        likes: 0
      },
      {
        id: 3,
        name: "Daniel",
        favoriteColor: "Red",
        favoriteFood: "Burger",
        likes: 0
      }
    ];
  });

  // Save profiles to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('profiles', JSON.stringify(profiles));
  }, [profiles]);

  // Handle form submission (add or update profile)
  const handleFormSubmit = (profileData) => {
    if (editingProfile) {
      // Update existing profile
      setProfiles(profiles.map(profile => 
        profile.id === editingProfile.id ? { ...profileData, id: profile.id, likes: profile.likes } : profile
      ));
    } else {
      // Add new profile
      const newProfile = {
        ...profileData,
        id: Date.now(),
        likes: 0
      };
      setProfiles([...profiles, newProfile]);
    }
    setShowForm(false);
    setEditingProfile(null);
  };

  return (
    <div className="app-container">
      <Navbar bg="dark" variant="dark" expand="lg" className="navbar">
        <Container>
          <Navbar.Brand href="#home">Student-Connect</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button 
                variant={viewMode === 'cards' ? 'primary' : 'outline-light'}
                onClick={() => setViewMode('cards')}
                className="me-2"
              >
                Cards View
              </Button>
              <Button 
                variant={viewMode === 'table' ? 'primary' : 'outline-light'}
                onClick={() => setViewMode('table')}
                className="me-2"
              >
                Table View
              </Button>
              <Button 
                variant={showForm ? "danger" : "success"} 
                onClick={() => {
                  setEditingProfile(null);
                  setShowForm(!showForm);
                }}
              >
                {showForm ? 'Cancel' : 'Add Classmate'}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container>
        {showForm && (
          <ProfileForm 
            onSubmit={handleFormSubmit} 
            onCancel={() => {
              setShowForm(false);
              setEditingProfile(null);
            }}
            initialData={editingProfile}
          />
        )}

        {viewMode === 'cards' ? (
          <ClassmatesList 
            profiles={profiles}
            setProfiles={setProfiles}
            setEditingProfile={setEditingProfile}
            setShowForm={setShowForm}
          />
        ) : (
          <ProfileTable 
            profiles={profiles}
            setProfiles={setProfiles}
            setEditingProfile={setEditingProfile}
            setShowForm={setShowForm}
          />
        )}
      </Container>
    </div>
  );
}

export default App;