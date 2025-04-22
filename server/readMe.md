# Student Connect Backend API

This is a simple backend API for Student Connect app. It helps manage student profiles.

## How to Run

1. First install all packages:
```bash
npm install
```

2. Create the database and add sample data:
```bash
node db/seed.js
```

3. Start the server:
```bash
npm start
```

The server will run at http://localhost:3000

## API Documentation

| HTTP Method | Usage Example | Description |
|------------|---------------|-------------|
| GET | `/api/profiles` | Retrieve all student profiles |
| GET | `/api/profiles/:id` | Retrieve a specific student profile |
| POST | `/api/profiles` | Create a new student profile |
| PUT | `/api/profiles/:id` | Update an entire student profile |
| PATCH | `/api/profiles/:id` | Update specific fields of a student profile |
| DELETE | `/api/profiles/:id` | Delete a student profile |

## Testing

To run tests:
```bash
npm test
```

## Database

We use SQLite3 for the database. The database file is created as `database.db`.

## Important Files

- `app.js` - Main server file
- `database.js` - Database setup
- `routes/profiles.js` - All API routes
- `db/seed.js` - Sample data
- `tests/app.test.js` - API tests