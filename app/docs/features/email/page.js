import Link from 'next/link';

export const metadata = {
  title: 'Email Service - BuildIt Documentation',
  description: 'Documentation for the email service in BuildIt',
};

export default function EmailServicePage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Email Service</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          BuildIt includes a flexible email service that supports multiple providers
          and a templating system for sending beautiful, responsive transactional emails.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p>
          The email service in BuildIt provides:
        </p>
        <ul className="mt-4 space-y-2">
          <li>Support for multiple email providers (SendGrid, Amazon SES, Mailchimp, Resend)</li>
          <li>HTML and plain text email templates</li>
          <li>Dynamic content with variable substitution</li>
          <li>File-based template discovery</li>
          <li>Responsive email layouts</li>
          <li>Email sending queue and retry logic</li>
          <li>Template previews during development</li>
        </ul>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Configuration</h2>
        <p>
          Configure the email service in your <code>.env</code> file:
        </p>
        <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
          <code>
{`# Email Configuration
EMAIL_PROVIDER=sendgrid  # Options: sendgrid, ses, mailchimp, resend
EMAIL_FROM=noreply@example.com
EMAIL_REPLY_TO=support@example.com

# Provider Specific Settings
SENDGRID_API_KEY=your_sendgrid_api_key

# Or for AWS SES
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key

# Or for Resend
RESEND_API_KEY=your_resend_api_key

# Or for Mailchimp Transactional (Mandrill)
MAILCHIMP_API_KEY=your_mailchimp_api_key`}
          </code>
        </pre>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Email Templates</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Template Structure</h3>
          <p>
            Email templates are stored in the <code>emails/templates</code> directory. Each template has its own 
            folder containing HTML and text versions of the email:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`emails/
  templates/
    welcome/
      html.ejs  # HTML version of the email
      text.ejs  # Plain text version
    password-reset/
      html.ejs
      text.ejs
    verification/
      html.ejs
      text.ejs`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Template Format</h3>
          <p>
            Templates use EJS (Embedded JavaScript) for dynamic content. Here's an example of an HTML template:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`<!-- emails/templates/welcome/html.ejs -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to <%= appName %></title>
  <style>
    /* Email styles */
    body { 
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #4F46E5;
      color: white;
      text-decoration: none;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to <%= appName %>!</h1>
    <p>Hello <%= name %>,</p>
    <p>Thank you for signing up. We're excited to have you on board.</p>
    <% if (verificationRequired) { %>
      <p>Please verify your email address by clicking the button below:</p>
      <p><a href="<%= verificationUrl %>" class="button">Verify Email</a></p>
    <% } %>
    <p>If you have any questions, please don't hesitate to contact our support team.</p>
    <p>Best regards,<br>The <%= appName %> Team</p>
  </div>
</body>
</html>`}
            </code>
          </pre>

          <p className="mt-4">
            And the corresponding plain text version:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`<!-- emails/templates/welcome/text.ejs -->
Welcome to <%= appName %>!

Hello <%= name %>,

Thank you for signing up. We're excited to have you on board.

<% if (verificationRequired) { %>
Please verify your email address by visiting the link below:
<%= verificationUrl %>
<% } %>

If you have any questions, please don't hesitate to contact our support team.

Best regards,
The <%= appName %> Team`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Creating Email Templates</h3>
          <p>
            You can create new email templates using the CLI tool:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- generate email</code>
          </pre>
          <p className="mt-2">
            The CLI will prompt you for the template name and guide you through the creation process.
          </p>
          <div className="mt-2">
            <Link
              href="/docs/cli/email-templates"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Learn more about email template generation →
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Sending Emails</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Basic Usage</h3>
          <p>
            Send emails using the <code>sendEmail</code> function:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`import { sendEmail } from '@/lib/email';

// Send a welcome email
await sendEmail({
  to: 'user@example.com',
  template: 'welcome',
  data: {
    name: 'John Doe',
    appName: 'BuildIt',
    verificationRequired: true,
    verificationUrl: 'https://example.com/verify?token=123456'
  }
});`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Email Options</h3>
          <p>
            The <code>sendEmail</code> function accepts the following options:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// Full options
await sendEmail({
  // Required
  to: 'user@example.com',  // Recipient email address
  template: 'welcome',     // Template name (folder name in templates/)
  data: {},                // Data to pass to the template
  
  // Optional
  from: 'custom@example.com',  // Override default from address
  subject: 'Custom Subject',   // Override default subject
  replyTo: 'reply@example.com', // Override default reply-to
  cc: ['cc@example.com'],       // CC recipients
  bcc: ['bcc@example.com'],     // BCC recipients
  attachments: [                // Email attachments
    {
      content: Buffer.from('...'),
      filename: 'attachment.pdf',
      contentType: 'application/pdf'
    }
  ]
});`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Subject Lines</h3>
          <p>
            Email subjects can be defined in a configuration file or overridden when sending:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// emails/config.js
export const emailSubjects = {
  welcome: 'Welcome to BuildIt!',
  'password-reset': 'Reset Your Password',
  verification: 'Verify Your Email Address',
  // Add more subjects here
};`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Testing Emails</h3>
          <p>
            You can send test emails using the CLI:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- send-test-email welcome test@example.com</code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Email Providers</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Supported Providers</h3>
          <p>
            BuildIt supports multiple email providers. You can switch between them by changing the
            <code>EMAIL_PROVIDER</code> environment variable:
          </p>
          <ul className="mt-2 space-y-2">
            <li>
              <strong>SendGrid</strong> - Set <code>EMAIL_PROVIDER=sendgrid</code> and configure
              <code>SENDGRID_API_KEY</code>
            </li>
            <li>
              <strong>Amazon SES</strong> - Set <code>EMAIL_PROVIDER=ses</code> and configure AWS credentials
            </li>
            <li>
              <strong>Resend</strong> - Set <code>EMAIL_PROVIDER=resend</code> and configure
              <code>RESEND_API_KEY</code>
            </li>
            <li>
              <strong>Mailchimp Transactional</strong> - Set <code>EMAIL_PROVIDER=mailchimp</code> and configure
              <code>MAILCHIMP_API_KEY</code>
            </li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Adding Custom Providers</h3>
          <p>
            You can extend the email service with custom providers by creating a new provider class:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// lib/email/providers/custom.js
export class CustomEmailProvider {
  async send(options) {
    // Implement the sending logic for your custom provider
    // options contains: to, from, subject, html, text, etc.
    
    // Your implementation here
    
    return { 
      id: 'custom-id',
      success: true 
    };
  }
}

// Then register in lib/email/index.js
import { CustomEmailProvider } from './providers/custom';

const providers = {
  sendgrid: new SendGridProvider(),
  ses: new SESProvider(),
  mailchimp: new MailchimpProvider(),
  resend: new ResendProvider(),
  custom: new CustomEmailProvider(), // Add your custom provider
};`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Email Layouts</h2>
        <p>
          BuildIt provides common layouts for your email templates. The default layout includes
          header and footer sections that can be customized:
        </p>
        <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
          <code>
{`// emails/layouts/default.ejs
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><%= subject %></title>
  <style>
    /* Shared email styles */
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="<%= logoUrl %>" alt="<%= appName %>" height="40">
    </div>
    
    <div class="content">
      <%- content %>
    </div>
    
    <div class="footer">
      <p>&copy; <%= new Date().getFullYear() %> <%= appName %>. All rights reserved.</p>
      <p>
        <a href="<%= unsubscribeUrl %>">Unsubscribe</a> &bull;
        <a href="<%= preferencesUrl %>">Email Preferences</a>
      </p>
    </div>
  </div>
</body>
</html>`}
          </code>
        </pre>
        <p className="mt-4">
          To use a layout in your template, import it at the top of your template file:
        </p>
        <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
          <code>
{`<!-- emails/templates/welcome/html.ejs -->
<%- include('../../layouts/default', { 
  content: /* your email content */, 
  subject: 'Welcome to BuildIt',
  logoUrl: 'https://example.com/logo.png',
  appName: 'BuildIt',
  unsubscribeUrl: '#',
  preferencesUrl: '#'
}) %>`}
          </code>
        </pre>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Email Tracking</h2>
        <p>
          BuildIt can track email delivery and events if your provider supports it:
        </p>
        <ul className="mt-4 space-y-2">
          <li>Delivery status (delivered, bounced, etc.)</li>
          <li>Open tracking</li>
          <li>Click tracking</li>
        </ul>
        <p className="mt-4">
          Enable tracking in your email configuration:
        </p>
        <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
          <code>
{`// Tracking options when sending email
await sendEmail({
  to: 'user@example.com',
  template: 'welcome',
  data: { /* ... */ },
  tracking: {
    open: true,         // Track opens
    click: true,        // Track clicks
    googleAnalytics: {  // Add Google Analytics parameters
      enable: true,
      utmSource: 'email',
      utmMedium: 'email',
      utmCampaign: 'welcome'
    }
  }
});`}
          </code>
        </pre>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Next Steps</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Create Email Templates</h3>
            <p className="mt-2 text-gray-600">
              Learn how to create and customize email templates using the CLI.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/cli/email-templates"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Email Template Generation →
              </Link>
            </div>
          </div>
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Scheduled Emails</h3>
            <p className="mt-2 text-gray-600">
              Send scheduled and automated emails using cron jobs.
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
        </div>
      </div>
    </div>
  );
} 