import React from 'react';
import { Navbar as BootstrapNavbar, Container, Button, ButtonGroup } from 'react-bootstrap';
import { Grid, CardList, PlusCircle } from 'react-bootstrap-icons';

function Navbar({ viewMode, setViewMode, showForm, setShowForm, setEditingProfile }) {
  const handleAddProfile = () => {
    setEditingProfile(null);
    setShowForm(!showForm);
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand href="#home">Student Connect</BootstrapNavbar.Brand>
        <div className="d-flex gap-3">
          <ButtonGroup>
            <Button 
              variant={viewMode === 'cards' ? 'primary' : 'outline-light'}
              onClick={() => setViewMode('cards')}
            >
              <CardList className="me-1" /> Cards
            </Button>
            <Button 
              variant={viewMode === 'table' ? 'primary' : 'outline-light'}
              onClick={() => setViewMode('table')}
            >
              <Grid className="me-1" /> Table
            </Button>
          </ButtonGroup>
          
          <Button 
            variant={showForm ? "danger" : "success"} 
            onClick={handleAddProfile}
          >
            <PlusCircle className="me-1" />
            {showForm ? 'Cancel' : 'Add Profile'}
          </Button>
        </div>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;