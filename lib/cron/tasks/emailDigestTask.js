'use server';

import { db } from '@/lib/db';
import { emailService } from '@/lib/email';

/**
 * Task to send weekly digest emails to users
 */
export async function emailDigestTask() {
  console.log('Running weekly email digest task');
  
  try {
    // Get all active users with subscriptions
    const activeUsers = await db.user.findMany({
      where: {
        subscriptions: {
          some: {
            OR: [
              {
                stripeCurrentPeriodEnd: {
                  gt: new Date()
                }
              },
              {
                lemonSqueezyCurrentPeriodEnd: {
                  gt: new Date()
                }
              }
            ]
          }
        }
      },
      include: {
        subscriptions: true
      }
    });
    
    console.log(`Found ${activeUsers.length} active users for digest email`);
    
    // In a real scenario, you might want to batch these emails
    let successCount = 0;
    let failCount = 0;
    
    for (const user of activeUsers) {
      try {
        // Example: Get some statistics for the user
        const userStats = {
          // In a real application, you would fetch actual data here
          loginCount: Math.floor(Math.random() * 10),
          actionsPerformed: Math.floor(Math.random() * 100),
          usage: {
            percentage: Math.floor(Math.random() * 100),
            current: Math.floor(Math.random() * 1000),
            limit: 1000
          }
        };
        
        // Send email using the email service
        await emailService.sendEmail({
          to: user.email,
          templateName: 'weekly-digest', // This would need to be created
          templateData: {
            user: {
              name: user.name
            },
            stats: userStats,
            date: new Date().toISOString().split('T')[0]
          }
        });
        
        successCount++;
      } catch (emailError) {
        console.error(`Failed to send digest email to ${user.email}:`, emailError);
        failCount++;
      }
    }
    
    return {
      success: true,
      totalUsers: activeUsers.length,
      successCount,
      failCount
    };
  } catch (error) {
    console.error('Error in email digest task:', error);
    return { success: false, error: error.message };
  }
} 