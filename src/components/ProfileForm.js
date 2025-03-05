import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';

function ProfileForm({ onSubmit, onCancel, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    favoriteColor: '',
    favoriteFood: ''
  });
  
  const [errors, setErrors] = useState({});

  // If editing, populate form with initial data
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.favoriteColor.trim()) {
      newErrors.favoriteColor = 'Favorite color is required';
    }
    
    if (!formData.favoriteFood.trim()) {
      newErrors.favoriteFood = 'Favorite food is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Container className="mb-4">
      <Row>
        <Col md={8} className="mx-auto">
          <Card className="shadow">
            <Card.Header as="h5">{initialData ? 'Edit Classmate' : 'Add New Classmate'}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Favorite Color</Form.Label>
                  <Form.Control
                    type="text"
                    name="favoriteColor"
                    value={formData.favoriteColor}
                    onChange={handleChange}
                    isInvalid={!!errors.favoriteColor}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.favoriteColor}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Favorite Food</Form.Label>
                  <Form.Control
                    type="text"
                    name="favoriteFood"
                    value={formData.favoriteFood}
                    onChange={handleChange}
                    isInvalid={!!errors.favoriteFood}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.favoriteFood}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="d-flex justify-content-end gap-2">
                  <Button variant="secondary" onClick={onCancel}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    {initialData ? 'Update Classmate' : 'Add Classmate'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfileForm;