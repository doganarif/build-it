'use server';

import { cleanupTask } from './cleanupTask';
import { emailDigestTask } from './emailDigestTask';
import { dataSyncTask } from './dataSyncTask';

// Only export the async functions directly
export {
  cleanupTask,
  emailDigestTask,
  dataSyncTask
}; 