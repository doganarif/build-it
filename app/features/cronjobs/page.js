import React from 'react';

export const metadata = {
  title: 'Cron Jobs - BuildIt',
  description: 'Learn how to use cron jobs and background tasks in BuildIt',
};

export default function CronJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-6">Cron Jobs & Background Tasks</h1>
      
      <div className="prose prose-blue max-w-none">
        <p className="lead text-xl">
          BuildIt includes a powerful cron job system to handle scheduled tasks and background operations.
          This guide will help you understand how to use and customize it for your application needs.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">What are Cron Jobs?</h2>
        <p>
          Cron jobs are scheduled tasks that run at specified intervals. They're perfect for tasks like:
        </p>
        <ul className="list-disc ml-6 my-4">
          <li>Cleaning up old data or sessions</li>
          <li>Generating reports or analytics</li>
          <li>Sending scheduled emails (daily digests, weekly newsletters)</li>
          <li>Syncing data with external services</li>
          <li>Processing queued tasks</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Getting Started</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Enabling Cron Jobs</h3>
        <p>
          By default, cron jobs are enabled in production environments. To enable them in development,
          set <code>ENABLE_CRON_JOBS=true</code> in your <code>.env</code> file.
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md my-4">
          <pre className="text-sm">
            <code>
              # In .env file
              ENABLE_CRON_JOBS=true
            </code>
          </pre>
        </div>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Managing Cron Jobs</h3>
        <p>
          You can view and manage your cron jobs from the dashboard at{' '}
          <a href="/dashboard/cron" className="text-blue-600 hover:underline">
            /dashboard/cron
          </a>
          . This interface allows you to:
        </p>
        <ul className="list-disc ml-6 my-4">
          <li>See all registered cron jobs and their schedules</li>
          <li>Manually trigger jobs to run immediately</li>
          <li>View job execution history and results</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Creating Custom Cron Jobs</h2>
        
        <p>
          Creating your own cron job is a simple process:
        </p>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Step 1: Create a Task Handler</h3>
        <p>
          First, create a file in <code>lib/cron/tasks/</code> with your task logic:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md my-4">
          <pre className="text-sm whitespace-pre-wrap">
            <code>
{`// lib/cron/tasks/myCustomTask.js
'use server';

import { db } from '@/lib/db';

export async function myCustomTask() {
  try {
    // Your task logic here
    console.log('Running my custom task');
    
    // Example: Count users
    const userCount = await db.user.count();
    console.log(\`Found \${userCount} users\`);
    
    return { success: true, userCount };
  } catch (error) {
    console.error('Error in custom task:', error);
    return { success: false, error: error.message };
  }
}`}
            </code>
          </pre>
        </div>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Step 2: Register the Task</h3>
        <p>
          Next, register your task in <code>lib/cron/tasks/registry.js</code>:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md my-4">
          <pre className="text-sm whitespace-pre-wrap">
            <code>
{`// lib/cron/tasks/registry.js
import { myCustomTask } from './myCustomTask';

const tasks = [
  // Existing tasks...
  {
    name: 'my-custom-task',
    schedule: '0 * * * *', // Run every hour
    handler: myCustomTask
  }
];

export function getTasks() {
  return tasks;
}

export function getTaskByName(name) {
  return tasks.find(task => task.name === name) || null;
}`}
            </code>
          </pre>
        </div>
        
        <h3 className="text-xl font-semibold mt-6 mb-3">Step 3: Export the Task</h3>
        <p>
          Finally, export your task in <code>lib/cron/tasks/index.js</code>:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md my-4">
          <pre className="text-sm whitespace-pre-wrap">
            <code>
{`'use server';

import { myCustomTask } from './myCustomTask';
// Other imports...

// Export all task functions
export {
  // Existing exports...
  myCustomTask
};`}
            </code>
          </pre>
        </div>
        
        <p>
          After adding your task, restart the server to initialize it. Your new task will appear in the dashboard.
        </p>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Understanding Cron Syntax</h2>
        
        <p>
          Cron schedules use the standard cron syntax format:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md my-4 overflow-x-auto">
          <pre className="text-sm">
            <code>
              * * * * *
              │ │ │ │ │
              │ │ │ │ └─── day of week (0 - 7) (0 or 7 is Sun)
              │ │ │ └───── month (1 - 12)
              │ │ └─────── day of month (1 - 31)
              │ └───────── hour (0 - 23)
              └─────────── minute (0 - 59)
            </code>
          </pre>
        </div>
        
        <p>Common examples:</p>
        <ul className="list-disc ml-6 my-4">
          <li><code>* * * * *</code> - Every minute</li>
          <li><code>0 * * * *</code> - Every hour at minute 0</li>
          <li><code>0 0 * * *</code> - Every day at midnight</li>
          <li><code>0 0 * * 0</code> - Every Sunday at midnight</li>
          <li><code>0 0 1 * *</code> - First day of every month at midnight</li>
          <li><code>*/15 * * * *</code> - Every 15 minutes</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Running Tasks Programmatically</h2>
        
        <p>
          You can trigger cron jobs programmatically using the server action:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md my-4">
          <pre className="text-sm whitespace-pre-wrap">
            <code>
{`import { runCronJob } from '@/lib/cron';

// In a server action or server component
const result = await runCronJob('my-custom-task');
console.log(result); // { success: true, result: {...} }`}
            </code>
          </pre>
        </div>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Best Practices</h2>
        
        <ul className="list-disc ml-6 my-4">
          <li>Keep tasks focused on a single responsibility</li>
          <li>Include proper error handling in every task</li>
          <li>Set appropriate schedules to avoid overloading your server</li>
          <li>Use database transactions when performing multiple related operations</li>
          <li>Add detailed logging for monitoring and debugging</li>
          <li>Consider splitting very large tasks into smaller subtasks</li>
        </ul>
        
        <h2 className="text-2xl font-bold mt-8 mb-4">Tracking Job Execution</h2>
        
        <p>
          All job runs are automatically tracked in the database using the <code>CronJobRun</code> model.
          You can query these records to analyze job performance or troubleshoot issues:
        </p>
        
        <div className="bg-gray-100 p-4 rounded-md my-4">
          <pre className="text-sm whitespace-pre-wrap">
            <code>
{`import { db } from '@/lib/db';

// Get recent runs for a specific job
const jobRuns = await db.cronJobRun.findMany({
  where: { jobName: 'my-custom-task' },
  orderBy: { startedAt: 'desc' },
  take: 10
});

// Find failed jobs
const failedJobs = await db.cronJobRun.findMany({
  where: { status: 'failed' },
  orderBy: { startedAt: 'desc' }
});`}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
} 