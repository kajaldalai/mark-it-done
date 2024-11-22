CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT,
    points INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    description TEXT,
    due_date DATETIME,
    points INTEGER,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
);


-- Insert some sample data
INSERT INTO users (email, password) VALUES 
('student@hawk.iit.edu', 'password123'),
('kdalai@hawk.iit.edu', 'kd123');

INSERT INTO tasks (title, user_id, description, due_date, points) VALUES 
('CS495 Assignment 4', 2, 'Set the wheels in motion.', '2024-11-11', 20),
('CS585 Homework 3', 2, 'Quick win awaits!', '2024-11-13', 15),
('CS450 Project Proposal', 2, 'Let’s crush it!', '2024-11-15', 30),
('CS581 Quiz 5', 2, 'Your attention would make my day!', '2024-11-15', 50);