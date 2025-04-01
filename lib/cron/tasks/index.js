'use server';

import { cleanupTask } from './cleanupTask';
import { emailDigestTask } from './emailDigestTask';
import { dataSyncTask } from './dataSyncTask';

/**
 * List of all available cron tasks with their schedules
 * Use standard cron syntax:
 * - second (0-59, optional)
 * - minute (0-59)
 * - hour (0-23)
 * - day of month (1-31)
 * - month (1-12)
 * - day of week (0-7, 0 and 7 represent Sunday)
 * 
 * Examples:
 * - '0 * * * *' - Every hour at minute 0
 * - '0 0 * * *' - Every day at midnight
 * - '0 0 * * 0' - Every Sunday at midnight
 * - '0 0 1 * *' - First day of every month at midnight
 * - '0 0/12 * * *' - Every 12 hours
 */
export const tasks = [
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

// Export individual tasks for direct usage in server actions
export {
  cleanupTask,
  emailDigestTask,
  dataSyncTask
}; 