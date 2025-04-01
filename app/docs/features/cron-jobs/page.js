import Link from 'next/link';

export const metadata = {
  title: 'Cron Jobs - BuildIt Documentation',
  description: 'Documentation for the cron job scheduler in BuildIt',
};

export default function CronJobsPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Cron Jobs</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          BuildIt includes a robust cron job scheduler that allows you to run recurring tasks
          on a defined schedule. These tasks can perform maintenance, send automated emails,
          process data, and more.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p>
          The cron job system in BuildIt provides:
        </p>
        <ul className="mt-4 space-y-2">
          <li>Scheduled task execution based on cron syntax</li>
          <li>Task registration and discovery system</li>
          <li>Execution history and logging</li>
          <li>Error handling and recovery</li>
          <li>Manual task execution for testing</li>
          <li>Task isolation and concurrency control</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Creating Cron Jobs</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Using the CLI</h3>
          <p>
            The easiest way to create a new cron job is using the BuildIt CLI:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- generate cron</code>
          </pre>
          <p className="mt-2">
            The CLI will guide you through creating a new cron job, prompting for the job name,
            description, schedule, and other options.
          </p>
          <div className="mt-2">
            <Link
              href="/docs/cli/cron-tasks"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Learn more about cron job generation →
            </Link>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Manual Creation</h3>
          <p>
            You can also create a cron job manually by adding a file to the <code>cron/jobs</code> directory:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// cron/jobs/example-job.js
import { db } from '@/lib/db';

/**
 * Example cron job that runs daily cleanup tasks
 * @type {import('@/types').CronJob}
 */
