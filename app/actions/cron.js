'use server';

import { getServerSession } from '@/lib/auth';
import { db } from '@/lib/db';
import { listCronJobs, runCronJob } from '@/lib/cron';

/**
 * Get a list of all registered cron jobs
 * @returns {Object} - Result with list of jobs
 */
export async function getCronJobs() {
  try {
    // Check for admin privileges
    const session = await getServerSession();
    if (!session?.user?.email) {
      return { success: false, error: 'Unauthorized' };
    }
    
    // Check if user is an admin (you may need to adjust this logic)
    const user = await db.user.findUnique({
      where: { email: session.user.email }
    });
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    // List all registered cron jobs
    const jobs = listCronJobs();
    
    return { success: true, jobs };
  } catch (error) {
    console.error('Error getting cron jobs:', error);
    return { success: false, error: 'Failed to get cron jobs' };
  }
}

/**
 * Get recent cron job runs
 * @param {Object} params - Query parameters
 * @param {number} params.limit - Maximum number of runs to return
 * @returns {Object} - Result with list of job runs
 */
export async function getCronJobRuns({ limit = 50 } = {}) {
  try {
    // Check for admin privileges
    const session = await getServerSession();
    if (!session?.user?.email) {
      return { success: false, error: 'Unauthorized' };
    }
    
    // Get recent job runs
    const jobRuns = await db.cronJobRun.findMany({
      orderBy: {
        startedAt: 'desc'
      },
      take: limit
    });
    
    return { success: true, jobRuns };
  } catch (error) {
    console.error('Error getting cron job runs:', error);
    return { success: false, error: 'Failed to get cron job runs' };
  }
}

/**
 * Run a cron job immediately
 * @param {Object} params - Job parameters
 * @param {string} params.jobName - Name of the job to run
 * @returns {Object} - Result of the job execution
 */
export async function executeJob({ jobName }) {
  try {
    // Check for admin privileges
    const session = await getServerSession();
    if (!session?.user?.email) {
      return { success: false, error: 'Unauthorized' };
    }
    
    // Check if user is an admin (you may need to adjust this logic)
    const user = await db.user.findUnique({
      where: { email: session.user.email }
    });
    
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    
    // Run the job
    const result = await runCronJob(jobName);
    
    return result;
  } catch (error) {
    console.error(`Error executing job ${jobName}:`, error);
    return { success: false, error: 'Failed to execute job' };
  }
} 