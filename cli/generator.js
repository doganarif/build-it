#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { promisify } = require('util');
const { mkdirp } = require('mkdirp');
const writeFile = promisify(fs.writeFile);
const exists = promisify(fs.exists);

// Set up paths
const rootDir = path.resolve(__dirname, '..');
const emailTemplatesDir = path.join(rootDir, 'lib', 'email', 'templates');
const cronTasksDir = path.join(rootDir, 'lib', 'cron', 'tasks');

// Parse command-line arguments
const args = process.argv.slice(2);
let mode = '';

// Check for direct operation mode from CLI args
if (args.length > 0) {
  if (args[0] === 'email') {
    mode = '1'; // Email template generation
  } else if (args[0] === 'cron') {
    mode = '2'; // Cron task generation
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (text) => new Promise((resolve) => rl.question(text, resolve));

/**
 * Email template generator 
 */
async function generateEmailTemplate() {
  console.log('\n📧 Email Template Generator');
  console.log('========================\n');
  
  // Get template name
  const templateName = await question('Template name (kebab-case, e.g. "order-confirmation"): ');
  
  if (!templateName) {
    console.log('❌ Template name is required');
    return;
  }
  
  // Get subject line
  const subject = await question('Email subject line: ');
  
  if (!subject) {
    console.log('❌ Subject line is required');
    return;
  }
  
  // Template directory
  const templateDir = path.join(emailTemplatesDir, templateName);
  
  // Check if template already exists
  if (await exists(templateDir)) {
    const overwrite = await question('⚠️ Template already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Operation cancelled');
      return;
    }
  }
  
  // Create template directory
  await mkdirp(templateDir);
  
  // Create subject.txt
  await writeFile(
    path.join(templateDir, 'subject.txt'),
    subject.trim()
  );
  
  // Create HTML template
  const customizableHtml = await question('Do you want to customize the HTML template? (y/N): ');
  
  let htmlContent;
  if (customizableHtml.toLowerCase() === 'y') {
    // Let user input key variables for the template
    console.log('\nLet\'s add some variables to your template:');
    const recipientName = await question('Recipient name variable (default: {{user.name}}): ') || '{{user.name}}';
    const buttonText = await question('Call-to-action button text (optional): ');
    const buttonUrl = buttonText ? await question('Call-to-action button URL variable (e.g. {{resetUrl}}): ') : '';
    
    // Generate HTML with user's variables
    htmlContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #3b82f6;">${subject}</h1>
  <p>Hello ${recipientName},</p>
  <p>Thank you for using our application.</p>
  ${buttonText ? `
  <div style="margin: 30px 0; text-align: center;">
    <a href="${buttonUrl}" style="background-color: #3b82f6; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px;">${buttonText}</a>
  </div>` : ''}
  <p>If you have any questions, feel free to reply to this email.</p>
  <p>Best regards,</p>
  <p>The Team</p>
</div>`;
  } else {
    // Default HTML template
    htmlContent = `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #3b82f6;">${subject}</h1>
  <p>Hello {{user.name}},</p>
  <p>Thank you for using our application.</p>
  <p>If you have any questions, feel free to reply to this email.</p>
  <p>Best regards,</p>
  <p>The Team</p>
</div>`;
  }

  // Write HTML template
  await writeFile(
    path.join(templateDir, 'html.html'),
    htmlContent
  );
  
  // Create text template
  const textContent = `Hello {{user.name}},

Thank you for using our application.

If you have any questions, feel free to reply to this email.

Best regards,
The Team`;

  await writeFile(
    path.join(templateDir, 'text.txt'),
    textContent
  );
  
  console.log(`\n✅ Email template "${templateName}" created successfully!`);
  console.log(`📂 Location: ${templateDir}`);
  
  // Add info on how to use the template
  console.log('\nTo use this template in your code:');
  console.log(`
  await emailService.sendEmail({
    to: user.email,
    templateName: '${templateName}',
    templateData: {
      user: {
        name: user.name
      }
      // Add more variables as needed
    }
  });`);
}

/**
 * Cron job task generator 
 */
async function generateCronTask() {
  console.log('\n⏰ Cron Task Generator');
  console.log('===================\n');
  
  // Get task name
  const taskName = await question('Task name (camelCase, e.g. "dataBackupTask"): ');
  
  if (!taskName) {
    console.log('❌ Task name is required');
    return;
  }
  
  // Get cron schedule
  console.log('\nCommon cron schedules:');
  console.log('- Every hour: 0 * * * *');
  console.log('- Every day at midnight: 0 0 * * *');
  console.log('- Every Monday at 9am: 0 9 * * 1');
  console.log('- Every 10 minutes: */10 * * * *');
  
  const schedule = await question('\nCron schedule: ');
  
  if (!schedule) {
    console.log('❌ Cron schedule is required');
    return;
  }
  
  // Get task description
  const description = await question('Task description: ');
  
  // File path
  const filePath = path.join(cronTasksDir, `${taskName}.js`);
  
  // Check if task already exists
  if (await exists(filePath)) {
    const overwrite = await question('⚠️ Task already exists. Overwrite? (y/N): ');
    if (overwrite.toLowerCase() !== 'y') {
      console.log('Operation cancelled');
      return;
    }
  }
  
  // Ask if this task interacts with the database
  const usesDb = await question('Does this task interact with the database? (Y/n): ');
  
  // Ask if this task sends emails
  const sendsEmails = await question('Does this task send emails? (y/N): ');
  
  // Generate task content
  let taskContent = `'use server';

`;

  // Add imports based on features
  if (usesDb.toLowerCase() !== 'n') {
    taskContent += `import { db } from '@/lib/db';\n`;
  }
  
  if (sendsEmails.toLowerCase() === 'y') {
    taskContent += `import { emailService } from '@/lib/email';\n`;
  }
  
  taskContent += `
/**
 * ${description || `Task named ${taskName}`}
 */
export async function ${taskName}() {
  console.log('Running ${taskName}');
  
  try {
`;

  // Add example code based on features
  if (usesDb.toLowerCase() !== 'n') {
    taskContent += `    // Example database operations
    const users = await db.user.findMany({
      where: {
        // Add conditions as needed
      },
      take: 10 // Limit results for example
    });
    
    console.log(\`Found \${users.length} users\`);
`;
  }

  if (sendsEmails.toLowerCase() === 'y') {
    taskContent += `
    // Example email sending
    if (${usesDb.toLowerCase() !== 'n' ? 'users.length > 0' : 'true'}) {
      ${usesDb.toLowerCase() !== 'n' ? 'for (const user of users) {' : '// Replace with actual recipient emails'}
        await emailService.sendEmail({
          to: ${usesDb.toLowerCase() !== 'n' ? 'user.email' : '"recipient@example.com"'},
          templateName: 'welcome', // Change to appropriate template
          templateData: {
            user: {
              name: ${usesDb.toLowerCase() !== 'n' ? 'user.name' : '"User"'}
            }
          }
        });
      ${usesDb.toLowerCase() !== 'n' ? '}' : ''}
    }
`;
  }

  taskContent += `
    // Your custom task logic here
    
    return {
      success: true,
      // Add more result data as needed
    };
  } catch (error) {
    console.error('Error in ${taskName}:', error);
    return { success: false, error: error.message };
  }
}`;

  // Write the task file
  await writeFile(filePath, taskContent);
  
  // Generate registry update instructions
  console.log(`\n✅ Cron task "${taskName}" created successfully!`);
  console.log(`📄 File created: ${filePath}`);
  
  console.log('\nTo add this task to your cron schedule, update lib/cron/tasks/registry.js:');
  console.log(`
1. Add the import:
   import { ${taskName} } from './${taskName}';

2. Add to the tasks array:
   {
     name: '${taskName.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/-task$/, '')}',
     schedule: '${schedule}',
     handler: ${taskName}
   }`);
  
  console.log('\nAlso update the exports in lib/cron/tasks/index.js:');
  console.log(`
export { ${taskName} } from './${taskName}';`);
}

/**
 * Main CLI function
 */
async function main() {
  // If direct mode was specified via command-line arguments, run that directly
  if (mode) {
    if (mode === '1') {
      await generateEmailTemplate();
      rl.close();
      return;
    } else if (mode === '2') {
      await generateCronTask();
      rl.close();
      return;
    }
  }

  // Interactive mode
  console.log('🔧 Code Generator CLI');
  console.log('==================\n');
  
  console.log('What would you like to generate?');
  console.log('1. Email Template');
  console.log('2. Cron Task');
  console.log('3. Exit');
  
  const choice = await question('\nEnter your choice (1-3): ');
  
  switch (choice) {
    case '1':
      await generateEmailTemplate();
      break;
    case '2':
      await generateCronTask();
      break;
    case '3':
      console.log('Goodbye!');
      rl.close();
      return;
    default:
      console.log('Invalid choice');
  }
  
  const again = await question('\nGenerate another item? (y/N): ');
  if (again.toLowerCase() === 'y') {
    await main();
  } else {
    rl.close();
  }
}

// Start the CLI
main().catch(err => {
  console.error('An error occurred:', err);
  rl.close();
}); 