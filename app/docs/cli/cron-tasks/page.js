import Link from 'next/link';

export const metadata = {
  title: 'Cron Tasks CLI - BuildIt Documentation',
  description: 'Documentation for generating cron tasks using the BuildIt CLI',
};

export default function CronTasksCliPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Cron Tasks CLI</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          The BuildIt CLI provides tools for creating and managing scheduled cron tasks.
          This guide explains how to use the CLI to generate and work with cron jobs in your application.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Creating Cron Tasks</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Basic Usage</h3>
          <p>
            To create a new cron task, run the following command:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- generate cron</code>
          </pre>
          <p className="mt-2">
            You can also use the shorthand version:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- g c</code>
          </pre>
          <p className="mt-2">
            The CLI will prompt you for information about the cron task:
          </p>
          <ul className="mt-4 space-y-2">
            <li><strong>Task Name</strong>: The name of the task (e.g., "cleanup", "send-weekly-summary")</li>
            <li><strong>Display Name</strong>: A human-readable name for the task</li>
            <li><strong>Description</strong>: A brief description of what the task does</li>
            <li><strong>Schedule</strong>: When the task should run (cron expression or human-readable format)</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Example</h3>
          <p>
            Here's an example of creating a database cleanup cron task:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`$ npm run cli -- generate cron

🕒 BuildIt Cron Task Generator 🕒

? Task name: cleanup
? Display name: Database Cleanup
? Task description: Removes old logs and temporary data
? Schedule (cron expression or human format): 0 0 * * * 
  (or you can type: "every day at midnight")

Creating cron task "cleanup"...
✅ Created cron/jobs/cleanup.js

Cron task "cleanup" created successfully!`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Generated Files</h2>
        <p>
          The CLI generates a JavaScript file for each cron task in the <code>cron/jobs</code> directory:
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Task Structure</h3>
          <p>
            Here's an example of a generated cron task file (<code>cron/jobs/cleanup.js</code>):
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// cron/jobs/cleanup.js
import { db } from '@/lib/db';

/**
 * Database Cleanup
 * 
 * Removes old logs and temporary data
 * 
 * @type {import('@/types').CronJob}
 */
const job = {
  // Unique identifier for the job
  name: 'cleanup',
  
  // Human-readable name
  displayName: 'Database Cleanup',
  
  // Description of what this job does
  description: 'Removes old logs and temporary data',
  
  // Cron schedule (when the job runs)
  // This one runs at midnight every day
  schedule: '0 0 * * *',
  
  // Whether the job is enabled (default: true)
  enabled: true,
  
  // Optional timeout in milliseconds
  // If the job takes longer than this, it will be terminated
  // Default: 5 minutes (300000ms)
  timeout: 300000,
  
  /**
   * The function that will be executed when the job runs
   */
  async execute() {
    console.log('Running cleanup job...');
    
    try {
      // Your job logic goes here
      // For example, delete old records:
      
      // Get date 30 days ago
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      // Delete old logs
      const deletedLogs = await db.log.deleteMany({
        where: {
          createdAt: {
            lt: thirtyDaysAgo
          }
        }
      });
      
      console.log(\`Deleted \${deletedLogs.count} old logs\`);
      
      // Return success result
      return {
        success: true,
        message: \`Cleanup completed. Deleted \${deletedLogs.count} old logs.\`,
        data: {
          deletedLogs: deletedLogs.count
        }
      };
    } catch (error) {
      console.error('Error running cleanup job:', error);
      
      // Return error result
      return {
        success: false,
        message: \`Error: \${error.message}\`,
        error
      };
    }
  }
};

export default job;`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Scheduling Options</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Cron Expressions</h3>
          <p>
            You can use standard cron expressions to define when your task runs:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`* * * * *
┬ ┬ ┬ ┬ ┬
│ │ │ │ └─ day of week (0 - 7, where 0 and 7 are Sunday)
│ │ │ └─── month (1 - 12)
│ │ └───── day of month (1 - 31)
│ └─────── hour (0 - 23)
└───────── minute (0 - 59)`}
            </code>
          </pre>
          <p className="mt-4">
            Common cron expressions:
          </p>
          <table className="min-w-full divide-y divide-gray-300 mt-2">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Expression</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>0 * * * *</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Every hour at minute 0</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>0 0 * * *</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Every day at midnight</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>0 0 * * 0</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Every Sunday at midnight</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>0 0 1 * *</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">First day of each month at midnight</td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>*/15 * * * *</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Every 15 minutes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Human-Readable Formats</h3>
          <p>
            You can also use human-readable formats for easier understanding:
          </p>
          <table className="min-w-full divide-y divide-gray-300 mt-2">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Expression</th>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Equivalent Cron</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>@hourly</code></td>
                <td className="py-2 px-4 text-sm text-gray-500"><code>0 * * * *</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>@daily</code></td>
                <td className="py-2 px-4 text-sm text-gray-500"><code>0 0 * * *</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>@weekly</code></td>
                <td className="py-2 px-4 text-sm text-gray-500"><code>0 0 * * 0</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>@monthly</code></td>
                <td className="py-2 px-4 text-sm text-gray-500"><code>0 0 1 * *</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>every 30 minutes</code></td>
                <td className="py-2 px-4 text-sm text-gray-500"><code>*/30 * * * *</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>every day at 3 am</code></td>
                <td className="py-2 px-4 text-sm text-gray-500"><code>0 3 * * *</code></td>
              </tr>
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>every Monday at 12:30 pm</code></td>
                <td className="py-2 px-4 text-sm text-gray-500"><code>30 12 * * 1</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Managing Cron Tasks</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Listing Tasks</h3>
          <p>
            To view all registered cron tasks in your application:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- list --cron</code>
          </pre>
          <p className="mt-2">
            This will display a table with all cron tasks, their schedules, and descriptions.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Running Tasks Manually</h3>
          <p>
            You can manually trigger a cron task for testing:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- run-job job-name</code>
          </pre>
          <p className="mt-2">
            For example, to run the cleanup job:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- run-job cleanup</code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Enabling and Disabling Tasks</h3>
          <p>
            To enable or disable a task, modify the <code>enabled</code> property in the task file:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// cron/jobs/example-job.js
