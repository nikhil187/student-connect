import React, { useState } from 'react';
import { Table, Form, Button, InputGroup } from 'react-bootstrap';

function ProfileTable({ profiles, setProfiles, setEditingProfile, setShowForm }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter profiles based on search term
  const filteredProfiles = profiles.filter(profile => {
    const searchLower = searchTerm.toLowerCase();
    return (
      profile.name.toLowerCase().includes(searchLower) ||
      profile.favoriteColor.toLowerCase().includes(searchLower) ||
      profile.favoriteFood.toLowerCase().includes(searchLower)
    );
  });

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting to filtered profiles
  const sortedProfiles = React.useMemo(() => {
    let sortableProfiles = [...filteredProfiles];
    if (sortConfig.key) {
      sortableProfiles.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProfiles;
  }, [filteredProfiles, sortConfig]);

  // Helper function to get sort indicator
  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4">My Classmates</h2>
      
      <InputGroup className="mb-3">
        <InputGroup.Text>Search</InputGroup.Text>
        <Form.Control
          placeholder="Search by any field..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
      
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th onClick={() => requestSort('name')}>
                Name {getSortIndicator('name')}
              </th>
              <th onClick={() => requestSort('favoriteColor')}>
                Favorite Color {getSortIndicator('favoriteColor')}
              </th>
              <th onClick={() => requestSort('favoriteFood')}>
                Favorite Food {getSortIndicator('favoriteFood')}
              </th>
              <th onClick={() => requestSort('likes')}>
                Likes {getSortIndicator('likes')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProfiles.map(profile => (
              <tr key={profile.id}>
                <td>{profile.name}</td>
                <td>{profile.favoriteColor}</td>
                <td>{profile.favoriteFood}</td>
                <td>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={() => handleLike(profile.id)}
                  >
                    Like ({profile.likes})
                  </Button>
                </td>
                <td>
                  <Button 
                    variant="primary" 
                    size="sm" 
                    className="me-2"
                    onClick={() => handleEdit(profile)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDelete(profile.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default ProfileTable;