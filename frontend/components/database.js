import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('tasks.db');

// Initialize database tables
export const initDatabase = () => {
  db.execSync(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      dueDate TEXT,
      points INTEGER,
      rewardIcon TEXT,
      status TEXT DEFAULT 'kickoff' CHECK(status IN ('kickoff', 'inmotion', 'victorylap'))
    );
  `);
};

// Insert initial tasks if they don't exist
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
      ('CS460 Lab Report', 'Great job completing this task!', 'Completed Nov 5', 200, 'redreward', 'victorylap'),
      ('CS590 Presentation', 'Successfully delivered and well received!', 'Completed Nov 8', 450, 'multireward', 'victorylap');
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
  // First, get the maximum order of tasks in the target status
  const maxOrderResult = await db.getAllAsync(
    'SELECT MAX(id) as maxId FROM tasks WHERE status = ?',
    [newStatus]
  );
  
  // Update the task's status and ensure it appears at the top
  await db.runAsync(
    `UPDATE tasks 
     SET status = ?,
         id = (SELECT COALESCE(MIN(id), 0) - 1 FROM tasks)
     WHERE id = ?`,
    [newStatus, taskId]
  );
}; 