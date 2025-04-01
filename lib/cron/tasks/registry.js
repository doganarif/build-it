// This file should NOT have 'use server' at the top
// It's a regular module that exports configuration

import { cleanupTask } from './cleanupTask';
import { emailDigestTask } from './emailDigestTask';
import { dataSyncTask } from './dataSyncTask';

/**
 * List of all available cron tasks with their schedules
 */
const tasks = [
  {
    name: 'cleanup',
    schedule: '0 0 * * *', // Run every day at midnight
    handler: cleanupTask
  },
  {
    name: 'email-digest',
    schedule: '0 9 * * 1', // Run every Monday at 9 AM
    handler: emailDigestTask
  },
  {
    name: 'data-sync',
    schedule: '0 */4 * * *', // Run every 4 hours
    handler: dataSyncTask
  }
];

/**
 * Get all tasks
 * @returns {Array} - List of task configuration objects
 */
export function getTasks() {
  return tasks;
}

/**
 * Get a specific task by name
 * @param {string} name - Name of the task to retrieve
 * @returns {Object|null} - Task configuration or null if not found
 */
export function getTaskByName(name) {
  return tasks.find(task => task.name === name) || null;
} 