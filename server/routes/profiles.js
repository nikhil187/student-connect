const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET /api/profiles - Get all student profiles
router.get('/', (req, res) => {
    db.all('SELECT * FROM students', [], (err, rows) => {
        if (err) {
            console.error('Error fetching students:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(200).json(rows);
    });
});

// GET /api/profiles/:id - Get a specific student profile
router.get('/:id', (req, res) => {
    db.get('SELECT * FROM students WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            console.error('Error fetching student:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!row) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json(row);
    });
});

// POST /api/profiles - Create a new student profile
router.post('/', (req, res) => {
    const { name, favoriteColor, favoriteFood } = req.body;

    // Validate required fields
    if (!name || !favoriteColor || !favoriteFood) {
        return res.status(400).json({ 
            error: 'Missing required fields: name, favoriteColor, and favoriteFood are required' 
        });
    }

    db.run(
        'INSERT INTO students (name, favoriteColor, favoriteFood) VALUES (?, ?, ?)',
        [name, favoriteColor, favoriteFood],
        function(err) {
            if (err) {
                console.error('Error creating student:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(201).json({ 
                id: this.lastID,
                message: 'Student profile created successfully' 
            });
        }
    );
});

// PUT /api/profiles/:id - Update entire student profile
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, favoriteColor, favoriteFood } = req.body;

    // Validate required fields
    if (!name || !favoriteColor || !favoriteFood) {
        return res.status(400).json({ 
            error: 'Missing required fields: name, favoriteColor, and favoriteFood are required' 
        });
    }

    db.run(
        'UPDATE students SET name = ?, favoriteColor = ?, favoriteFood = ? WHERE id = ?',
        [name, favoriteColor, favoriteFood, id],
        function(err) {
            if (err) {
                console.error('Error updating student:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: 'Student not found' });
            }
            res.status(200).json({ message: 'Student profile updated successfully' });
        }
    );
});

// PATCH /api/profiles/:id - Update partial student data
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        // Validate if there are any fields to update
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: 'No fields to update' });
        }

        // If updating likes, first get the current value
        if ('likes' in updates) {
            const row = await new Promise((resolve, reject) => {
                db.get('SELECT likes FROM students WHERE id = ?', [id], (err, row) => {
                    if (err) reject(err);
                    else resolve(row);
                });
            });

            if (!row) {
                return res.status(404).json({ error: 'Student not found' });
            }

            // Ensure likes is a number and not negative
            const currentLikes = row.likes || 0;
            updates.likes = Math.max(0, parseInt(updates.likes) || 0);
        }

        // Build update query dynamically based on provided fields
        const validFields = ['name', 'favoriteColor', 'favoriteFood', 'likes'];
        const updateFields = [];
        const updateValues = [];

        for (const [key, value] of Object.entries(updates)) {
            if (validFields.includes(key)) {
                updateFields.push(`${key} = ?`);
                updateValues.push(value);
            }
        }

        if (updateFields.length === 0) {
            return res.status(400).json({ error: 'No valid fields to update' });
        }

        // Add id to updateValues
        updateValues.push(id);

        // Update the profile
        await new Promise((resolve, reject) => {
            db.run(
                `UPDATE students SET ${updateFields.join(', ')} WHERE id = ?`,
                updateValues,
                function(err) {
                    if (err) reject(err);
                    else if (this.changes === 0) {
                        reject(new Error('Student not found'));
                    }
                    else resolve();
                }
            );
        });

        // Fetch and return the updated profile
        const updatedProfile = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM students WHERE id = ?', [id], (err, profile) => {
                if (err) reject(err);
                else resolve(profile);
            });
        });

        if (!updatedProfile) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json(updatedProfile);
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(err.message === 'Student not found' ? 404 : 500)
           .json({ error: err.message || 'Internal server error' });
    }
});

// DELETE /api/profiles/:id - Delete a student profile
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM students WHERE id = ?', [id], function(err) {
        if (err) {
            console.error('Error deleting student:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student profile deleted successfully' });
    });
});

module.exports = router; 