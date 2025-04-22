# Student Connect API Documentation

## Base URL
```
http://localhost:3000/api
```

## Endpoints

| Method | Endpoint | Description | Request Body | Success Response | Error Response |
|--------|----------|-------------|--------------|------------------|----------------|
| GET | `/profiles` | Get all student profiles | None | `200 OK` ```[{ id: 1, name: "...", favoriteColor: "...", favoriteFood: "...", likes: 0 }]``` | `500` Internal Server Error |
| GET | `/profiles/:id` | Get a specific student profile | None | `200 OK` ```{ id: 1, name: "...", favoriteColor: "...", favoriteFood: "...", likes: 0 }``` | `404` Not Found |
| POST | `/profiles` | Create a new student profile | ```{ name: "...", favoriteColor: "...", favoriteFood: "..." }``` | `201 Created` ```{ id: 1, message: "Student profile created successfully" }``` | `400` Bad Request |
| PUT | `/profiles/:id` | Update entire student profile | ```{ name: "...", favoriteColor: "...", favoriteFood: "..." }``` | `200 OK` ```{ message: "Student profile updated successfully" }``` | `404` Not Found |
| PATCH | `/profiles/:id` | Update partial student data | ```{ likes: 1 }``` | `200 OK` ```{ id: 1, name: "...", favoriteColor: "...", favoriteFood: "...", likes: 1 }``` | `404` Not Found |
| DELETE | `/profiles/:id` | Delete a student profile | None | `200 OK` ```{ message: "Student profile deleted successfully" }``` | `404` Not Found |

## Testing Instructions

### 1. Start the Backend Server
```bash
cd backend/expressjs-and-rest-nikhil187
npm install
npm start
```

### 2. Seed the Database
```bash
cd backend/expressjs-and-rest-nikhil187
node db/seed.js
```

### 3. Run Tests
```bash
cd backend/expressjs-and-rest-nikhil187
npm test
```

### 4. Postman Testing Steps

1. **GET All Profiles**
   - Method: GET
   - URL: `http://localhost:3000/api/profiles`
   - Take screenshot of response

2. **Create New Profile**
   - Method: POST
   - URL: `http://localhost:3000/api/profiles`
   - Body (raw JSON):
   ```json
   {
       "name": "Test Student",
       "favoriteColor": "Blue",
       "favoriteFood": "Pizza"
   }
   ```
   - Take screenshot of response

3. **Update Profile Likes**
   - Method: PATCH
   - URL: `http://localhost:3000/api/profiles/1`
   - Body (raw JSON):
   ```json
   {
       "likes": 1
   }
   ```
   - Take screenshot of response

4. **Delete Profile**
   - Method: DELETE
   - URL: `http://localhost:3000/api/profiles/1`
   - Take screenshot of response

## Data Schema

### Student Profile
```json
{
    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
    "name": "TEXT NOT NULL",
    "favoriteColor": "TEXT NOT NULL",
    "favoriteFood": "TEXT NOT NULL",
    "likes": "INTEGER DEFAULT 0"
}
```

## Error Handling

- `400` Bad Request: Missing required fields
- `404` Not Found: Resource doesn't exist
- `500` Internal Server Error: Database or server error

## Notes
- All responses are in JSON format
- Dates are in ISO 8601 format
- IDs are auto-generated integers
- Likes start at 0 and can only be non-negative 