const job = {
  // ...other properties...
  
  // Set to false to disable the job
  enabled: false,
  
  // ...rest of the job definition...
};`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Implementing Task Logic</h2>
        <p>
          The <code>execute()</code> function is where your task's logic lives. Here are some common patterns:
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Database Operations</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`async execute() {
  try {
    // Process records in batches to avoid memory issues
    const batchSize = 100;
    let processed = 0;
    let hasMore = true;
    
    while (hasMore) {
      // Get a batch of records
      const records = await db.record.findMany({
        where: { processed: false },
        take: batchSize,
        orderBy: { createdAt: 'asc' }
      });
      
      // Stop if no more records
      if (records.length === 0) {
        hasMore = false;
        break;
      }
      
      // Process each record
      for (const record of records) {
        await db.record.update({
          where: { id: record.id },
          data: { 
            processed: true,
            processedAt: new Date()
          }
        });
        
        processed++;
      }
    }
    
    return { 
      success: true, 
      message: \`Processed \${processed} records\`, 
      data: { processed } 
    };
  } catch (error) {
    return { success: false, error };
  }
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Sending Emails</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';

async execute() {
  try {
    // Find users who need to receive the weekly digest
    const users = await db.user.findMany({
      where: {
        emailPreferences: {
          weeklyDigest: true
        },
        status: 'active'
      }
    });
    
    console.log(\`Sending weekly digest to \${users.length} users\`);
    
    const results = [];
    
    // Send email to each user
    for (const user of users) {
      try {
        // Get user-specific content
        const activities = await db.activity.findMany({
          where: {
            userId: user.id,
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
            }
          },
          orderBy: { createdAt: 'desc' }
        });
        
        // Send the email
        await sendEmail({
          to: user.email,
          template: 'weekly-digest',
          data: {
            name: user.name,
            activities,
            date: new Date().toLocaleDateString()
          }
        });
        
        results.push({ userId: user.id, status: 'sent' });
      } catch (error) {
        console.error(\`Error sending email to \${user.email}:\`, error);
        results.push({ userId: user.id, status: 'failed', error: error.message });
      }
    }
    
    const successful = results.filter(r => r.status === 'sent').length;
    
    return {
      success: true,
      message: \`Sent weekly digest to \${successful} of \${users.length} users\`,
      data: { results }
    };
  } catch (error) {
    return { success: false, error };
  }
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">External API Calls</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`import { db } from '@/lib/db';

async execute() {
  try {
    // Get data that needs to be synced
    const products = await db.product.findMany({
      where: { needsSync: true }
    });
    
    const results = [];
    
    // Update each product in the external API
    for (const product of products) {
      try {
        // Call external API
        const response = await fetch(\`https://api.example.com/products/\${product.externalId}\`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': \`Bearer \${process.env.API_KEY}\`
          },
          body: JSON.stringify({
            name: product.name,
            price: product.price,
            description: product.description
          })
        });
        
        if (!response.ok) {
          throw new Error(\`API responded with \${response.status}\`);
        }
        
        // Update local record
        await db.product.update({
          where: { id: product.id },
          data: { 
            needsSync: false,
            lastSyncedAt: new Date()
          }
        });
        
        results.push({ productId: product.id, status: 'synced' });
      } catch (error) {
        console.error(\`Error syncing product \${product.id}:\`, error);
        results.push({ productId: product.id, status: 'failed', error: error.message });
      }
    }
    
    const successful = results.filter(r => r.status === 'synced').length;
    
    return {
      success: true,
      message: \`Synced \${successful} of \${products.length} products\`,
      data: { results }
    };
  } catch (error) {
    return { success: false, error };
  }
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Best Practices</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Error Handling</h3>
          <p>
            Always implement proper error handling and provide detailed error information:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`async execute() {
  try {
    // Your job logic
  } catch (error) {
    console.error('Job failed:', error);
    
    // You can also send notifications for critical failures
    if (process.env.NODE_ENV === 'production') {
      await notifyAdmins('Job Failed', {
        jobName: this.name,
        error: error.message,
        stack: error.stack
      });
    }
    
    return { 
      success: false, 
      message: \`Error: \${error.message}\`,
      error
    };
  }
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Logging</h3>
          <p>
            Add comprehensive logging to your cron jobs for better monitoring and debugging:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`import { logger } from '@/lib/logger';

async execute() {
  const startTime = Date.now();
  logger.info(\`Starting job: \${this.name}\`);
  
  try {
    // Job logic here
    logger.info(\`Job step 1 completed\`);
    
    // More job logic
    logger.info(\`Job step 2 completed with \${results.length} items\`);
    
    const duration = Date.now() - startTime;
    logger.info(\`Job \${this.name} completed successfully in \${duration}ms\`);
    
    return { success: true, duration };
  } catch (error) {
    const duration = Date.now() - startTime;
    logger.error(\`Job \${this.name} failed after \${duration}ms: \${error.message}\`, {
      error: error.stack,
      jobName: this.name
    });
    
    return { success: false, error, duration };
  }
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Performance</h3>
          <ul className="mt-2 space-y-2">
            <li>Process data in batches to avoid memory issues</li>
            <li>Use database transactions when performing multiple related updates</li>
            <li>Implement pagination when dealing with large datasets</li>
            <li>Set reasonable timeouts for external API calls</li>
            <li>Consider using worker queues for high-volume processing</li>
          </ul>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Next Steps</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Cron Jobs Feature</h3>
            <p className="mt-2 text-gray-600">
              Learn more about the cron job system in BuildIt.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features/cron-jobs"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Cron Jobs →
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">API Routes</h3>
            <p className="mt-2 text-gray-600">
              Learn how to create API routes that can be used with cron jobs.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/cli/api-routes"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                API Routes →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 