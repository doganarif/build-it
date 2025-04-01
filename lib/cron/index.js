'use server';

import { scheduler } from './scheduler';
import { tasks } from './tasks';

/**
 * Initialize the cron scheduler with all registered tasks
 */
export function initCronJobs() {
  // Only run in production or when explicitly enabled
  const enabled = process.env.ENABLE_CRON_JOBS === 'true' || process.env.NODE_ENV === 'production';
  
  if (!enabled) {
    console.log('Cron jobs are disabled. Set ENABLE_CRON_JOBS=true to enable them.');
    return;
  }
  
  // Initialize the scheduler with all tasks
  scheduler.initialize(tasks);
}

/**
 * Get list of all registered cron jobs
 * @returns {Array} - List of job information objects
 */
export function listCronJobs() {
  return scheduler.getJobs();
}

/**
 * Run a specific cron job immediately
 * @param {string} name - Name of the job to run
 * @returns {Promise<Object>} - Result of the job execution
 */
export async function runCronJob(name) {
  const job = scheduler.jobs.get(name);
  
  if (!job) {
    return { success: false, error: `Job '${name}' not found` };
  }
  
  try {
    console.log(`Manually running cron job: ${name}`);
    const result = await job.handler();
    return { success: true, result };
  } catch (error) {
    console.error(`Error manually running cron job '${name}':`, error);
    return { success: false, error: error.message };
  }
}

// Export tasks for direct access
export * from './tasks';

// Export scheduler for advanced usage
export { scheduler }; 