const job = {
  name: 'example-job',
  displayName: 'Example Job',
  description: 'An example cron job that demonstrates the structure',
  schedule: '0 0 * * *', // Runs at midnight every day
  
  // Function to execute when the job runs
  async execute() {
    console.log('Running example job');
    
    try {
      // Your job logic here
      const result = await db.example.findMany({
        where: { status: 'pending' }
      });
      
      console.log(\`Found \${result.length} pending items\`);
      
      // Process the items...
      
      return {
        success: true,
        message: \`Processed \${result.length} items\`,
        data: { count: result.length }
      };
    } catch (error) {
      console.error('Error running example job:', error);
      
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
        <h2 className="text-2xl font-bold text-gray-900">Cron Job Structure</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Job Definition</h3>
          <p>
            Each cron job has the following properties:
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              <code>name</code> - Unique identifier for the job (kebab-case)
            </li>
            <li>
              <code>displayName</code> - Human-readable name for the job
            </li>
            <li>
              <code>description</code> - Description of what the job does
            </li>
            <li>
              <code>schedule</code> - Cron expression defining when the job runs
            </li>
            <li>
              <code>enabled</code> - (Optional) Boolean to enable/disable the job, defaults to true
            </li>
            <li>
              <code>timeout</code> - (Optional) Maximum runtime in milliseconds before the job is terminated
            </li>
            <li>
              <code>execute</code> - Async function containing the job's logic
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">The Execute Function</h3>
          <p>
            The <code>execute</code> function is where your job's logic lives. It should:
          </p>
          <ul className="mt-2 space-y-2">
            <li>Be an async function</li>
            <li>Perform the necessary operations</li>
            <li>Handle errors internally</li>
            <li>
              Return a result object with at least a <code>success</code> boolean property
            </li>
          </ul>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`async execute() {
  try {
    // Your job logic here
    
    return {
      success: true,
      message: 'Job completed successfully',
      data: { /* optional result data */ }
    };
  } catch (error) {
    console.error('Error in job:', error);
    
    return {
      success: false,
      message: \`Error: \${error.message}\`,
      error: error
    };
  }
}`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Scheduling</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Cron Syntax</h3>
          <p>
            BuildIt uses standard cron syntax for scheduling tasks:
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
            Common cron schedules:
          </p>
          <table className="min-w-full divide-y divide-gray-300 mt-2">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left text-sm font-semibold text-gray-900">Cron Expression</th>
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
              <tr>
                <td className="py-2 px-4 text-sm text-gray-900"><code>0 9-17 * * 1-5</code></td>
                <td className="py-2 px-4 text-sm text-gray-500">Every hour from 9 AM to 5 PM on weekdays</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Human-Readable Schedules</h3>
          <p>
            You can also use human-readable schedules in your cron jobs:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// These are all valid schedule formats
schedule: '0 0 * * *',           // Standard cron syntax
schedule: '@daily',              // Shorthand for daily at midnight
schedule: '@weekly',             // Shorthand for Sunday at midnight
schedule: '@monthly',            // Shorthand for 1st of month at midnight
schedule: '@hourly',             // Shorthand for every hour
schedule: 'every 30 minutes',    // Human readable format
schedule: 'every 2 hours',       // Human readable format
schedule: 'every day at 2:30 am' // Human readable format`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Running and Managing Jobs</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">System Configuration</h3>
          <p>
            Cron jobs are registered and managed by the scheduler in <code>cron/index.js</code>.
            The scheduler automatically discovers and registers all jobs in the <code>cron/jobs</code> directory.
          </p>
          <p className="mt-2">
            The scheduler starts automatically when your application runs, but you can configure its behavior
            in the <code>.env</code> file:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# Enable or disable the cron system entirely
CRON_ENABLED=true

# Set the timezone for cron jobs
CRON_TIMEZONE=America/New_York`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Manual Execution</h3>
          <p>
            You can manually trigger a cron job using the CLI:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- run-job job-name</code>
          </pre>
          <p className="mt-2">
            For example, to run the <code>example-job</code>:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- run-job example-job</code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Listing Jobs</h3>
          <p>
            List all registered cron jobs with the CLI:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- list --cron</code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Best Practices</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Error Handling</h3>
          <p>
            Always handle errors within your cron jobs to prevent the scheduler from crashing:
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
    
    return { success: false, error };
  }
}`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Database Operations</h3>
          <p>
            When performing database operations in cron jobs:
          </p>
          <ul className="mt-2 space-y-2">
            <li>Use transactions for related operations</li>
            <li>Batch database operations for better performance</li>
            <li>Set reasonable query limits to avoid memory issues</li>
            <li>Include timeouts to prevent long-running queries</li>
          </ul>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// Example of a well-structured database operation in a cron job
async execute() {
  try {
    // Process in batches
    const batchSize = 100;
    let processed = 0;
    
    while (true) {
      // Get a batch of records
      const records = await db.record.findMany({
        where: { status: 'pending' },
        take: batchSize,
        orderBy: { createdAt: 'asc' }
      });
      
      if (records.length === 0) break;
      
      // Process each record in a transaction
      for (const record of records) {
        await db.$transaction(async (tx) => {
          // Mark as processing to prevent other jobs from picking it up
          await tx.record.update({
            where: { id: record.id },
            data: { status: 'processing' }
          });
          
          // Do the actual processing
          const result = await processRecord(record);
          
          // Update with the result
          await tx.record.update({
            where: { id: record.id },
            data: { 
              status: 'completed',
              result: result
            }
          });
        });
        
        processed++;
      }
    }
    
    return { success: true, processed };
  } catch (error) {
    console.error('Error in job:', error);
    return { success: false, error };
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
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Common Cron Job Examples</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Data Cleanup</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// cron/jobs/cleanup.js
import { db } from '@/lib/db';
import { subDays } from 'date-fns';

const job = {
  name: 'cleanup',
  displayName: 'Database Cleanup',
  description: 'Removes old temporary data and logs',
  schedule: '0 0 * * *', // Daily at midnight
  
  async execute() {
    const thirtyDaysAgo = subDays(new Date(), 30);
    
    // Delete old logs
    const deletedLogs = await db.log.deleteMany({
      where: {
        createdAt: {
          lt: thirtyDaysAgo
        }
      }
    });
    
    // Delete expired sessions
    const deletedSessions = await db.session.deleteMany({
      where: {
        expires: {
          lt: new Date()
        }
      }
    });
    
    return {
      success: true,
      message: 'Cleanup completed',
      data: {
        deletedLogs: deletedLogs.count,
        deletedSessions: deletedSessions.count
      }
    };
  }
};

export default job;`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Sending Scheduled Emails</h3>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// cron/jobs/reminder-emails.js
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { addDays } from 'date-fns';

const job = {
  name: 'reminder-emails',
  displayName: 'Reminder Emails',
  description: 'Sends reminder emails for upcoming renewals',
  schedule: '0 9 * * *', // Every day at 9 AM
  
  async execute() {
    // Find subscriptions expiring in 7 days
    const expiringDate = addDays(new Date(), 7);
    const startOfDay = new Date(expiringDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(expiringDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const subscriptions = await db.subscription.findMany({
      where: {
        expiresAt: {
          gte: startOfDay,
          lte: endOfDay
        },
        status: 'active'
      },
      include: {
        user: true
      }
    });
    
    const results = [];
    
    for (const subscription of subscriptions) {
      try {
        await sendEmail({
          to: subscription.user.email,
          template: 'subscription-renewal',
          data: {
            name: subscription.user.name,
            planName: subscription.planName,
            expiryDate: subscription.expiresAt.toLocaleDateString(),
            renewalUrl: \`\${process.env.NEXT_PUBLIC_APP_URL}/account/billing\`
          }
        });
        
        results.push({
          userId: subscription.userId,
          status: 'sent'
        });
      } catch (error) {
        results.push({
          userId: subscription.userId,
          status: 'failed',
          error: error.message
        });
      }
    }
    
    return {
      success: true,
      message: \`Sent \${results.filter(r => r.status === 'sent').length} reminder emails\`,
      data: { results }
    };
  }
};

export default job;`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Next Steps</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Create Cron Tasks</h3>
            <p className="mt-2 text-gray-600">
              Learn how to create and customize cron tasks using the CLI.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/cli/cron-tasks"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Cron Task Generation →
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Email Service</h3>
            <p className="mt-2 text-gray-600">
              Learn about sending emails from your cron jobs.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/features/email"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Email Service →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}