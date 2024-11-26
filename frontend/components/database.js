import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('tasks.db');

// Initialize database tables
export const initDatabase = () => {
  // First drop all tables to ensure clean slate
  db.execSync(`
    DROP TABLE IF EXISTS user_rewards;
    DROP TABLE IF EXISTS rewards;
    DROP TABLE IF EXISTS tasks;
    DROP TABLE IF EXISTS users;
  `);

  // Then create tables with new schema
  db.execSync(`
    PRAGMA foreign_keys = ON;
    
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      reward_points INTEGER DEFAULT 4500
    );

    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      dueDate TEXT,
      points INTEGER,
      rewardIcon TEXT,
      status TEXT DEFAULT 'kickoff' CHECK(status IN ('kickoff', 'inmotion', 'victorylap'))
    );

    CREATE TABLE IF NOT EXISTS rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      points INTEGER NOT NULL,
      image_url TEXT NOT NULL,
      is_locked BOOLEAN DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS user_rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      reward_id INTEGER,
      redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      expiry_date TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (reward_id) REFERENCES rewards(id)
    );
  `);

  // Call initial data insertion
  insertInitialUsers();
  insertInitialTasks();
  insertInitialRewards();
};

export const insertInitialTasks = () => {
  db.execSync(`
    DELETE FROM tasks;
    
    -- Kickoff Tasks
    INSERT INTO tasks (title, description, dueDate, points, rewardIcon, status)
    VALUES 
      ('CS495 Assignment 4', 'Set the wheels in motion. Greatness starts with first step.', 'Due on Nov 11, 10:00am', 400, 'bluereward', 'kickoff'),
      ('CS585 Homework 3', 'A quick win awaits! Let''s cross something off that list!', 'Due on Nov 15, 11:59pm', 150, 'yellowreward', 'kickoff'),
      ('CS450 Project Proposal', 'Today''s the day, let''s crush it!', 'Due on Nov 20, 11:59pm', 300, 'redreward', 'kickoff'),
      ('CS581 Quiz 5', 'I know I am here for a while, but your attention would make my day!', 'Due on Nov 20, 11:59pm', 500, 'multireward', 'kickoff');

    -- In Motion Tasks
    INSERT INTO tasks (title, description, dueDate, points, rewardIcon, status)
    VALUES 
      ('CS401 Project Phase 2', 'Making progress! Keep the momentum going.', 'Due on Nov 18, 11:59pm', 350, 'bluereward', 'inmotion'),
      ('CS510 Research Paper', 'Almost halfway there. Stay focused!', 'Due on Nov 25, 11:59pm', 250, 'yellowreward', 'inmotion');

    -- Victory Lap Tasks
    INSERT INTO tasks (title, description, dueDate, points, rewardIcon, status)
    VALUES 
      ('CS460 Lab Report', 'Great job completing this task! 🎉', 'Submitted on Nov 5', 200, 'redreward', 'victorylap'),
      ('CS590 Presentation', 'Successfully delivered and well received! 🥳', 'Submitted on Nov 8', 450, 'multireward', 'victorylap');
  `);
};

export const insertInitialUsers = () => {
  db.execSync(`
    DELETE FROM users;
    INSERT INTO users (email, password, name, reward_points) VALUES 
    ('kdalai@hawk.iit.edu', 'pwd123', 'Kajal Dalai', 4500),
    ('john.tim@iit.edu', 'pwd456', 'John Tim', 4500);
  `);
};

export const insertInitialRewards = () => {
  db.execSync(`
    DELETE FROM rewards;
    INSERT INTO rewards (name, points, image_url, is_locked) VALUES 
      ('Pizza Slice', 2500, 'pizza', 0),
      ('Coffee', 1500, 'coffee', 0),
      ('Donut', 2200, 'donut', 0),
      ('Potato Chips', 3000, 'chips', 0),
      ('Cupcake', 4400, 'cupcake', 1),
      ('Hot Dog', 5000, 'hotdog', 1);
  `);
};

