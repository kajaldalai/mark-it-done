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
      dueDate DATE,
      submitted_date DATE,
      points INTEGER,
      rewardIcon TEXT,
      status TEXT DEFAULT 'kickoff' CHECK(status IN ('kickoff', 'inmotion', 'victorylap'))
    );

    CREATE TABLE IF NOT EXISTS rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      points INTEGER NOT NULL,
      image_url TEXT NOT NULL
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
      ('CS495 Assignment 4', 'Set the wheels in motion. Greatness starts with first step.', '2024-11-29', 400, 'bluereward', 'kickoff'),
      ('CS585 Homework 3', 'A quick win awaits! Let''s cross something off that list!', '2024-11-30', 150, 'yellowreward', 'kickoff'),
      ('CS450 Project Proposal', 'Today''s the day, let''s crush it!', '2024-12-02', 300, 'redreward', 'kickoff'),
      ('CS581 Quiz 5', 'I know I am here for a while, but your attention would make my day!', '2024-12-02', 500, 'multireward', 'kickoff');

    -- In Motion Tasks
    INSERT INTO tasks (title, description, dueDate, points, rewardIcon, status)
    VALUES 
      ('CS401 Project Phase 2', 'Making progress! Keep the momentum going.', '2024-11-27', 350, 'bluereward', 'inmotion'),
      ('CS510 Research Paper', 'Almost halfway there. Stay focused!', '2024-11-29', 250, 'yellowreward', 'inmotion');

    -- Victory Lap Tasks
    INSERT INTO tasks (title, description, dueDate, submitted_date, points, rewardIcon, status)
    VALUES 
      ('CS460 Lab Report', 'Great job completing this task! 🎉', '2024-11-10', '2024-11-05', 200, 'redreward', 'victorylap'),
      ('CS590 Presentation', 'Successfully delivered and well received! 🥳', '2024-11-15', '2024-11-08', 450, 'multireward', 'victorylap');
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
    -- Only delete rewards that aren't referenced in user_rewards
    DELETE FROM rewards 
    WHERE id NOT IN (SELECT DISTINCT reward_id FROM user_rewards);
    
    -- Insert rewards only if they don't exist (removed is_locked field)
    INSERT OR IGNORE INTO rewards (name, points, image_url) VALUES 
      ('Pizza Slice', 2500, 'pizza'),
      ('Coffee', 1500, 'coffee'),
      ('Donut', 2200, 'donut'),
      ('Muffin', 3000, 'chocomuffin'),
      ('Cupcake', 4400, 'cupcake'),
      ('Hot Dog', 5000, 'hotdog');
  `);
};

export const getTasks = async (status) => {
  const tasks = await db.getAllAsync(
    'SELECT * FROM tasks WHERE status = ? ORDER BY id ASC',
    [status]
  );
  return tasks;
};

export const getCompletedTasks = async (status) => {
  const tasks = await db.getAllAsync(
    'SELECT * FROM tasks WHERE status = ? ORDER BY submitted_date DESC',
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
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Get the task points before updating
    const task = await db.getAllAsync('SELECT points FROM tasks WHERE id = ?', [taskId]);
    const taskPoints = task[0]?.points || 0;
    
    // Begin transaction to ensure both updates succeed or fail together
    await db.runAsync('BEGIN TRANSACTION');
    
    try {
      // Update task status
      await db.runAsync(
        `UPDATE tasks 
         SET status = ?,
             id = (SELECT COALESCE(MAX(id), 0) + 1 FROM tasks),
             description = description || ' 🎉',
             submitted_date = ?
         WHERE id = ?`,
        [newStatus, currentDate, taskId]
      );
      
      // Add points to user's reward_points (assuming single user for now)
      await db.runAsync(
        `UPDATE users 
         SET reward_points = reward_points + ?
         WHERE id = (SELECT MIN(id) FROM users)`,
        [taskPoints]
      );
      
      await db.runAsync('COMMIT');
    } catch (error) {
      await db.runAsync('ROLLBACK');
      throw error;
    }
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
        
        // Update user points by subtracting the reward cost
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