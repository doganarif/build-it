# Cron Jobs / Background Tasks

This module provides a simple way to schedule and run background tasks in your application using Node.js cron.

## Features

- 📅 Schedule tasks with cron syntax
- 🚀 Run tasks on a schedule or manually
- 📊 Track task execution history
- 🔄 Manage tasks through UI or API
- 🛡️ Error handling and logging

## Usage

### Configuration

To enable cron jobs, set the `ENABLE_CRON_JOBS` environment variable to `true`. By default, cron jobs are enabled in production.

```sh
# In .env file
ENABLE_CRON_JOBS=true
```

### Creating a new task

1. Create a new file in `lib/cron/tasks/` that exports an async function:

```js
'use server';

import { db } from '@/lib/db';

export async function myCustomTask() {
  try {
    // Implement your task logic here
    console.log('Running my custom task');
    
    // Do something with the database
    const result = await db.user.count();
    
    console.log(`Found ${result} users`);
    
    return { success: true, count: result };
  } catch (error) {
    console.error('Error in custom task:', error);
    return { success: false, error: error.message };
  }
}
```

2. Register the task in `lib/cron/tasks/registry.js`:

```js
// This file should NOT have 'use server' at the top
import { myCustomTask } from './myCustomTask';

const tasks = [
  // ...existing tasks
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
}
```

3. Export the task in `lib/cron/tasks/index.js`:

```js
'use server';

import { myCustomTask } from './myCustomTask';

// Export async functions directly
export {
  // ...existing exports
  myCustomTask
};
```

### Cron syntax

Cron syntax follows the standard format: `* * * * *` (minute, hour, day of month, month, day of week)

Examples:
- `0 * * * *` - Run every hour at minute 0
- `0 0 * * *` - Run every day at midnight
- `0 0 * * 0` - Run every Sunday at midnight
- `0 0 1 * *` - First day of every month at midnight
- `*/15 * * * *` - Run every 15 minutes

### Running tasks manually

You can run tasks manually using the server action:

```js
import { runCronJob } from '@/lib/cron';

// Run a job by name
const result = await runCronJob('my-custom-task');
```

Or use the UI at `/dashboard/cron` to manage and run jobs.

### Tracking job runs

Job runs are stored in the database in the `CronJobRun` model. You can query them to see execution history.

```js
import { db } from '@/lib/db';

// Get recent job runs
const recentRuns = await db.cronJobRun.findMany({
  orderBy: { startedAt: 'desc' },
  take: 10
});
```

### Architecture Notes

This cron system follows Next.js's best practices for server components and actions:

1. **Server Actions**: Files with `'use server'` directive only export async functions.
2. **Regular Modules**: Configuration and utility functions live in regular modules without the `'use server'` directive.
3. **Client Utilities**: For client components, use the utilities in `lib/cron/client.js`.

## Best Practices

1. Keep tasks focused on a single responsibility
2. Include error handling in every task
3. Return structured results from tasks
4. Set appropriate schedules (avoid running heavy tasks too frequently)
5. Use transactions for database operations when appropriate
6. Add logging for monitoring and debugging 