export const getTasks = async (status) => {
  const tasks = await db.getAllAsync(
    'SELECT * FROM tasks WHERE status = ? ORDER BY id ASC',
    [status]
  );
  return tasks;
};

export const updateTaskStatus = async (taskId, newStatus) => {
  const maxOrderResult = await db.getAllAsync(
    'SELECT MAX(id) as maxId FROM tasks WHERE status = ?',
    [newStatus]
  );
  
  if (newStatus === 'victorylap') {
    const currentDate = new Date();
    const month = currentDate.toLocaleString('en-US', { month: 'short' });
    const day = currentDate.getDate();
    
    await db.runAsync(
      `UPDATE tasks 
       SET status = ?,
           id = (SELECT COALESCE(MAX(id), 0) + 1 FROM tasks),
           description = description || ' 🎉',
           dueDate = 'Submitted on ' || ? || ' ' || ?
       WHERE id = ?`,
      [newStatus, month, day, taskId]
    );
  } else {
    await db.runAsync(
      `UPDATE tasks 
       SET status = ?,
           id = (SELECT COALESCE(MAX(id), 0) + 1 FROM tasks)
       WHERE id = ?`,
      [newStatus, taskId]
    );
  }
};

export const authenticateUser = async (email, password) => {
  if (!email.endsWith('.edu')) {
    throw new Error('Only .edu email addresses are allowed');
  }

  const users = await db.getAllAsync(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password]
  );
  
  return users[0] || null;
};

export const getRewards = async (type, userId) => {
    if (!userId) {
        console.error('No user ID provided to getRewards');
        return [];
    }

    try {
        if (type === 'available') {
            return await db.getAllAsync(`
                SELECT r.* 
                FROM rewards r
                LEFT JOIN user_rewards ur 
                    ON r.id = ur.reward_id AND ur.user_id = ?
                WHERE ur.id IS NULL
                ORDER BY r.points ASC
            `, [userId]);
        } else {
            return await db.getAllAsync(`
                SELECT r.*, ur.redeemed_at, ur.expiry_date 
                FROM rewards r
                JOIN user_rewards ur ON r.id = ur.reward_id
                WHERE ur.user_id = ?
                ORDER BY ur.redeemed_at DESC
            `, [userId]);
        }
    } catch (error) {
        console.error('Database error in getRewards:', error);
        throw error;
    }
};

export const getUserPoints = async (userId) => {
    const result = await db.getAllAsync(
        'SELECT reward_points FROM users WHERE id = ?',
        [userId]
    );
    return result[0]?.reward_points || 0;
};

export const redeemReward = async (userId, rewardId) => {
    if (!userId || !rewardId) {
        throw new Error('Missing userId or rewardId');
    }

    try {
        // Start a transaction
        await db.runAsync('BEGIN TRANSACTION');

        // Get reward points
        const reward = await db.getAllAsync(
            'SELECT points FROM rewards WHERE id = ?',
            [rewardId]
        );
        
        if (!reward[0]) {
            await db.runAsync('ROLLBACK');
            throw new Error('Reward not found');
        }
        
        const points = reward[0].points;
        
        // Update user points
        const result = await db.runAsync(
            'UPDATE users SET reward_points = reward_points - ? WHERE id = ? AND reward_points >= ?',
            [points, userId, points]
        );

        if (result.rowsAffected === 0) {
            await db.runAsync('ROLLBACK');
            throw new Error('Insufficient points');
        }
        
        // Add redemption record
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 3);
        
        await db.runAsync(`
            INSERT INTO user_rewards (user_id, reward_id, expiry_date)
            VALUES (?, ?, ?)
        `, [userId, rewardId, expiryDate.toISOString()]);

        // Commit the transaction
        await db.runAsync('COMMIT');
    } catch (error) {
        await db.runAsync('ROLLBACK');
        console.error('Database error in redeemReward:', error);
        throw error;
    }
};