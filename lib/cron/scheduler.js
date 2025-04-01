'use server';

import cron from 'node-cron';
import { db } from '@/lib/db';

/**
 * Class to manage cron jobs in the application
 */
class CronScheduler {
  constructor() {
    this.jobs = new Map();
    this.initialized = false;
  }

  /**
   * Initialize the scheduler with the provided tasks
   * @param {Array} tasks - Array of task objects with schedule and handler properties
   */
  initialize(tasks = []) {
    if (this.initialized) {
      console.warn('Cron scheduler already initialized');
      return;
    }

    // Register each task
    tasks.forEach(task => {
      this.register(task.name, task.schedule, task.handler);
    });

    this.initialized = true;
    console.log(`Cron scheduler initialized with ${tasks.length} tasks`);
  }

  /**
   * Register a new cron job
   * @param {string} name - Unique name for the job
   * @param {string} schedule - Cron schedule expression (e.g., '0 * * * *')
   * @param {Function} handler - Async function to execute
   * @returns {boolean} - Success status
   */
  register(name, schedule, handler) {
    if (this.jobs.has(name)) {
      console.warn(`Cron job '${name}' already registered`);
      return false;
    }

    try {
      // Validate cron expression
      if (!cron.validate(schedule)) {
        console.error(`Invalid cron schedule for job '${name}': ${schedule}`);
        return false;
      }

      // Create a wrapper that logs execution details and handles errors
      const wrappedHandler = async () => {
        try {
          console.log(`Running cron job: ${name}`);
          const startTime = Date.now();
          
          // Log job execution start in database
          const jobRun = await db.cronJobRun.create({
            data: {
              jobName: name,
              startedAt: new Date(),
              status: 'running'
            }
          });

          // Execute the actual handler
          await handler();
          
          const duration = Date.now() - startTime;
          
          // Update job run with completion details
          await db.cronJobRun.update({
            where: { id: jobRun.id },
            data: {
              finishedAt: new Date(),
              duration,
              status: 'completed'
            }
          });
          
          console.log(`Completed cron job: ${name} (${duration}ms)`);
        } catch (error) {
          console.error(`Error in cron job '${name}':`, error);
          
          // Update job run with error details
          if (jobRun) {
            await db.cronJobRun.update({
              where: { id: jobRun.id },
              data: {
                finishedAt: new Date(),
                duration: Date.now() - startTime,
                status: 'failed',
                error: error.message || 'Unknown error'
              }
            });
          }
        }
      };

      // Schedule the job
      const job = cron.schedule(schedule, wrappedHandler);
      this.jobs.set(name, { job, schedule, handler: wrappedHandler });

      console.log(`Registered cron job: ${name} with schedule: ${schedule}`);
      return true;
    } catch (error) {
      console.error(`Failed to register cron job '${name}':`, error);
      return false;
    }
  }

  /**
   * Stop and remove a cron job
   * @param {string} name - Name of the job to stop
   * @returns {boolean} - Success status
   */
  stop(name) {
    if (!this.jobs.has(name)) {
      console.warn(`Cron job '${name}' not found`);
      return false;
    }

    try {
      const job = this.jobs.get(name);
      job.job.stop();
      this.jobs.delete(name);
      console.log(`Stopped cron job: ${name}`);
      return true;
    } catch (error) {
      console.error(`Failed to stop cron job '${name}':`, error);
      return false;
    }
  }

  /**
   * Get list of all registered jobs
   * @returns {Array} - List of job information objects
   */
  getJobs() {
    const jobList = [];
    
    this.jobs.forEach((value, name) => {
      jobList.push({
        name,
        schedule: value.schedule,
        active: value.job.running
      });
    });
    
    return jobList;
  }
}

// Create singleton instance
const scheduler = new CronScheduler();

export { scheduler }; 