# BuildIt CLI

A command-line interface tool for generating and managing code artifacts in your application.

## Installation

First, install the dependencies:

```bash
npm install
```

Then, you can use the CLI in one of two ways:

1. Using the npm script:
```bash
npm run cli -- <command>
```

2. Using a global installation:
```bash
npm link
buildit <command>
```

## Commands

### Generate Code Artifacts

Generate various code artifacts like email templates, cron jobs, and API routes:

```bash
# Generate an email template
npm run cli -- generate email

# Generate a cron job
npm run cli -- generate cron

# Generate an API route
npm run cli -- generate api
```

Shorthand aliases are also available:

```bash
npm run cli -- g e  # Generate email template
npm run cli -- g c  # Generate cron job
npm run cli -- g a  # Generate API route
```

### List Resources

List existing resources in your application:

```bash
# List all email templates
npm run cli -- list --emails

# List all cron jobs
npm run cli -- list --cron

# List all API routes
npm run cli -- list --api

# List all resources
npm run cli -- list --emails --cron --api
```

Shorthand aliases are available:

```bash
npm run cli -- l -e  # List email templates
npm run cli -- l -c  # List cron jobs
npm run cli -- l -a  # List API routes
```

### Run Cron Jobs Manually

Execute a cron job manually for testing:

```bash
npm run cli -- run-job <jobName>
```

Example:
```bash
npm run cli -- run-job cleanup
```

### Send Test Emails

Send a test email using a specific template:

```bash
npm run cli -- send-test-email <templateName> <emailAddress>
```

Example:
```bash
npm run cli -- send-test-email welcome test@example.com
```

## Email Templates

Email templates are stored in `lib/email/templates/{template-name}/` and consist of:

- `subject.txt` - Email subject line
- `html.html` - HTML version of the email
- `text.txt` - Plain text version of the email

Templates support variables using the `{{variable.name}}` syntax.

## Cron Jobs

Cron jobs are stored in `lib/cron/tasks/` and are registered in the `lib/cron/tasks/registry.js` file. Each job has:

- A unique name
- A cron schedule (e.g., `0 * * * *` for every hour)
- A handler function that executes the job logic

## API Routes

API routes are defined in `app/api/{route-name}/route.js` and can implement any combination of HTTP methods (GET, POST, PUT, DELETE). 