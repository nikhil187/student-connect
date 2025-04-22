const db = require('./database');

// Seed data with diverse and realistic student profiles
const seedData = [
    {
        name: 'Sarah Johnson',
        favoriteColor: 'Turquoise',
        favoriteFood: 'Sushi',
        likes: 15
    },
    {
        name: 'Michael Chen',
        favoriteColor: 'Navy Blue',
        favoriteFood: 'Dim Sum',
        likes: 12
    },
    {
        name: 'Priya Patel',
        favoriteColor: 'Purple',
        favoriteFood: 'Butter Chicken',
        likes: 18
    },
    {
        name: 'James Wilson',
        favoriteColor: 'Forest Green',
        favoriteFood: 'BBQ Ribs',
        likes: 8
    },
    {
        name: 'Sofia Rodriguez',
        favoriteColor: 'Coral Pink',
        favoriteFood: 'Tacos al Pastor',
        likes: 21
    },
    {
        name: 'Ahmed Hassan',
        favoriteColor: 'Deep Red',
        favoriteFood: 'Shawarma',
        likes: 14
    },
    {
        name: 'Emma Thompson',
        favoriteColor: 'Lavender',
        favoriteFood: 'Fish and Chips',
        likes: 11
    },
    {
        name: 'Lucas Silva',
        favoriteColor: 'Ocean Blue',
        favoriteFood: 'Feijoada',
        likes: 16
    },
    {
        name: 'Yuki Tanaka',
        favoriteColor: 'Sakura Pink',
        favoriteFood: 'Ramen',
        likes: 19
    },
    {
        name: 'Zara Khan',
        favoriteColor: 'Emerald Green',
        favoriteFood: 'Biryani',
        likes: 13
    }
];

// Function to seed the database
async function seedDatabase() {
    try {
        // Clear existing data
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM students', [], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('Cleared existing data');

        // Reset the SQLite sequence
        await new Promise((resolve, reject) => {
            db.run('DELETE FROM sqlite_sequence WHERE name="students"', [], (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('Reset ID sequence');

        // Prepare the insert statement
        const stmt = db.prepare('INSERT INTO students (name, favoriteColor, favoriteFood, likes) VALUES (?, ?, ?, ?)');

        // Insert seed data
        for (const student of seedData) {
            await new Promise((resolve, reject) => {
                stmt.run([student.name, student.favoriteColor, student.favoriteFood, student.likes], (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        }

        // Finalize the statement
        await new Promise((resolve, reject) => {
            stmt.finalize((err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        console.log('Database seeded successfully!');
        
        // Log the seeded data
        const seededData = await new Promise((resolve, reject) => {
            db.all('SELECT * FROM students', [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });

        console.log('\nSeeded Profiles:');
        console.table(seededData);

        // Close the database connection
        await new Promise((resolve, reject) => {
            db.close((err) => {
                if (err) reject(err);
                else resolve();
            });
        });

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seed function
seedDatabase(); 