// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Ensure we're looking for the database in the correct location
const dbPath = path.resolve(__dirname, 'taskmanager.db');
const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to database at:', dbPath);
        initializeDatabase();
    }
});

// Database initialization function
function initializeDatabase() {
    console.log('Initializing database...');

    // Create users table
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT,
      points INTEGER DEFAULT 0,
      gems INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `, [], (err) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table ready');
            // Insert a test user if none exists
            const testUserEmail = 'kdalai@hawk.iit.edu';
            db.get('SELECT * FROM users WHERE email = ?', [testUserEmail], async (err, user) => {
                if (err) {
                    console.error('Error checking for test user:', err);
                } else if (!user) {
                    // Create test user
                    const hashedPassword = await bcrypt.hash('password123', 10);
                    db.run(
                        'INSERT INTO users (email, password, name, points, gems) VALUES (?, ?, ?, ?, ?)',
                        [testUserEmail, hashedPassword, 'John Tim', 110, 2],
                        (err) => {
                            if (err) {
                                console.error('Error creating test user:', err);
                            } else {
                                console.log('Test user created');
                            }
                        }
                    );
                }
            });
        }
    });

    // Create tasks table
    db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      due_date DATETIME,
      points INTEGER DEFAULT 0,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `, [], (err) => {
        if (err) {
            console.error('Error creating tasks table:', err);
        } else {
            console.log('Tasks table ready');
        }
    });
}

// Login endpoint with better error handling and logging
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // First, get the user by email
        db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
            if (err) {
                console.error('Database error during login:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!user) {
                console.log('User not found:', email);
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // For testing purposes, you can temporarily bypass password check
            // REMOVE THIS IN PRODUCTION
            const match = true; // await bcrypt.compare(password, user.password);

            if (match) {
                // Don't send password back to client
                const { password, ...userWithoutPassword } = user;
                console.log('Login successful for user:', email);
                db.all('SELECT * FROM tasks', [], (err, rows) => {
                    console.log("RES >> ", rows, err)
                    if (err) {
                        console.log({ error: 'Internal server error' });
                    } else {
                        console.log("TASKS > ", rows)
                    }
                });
                return res.json({
                    success: true,
                    user: userWithoutPassword
                });
            } else {
                console.log('Invalid password for user:', email);
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        console.log("RES >> ", rows, err)
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            return res.json({
                success: true,
                tasks: rows
            });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle cleanup on server shutdown
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed');
        }
        process.exit(0);
    });
});