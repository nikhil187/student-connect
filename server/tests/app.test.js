const request = require('supertest');
const app = require('../app');
const db = require('../db/database');

// this is test data - we will use this to create new student
const testStudent = {
    name: 'John Smith',
    favoriteColor: 'Blue',
    favoriteFood: 'Pizza'
};

// before running tests, clear old data from database
beforeEach((done) => {
    db.run('DELETE FROM students', [], (err) => {
        if (err) return done(err);
        db.run('DELETE FROM sqlite_sequence WHERE name="students"', [], done);
    });
});

// after all tests finish, close database
afterAll((done) => {
    db.close(done);
});

describe('Testing Student API', () => {
    // check if server is running
    describe('GET /ping', () => {
        it('should return pong message', async () => {
            const res = await request(app).get('/ping');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('message', 'pong');
        });
    });

    // test getting all students
    describe('GET /api/profiles', () => {
        it('should return empty list when no students', async () => {
            const res = await request(app).get('/api/profiles');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual([]);
        });
    });

    // test creating new student
    describe('POST /api/profiles', () => {
        it('should create new student', async () => {
            const res = await request(app)
                .post('/api/profiles')
                .send(testStudent);
            
            expect(res.statusCode).toBe(201);
            expect(res.body).toHaveProperty('id');
        });
    });

    // test updating student details
    describe('PUT /api/profiles/:id', () => {
        it('should update student details', async () => {
            // first create a student
            const create = await request(app)
                .post('/api/profiles')
                .send(testStudent);

            // then update that student
            const res = await request(app)
                .put(`/api/profiles/${create.body.id}`)
                .send({
                    name: 'John Updated',
                    favoriteColor: 'Red',
                    favoriteFood: 'Burger'
                });

            expect(res.statusCode).toBe(200);
        });
    });

    // test updating likes
    describe('PATCH /api/profiles/:id', () => {
        it('should update student likes', async () => {
            // first create a student
            const create = await request(app)
                .post('/api/profiles')
                .send(testStudent);

            // then add one like
            const res = await request(app)
                .patch(`/api/profiles/${create.body.id}`)
                .send({ likes: 1 });

            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('likes', 1);
        });
    });

    // test deleting student
    describe('DELETE /api/profiles/:id', () => {
        it('should delete student', async () => {
            // first create a student
            const create = await request(app)
                .post('/api/profiles')
                .send(testStudent);

            // then delete that student
            const res = await request(app)
                .delete(`/api/profiles/${create.body.id}`);

            expect(res.statusCode).toBe(200);
        });
    });
});

// Alternate syntax and writeup
// https://www.testim.io/blog/supertest-how-to-test-apis-like-a-pro/