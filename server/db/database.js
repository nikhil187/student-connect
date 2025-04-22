const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Use in-memory database only if explicitly set
const useInMemory = process.env.USE_IN_MEMORY_DB === 'true';

// Use custom DB path if specified, otherwise use local directory
const dbPath = process.env.DB_PATH || __dirname;

// Make sure the directory exists
if (!useInMemory && !fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath, { recursive: true });
    console.log(`Created database directory: ${dbPath}`);
}

// Use test database if in test environment
const dbName = process.env.NODE_ENV === 'test' ? 'test.db' : 'students.db';
const dbFilePath = path.join(dbPath, dbName);

console.log(`Database path: ${useInMemory ? 'in-memory' : dbFilePath}`);

// Create a new database connection
const db = useInMemory 
    ? new sqlite3.Database(':memory:', (err) => {
        if (err) {
            console.error('Error opening in-memory database:', err);
        } else {
            console.log('Connected to the in-memory SQLite database.');
        }
    })
    : new sqlite3.Database(dbFilePath, (err) => {
        if (err) {
            console.error('Error opening database:', err);
        } else {
            console.log('Connected to the SQLite database.');
        }
    });

// Create students table
db.run(`
    CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        favoriteColor TEXT NOT NULL,
        favoriteFood TEXT NOT NULL,
        likes INTEGER DEFAULT 0
    )
`, (err) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Students table ready.');

        // Check if table is empty and add sample data if needed
        db.get('SELECT COUNT(*) as count FROM students', (err, result) => {
            if (err) {
                console.error('Error checking table:', err);
                return;
            }

            if (result.count === 0) {
                console.log('No data found, inserting sample data.');
                const sampleData = [
                    { name: 'John Doe', favoriteColor: 'Blue', favoriteFood: 'Pizza' },
                    { name: 'Jane Smith', favoriteColor: 'Green', favoriteFood: 'Sushi' },
                    { name: 'Bob Johnson', favoriteColor: 'Red', favoriteFood: 'Burgers' }
                ];

                const insertStmt = db.prepare('INSERT INTO students (name, favoriteColor, favoriteFood) VALUES (?, ?, ?)');
                sampleData.forEach(student => {
                    insertStmt.run(student.name, student.favoriteColor, student.favoriteFood);
                });
                insertStmt.finalize();
                console.log('Sample data inserted.');
            } else {
                console.log(`Database already contains ${result.count} student records.`);
            }
        });
    }
});

module.exports = db; 