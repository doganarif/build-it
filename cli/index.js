#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

program
  .name('buildit-cli')
  .description('CLI tool for code generation and utilities')
  .version('1.0.0');

// Register generate command with subcommands
program
  .command('generate')
  .alias('g')
  .description('Generate code artifacts')
  .addCommand(
    program
      .createCommand('email')
      .alias('e')
      .description('Generate email template')
      .action(() => {
        const generatorPath = path.join(__dirname, 'generator.js');
        execSync(`node ${generatorPath} email`, { stdio: 'inherit' });
      })
  )
  .addCommand(
    program
      .createCommand('cron')
      .alias('c')
      .description('Generate cron task')
      .action(() => {
        const generatorPath = path.join(__dirname, 'generator.js');
        execSync(`node ${generatorPath} cron`, { stdio: 'inherit' });
      })
  )
  .addCommand(
    program
      .createCommand('api')
      .alias('a')
      .description('Generate API route')
      .action(() => {
        const generatorPath = path.join(__dirname, 'api-generator.js');
        execSync(`node ${generatorPath}`, { stdio: 'inherit' });
      })
  );

// Add commands for listing emails and cron jobs
program
  .command('list')
  .alias('l')
  .description('List project resources')
  .option('-e, --emails', 'List email templates')
  .option('-c, --cron', 'List cron jobs')
  .option('-a, --api', 'List API routes')
  .action((options) => {
    const rootDir = path.resolve(__dirname, '..');
    
    if (options.emails) {
      const emailTemplatesDir = path.join(rootDir, 'lib', 'email', 'templates');
      console.log('\n📧 Email Templates:');
      console.log('================');
      
      try {
        const templates = fs.readdirSync(emailTemplatesDir, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name);
          
        if (templates.length === 0) {
          console.log('No email templates found');
        } else {
          templates.forEach(template => {
            console.log(`- ${template}`);
          });
        }
      } catch (err) {
        console.error('Error reading email templates directory:', err.message);
      }
    }
    
    if (options.cron) {
      const cronTasksDir = path.join(rootDir, 'lib', 'cron', 'tasks');
      console.log('\n⏰ Cron Jobs:');
      console.log('===========');
      
      try {
        // Try to read registry.js to get schedule information
        const registryPath = path.join(cronTasksDir, 'registry.js');
        if (fs.existsSync(registryPath)) {
          const content = fs.readFileSync(registryPath, 'utf8');
          const tasks = content.match(/name:\s*['"](.+?)['"]/g) || [];
          const schedules = content.match(/schedule:\s*['"](.+?)['"]/g) || [];
          
          if (tasks.length > 0) {
            for (let i = 0; i < tasks.length; i++) {
              const name = tasks[i].match(/['"](.+?)['"]/)[1];
              const schedule = schedules[i]?.match(/['"](.+?)['"]/)[1] || 'Schedule not found';
              console.log(`- ${name.padEnd(20)} (${schedule})`);
            }
          } else {
            console.log('No cron jobs found in registry');
          }
        } else {
          // Fallback to listing JS files in the directory
          const tasks = fs.readdirSync(cronTasksDir, { withFileTypes: true })
            .filter(dirent => dirent.isFile() && dirent.name.endsWith('.js'))
            .map(dirent => dirent.name.replace('.js', ''));
            
          if (tasks.length === 0) {
            console.log('No cron tasks found');
          } else {
            tasks.forEach(task => {
              console.log(`- ${task}`);
            });
          }
        }
      } catch (err) {
        console.error('Error reading cron tasks directory:', err.message);
      }
    }
    
    if (options.api) {
      const apiRoutesDir = path.join(rootDir, 'app', 'api');
      console.log('\n🌐 API Routes:');
      console.log('===========');
      
      try {
        if (fs.existsSync(apiRoutesDir)) {
          // Function to recursively scan directories for route.js files
          const findRoutes = (dir, basePath = '') => {
            let routes = [];
            const items = fs.readdirSync(dir, { withFileTypes: true });
            
            for (const item of items) {
              const itemPath = path.join(dir, item.name);
              const routePath = path.join(basePath, item.name);
              
              if (item.isDirectory()) {
                // Check if the directory contains a route.js file
                const routeFile = path.join(itemPath, 'route.js');
                if (fs.existsSync(routeFile)) {
                  routes.push(routePath);
                }
                
                // Recursively scan subdirectories
                routes = [...routes, ...findRoutes(itemPath, routePath)];
              }
            }
            
            return routes;
          };
          
          const routes = findRoutes(apiRoutesDir);
          
          if (routes.length === 0) {
            console.log('No API routes found');
          } else {
            routes.forEach(route => {
              console.log(`- /api/${route}`);
            });
          }
        } else {
          console.log('No API routes directory found');
        }
      } catch (err) {
        console.error('Error reading API routes directory:', err.message);
      }
    }
    
    if (!options.emails && !options.cron && !options.api) {
      console.log('Please specify what to list (--emails, --cron, --api)');
    }
  });

// Add command to run a cron job manually
program
  .command('run-job <jobName>')
  .description('Run a cron job manually')
  .action(async (jobName) => {
    console.log(`Running cron job '${jobName}'...`);
    
    try {
      // Run a Node.js script to invoke the cron job
      const runScript = `
        const { runCronJob } = require('../lib/cron');
        
        (async () => {
          try {
            const result = await runCronJob('${jobName}');
            console.log('Job result:', result);
          } catch (error) {
            console.error('Error running job:', error);
            process.exit(1);
          }
        })();
      `;
      
      const tempFile = path.join(__dirname, 'temp-run-job.js');
      fs.writeFileSync(tempFile, runScript);
      
      try {
        execSync(`node ${tempFile}`, { stdio: 'inherit' });
      } finally {
        // Clean up temp file
        fs.unlinkSync(tempFile);
      }
    } catch (err) {
      console.error('Error running cron job:', err.message);
    }
  });

// Send test email command
program
  .command('send-test-email <template> <email>')
  .description('Send a test email using a template')
  .action(async (template, email) => {
    console.log(`Sending test email using template '${template}' to ${email}...`);
    
    try {
      // Run a Node.js script to send the test email
      const runScript = `
        const { emailService } = require('../lib/email');
        
        (async () => {
          try {
            const result = await emailService.sendEmail({
              to: '${email}',
              templateName: '${template}',
              templateData: {
                user: {
                  name: 'Test User',
                  email: '${email}'
                },
                date: new Date().toISOString().split('T')[0],
                resetUrl: 'https://example.com/reset',
                activationUrl: 'https://example.com/activate',
                subscriptionUrl: 'https://example.com/subscriptions'
              }
            });
            
            console.log('Email sent successfully!');
          } catch (error) {
            console.error('Error sending email:', error);
            process.exit(1);
          }
        })();
      `;
      
      const tempFile = path.join(__dirname, 'temp-send-email.js');
      fs.writeFileSync(tempFile, runScript);
      
      try {
        execSync(`node ${tempFile}`, { stdio: 'inherit' });
      } finally {
        // Clean up temp file
        fs.unlinkSync(tempFile);
      }
    } catch (err) {
      console.error('Error sending test email:', err.message);
    }
  });

// Parse command line arguments
program.parse(process.argv);

// Show help if no args provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
} 