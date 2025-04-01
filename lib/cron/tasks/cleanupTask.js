'use server';

import { db } from '@/lib/db';

/**
 * Task to clean up old database records
 */
export async function cleanupTask() {
  console.log('Running database cleanup task');
  
  try {
    // Example: Clean up old sessions
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const deletedSessions = await db.session.deleteMany({
      where: {
        expires: {
          lt: thirtyDaysAgo
        }
      }
    });
    
    console.log(`Deleted ${deletedSessions.count} expired sessions`);
    
    // Example: Clean up verification tokens
    const deletedTokens = await db.verificationToken.deleteMany({
      where: {
        expires: {
          lt: new Date()
        }
      }
    });
    
    console.log(`Deleted ${deletedTokens.count} expired verification tokens`);
    
    // Example: Clean up old job runs
    const ninetyDaysAgo = new Date();
    ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
    
    const deletedJobRuns = await db.cronJobRun.deleteMany({
      where: {
        startedAt: {
          lt: ninetyDaysAgo
        }
      }
    });
    
    console.log(`Deleted ${deletedJobRuns.count} old cron job runs`);
    
    return {
      success: true,
      deletedSessions: deletedSessions.count,
      deletedTokens: deletedTokens.count,
      deletedJobRuns: deletedJobRuns.count
    };
  } catch (error) {
    console.error('Error in cleanup task:', error);
    return { success: false, error: error.message };
  }
} 