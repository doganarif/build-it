// Client-side utilities for cron jobs (no 'use server' directive)
import { scheduler } from './scheduler';

/**
 * Get the scheduler instance for advanced usage
 * Use this only in client components or regular modules (not server actions)
 */
export function getScheduler() {
  return scheduler;
}

/**
 * Get a list of registered jobs
 * Use this only in client components or regular modules (not server actions)
 */
export function getJobsList() {
  return scheduler.getJobs();
}

/**
 * Format the next run time for a job based on its cron schedule
 * @param {string} cronExpression - Cron schedule expression
 * @returns {string} - Formatted date string
 */
export function getNextRunTime(cronExpression) {
  try {
    const cronParser = require('cron-parser');
    const interval = cronParser.parseExpression(cronExpression);
    const nextDate = interval.next().toDate();
    return nextDate.toLocaleString();
  } catch (error) {
    console.error('Error parsing cron expression:', error);
    return 'Invalid schedule';
  }
} 