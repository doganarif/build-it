import Link from 'next/link';

export const metadata = {
  title: 'Email Templates CLI - BuildIt Documentation',
  description: 'Documentation for generating email templates using the BuildIt CLI',
};

export default function EmailTemplatesCliPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">Email Templates CLI</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          The BuildIt CLI provides a powerful tool for generating and managing email templates.
          This guide explains how to use the CLI to create new email templates for your application.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Creating Email Templates</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Basic Usage</h3>
          <p>
            To create a new email template, run the following command:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- generate email</code>
          </pre>
          <p className="mt-2">
            You can also use the shorthand version:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- g e</code>
          </pre>
          <p className="mt-2">
            The CLI will prompt you for information about the email template:
          </p>
          <ul className="mt-4 space-y-2">
            <li><strong>Template Name</strong>: The name of the template (e.g., "welcome", "password-reset")</li>
            <li><strong>Description</strong>: A brief description of the email's purpose</li>
            <li><strong>Subject Line</strong>: The default subject line for the email</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Example</h3>
          <p>
            Here's an example of creating a "welcome" email template:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`$ npm run cli -- generate email

✨ BuildIt Email Template Generator ✨

? Template name: welcome
? Template description: Sent to users after they register
? Email subject line: Welcome to BuildIt!

Creating email template "welcome"...
✅ Created email/templates/welcome/html.ejs
✅ Created email/templates/welcome/text.ejs
✅ Updated email/config.js with subject line

Email template "welcome" created successfully!`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Generated Files</h2>
        <p>
          The CLI generates the following files for each email template:
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">HTML Template</h3>
          <p>
            The HTML version of your email is created at <code>email/templates/[name]/html.ejs</code>:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`<!-- emails/templates/welcome/html.ejs -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to BuildIt!</title>
  <style>
    /* Responsive email styles */
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .content {
      background-color: #ffffff;
      padding: 20px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #666;
      margin-top: 20px;
    }
    .button {
      display: inline-block;
      background-color: #4F46E5;
      color: white;
      text-decoration: none;
      padding: 12px 20px;
      border-radius: 4px;
      font-weight: bold;
    }
    @media screen and (max-width: 600px) {
      .container {
        width: 100% !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome to BuildIt!</h1>
    </div>
    <div class="content">
      <p>Hello <%= name %>,</p>
      <p>Thank you for signing up for BuildIt. We're excited to have you on board!</p>
      <p>Get started building your SaaS application:</p>
      <p style="text-align: center;">
        <a href="<%= dashboardUrl %>" class="button">Go to Dashboard</a>
      </p>
      <p>If you have any questions, please don't hesitate to reach out to our support team.</p>
      <p>Best regards,<br>The BuildIt Team</p>
    </div>
    <div class="footer">
      <p>&copy; <%= new Date().getFullYear() %> BuildIt. All rights reserved.</p>
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
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Plain Text Template</h3>
          <p>
            The plain text version of your email is created at <code>email/templates/[name]/text.ejs</code>:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`Welcome to BuildIt!

Hello <%= name %>,

Thank you for signing up for BuildIt. We're excited to have you on board!

Get started building your SaaS application:
<%= dashboardUrl %>

If you have any questions, please don't hesitate to reach out to our support team.

Best regards,
The BuildIt Team

--
© <%= new Date().getFullYear() %> BuildIt. All rights reserved.
Unsubscribe: <%= unsubscribeUrl %>
Email Preferences: <%= preferencesUrl %>`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Subject Configuration</h3>
          <p>
            The CLI updates the <code>email/config.js</code> file with your new template's subject line:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// emails/config.js
export const emailSubjects = {
  'welcome': 'Welcome to BuildIt!',
  'password-reset': 'Reset Your Password',
  'verification': 'Verify Your Email Address',
  // New templates are added here
};`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Customizing Templates</h2>
        <p>
          After generating a template, you can customize it to suit your needs:
        </p>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Template Variables</h3>
          <p>
            Templates use EJS syntax for dynamic content. Common variables include:
          </p>
          <ul className="mt-2 space-y-2">
            <li><code>name</code> - Recipient's name</li>
            <li><code>appName</code> - Your application name</li>
            <li><code>dashboardUrl</code> - URL to the user's dashboard</li>
            <li><code>verificationUrl</code> - URL for email verification</li>
            <li><code>unsubscribeUrl</code> - URL to unsubscribe from emails</li>
            <li><code>preferencesUrl</code> - URL to email preferences</li>
          </ul>
          <p className="mt-4">
            You can add any custom variables you need and pass them when sending the email:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// Example of sending an email with custom variables
await sendEmail({
  to: 'user@example.com',
  template: 'welcome',
  data: {
    name: 'John Doe',
    appName: 'BuildIt',
    dashboardUrl: 'https://app.example.com/dashboard',
    unsubscribeUrl: 'https://app.example.com/unsubscribe?token=123',
    preferencesUrl: 'https://app.example.com/preferences?token=123',
    customVariable: 'Custom value'  // You can add any custom variables
  }
});`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Shared Layouts</h3>
          <p>
            For consistent email designs, you can use shared layouts:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`<!-- emails/templates/welcome/html.ejs -->
<%- include('../../layouts/default', {
  subject: 'Welcome to BuildIt!',
  preheader: 'Thank you for signing up',
  content: \`
    <p>Hello <%= name %>,</p>
    <p>Thank you for signing up for BuildIt. We're excited to have you on board!</p>
    <p>Get started building your SaaS application:</p>
    <p style="text-align: center;">
      <a href="<%= dashboardUrl %>" class="button">Go to Dashboard</a>
    </p>
  \`,
  footerContent: \`
    <p>If you have any questions, please don't hesitate to reach out to our support team.</p>
  \`
}) %>`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Testing Email Templates</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Sending Test Emails</h3>
          <p>
            You can send a test email using the CLI:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- send-test-email welcome your-email@example.com</code>
          </pre>
          <p className="mt-2">
            This will send the "welcome" template to the specified email address with sample data.
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Preview Mode</h3>
          <p>
            During development, you can enable preview mode to see emails in the browser instead of sending them:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`# In your .env file
EMAIL_PREVIEW_MODE=true
EMAIL_PREVIEW_PATH=tmp/email-previews`}
            </code>
          </pre>
          <p className="mt-2">
            This will save email previews to the specified directory, which you can open in your browser.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Managing Email Templates</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Listing Templates</h3>
          <p>
            List all email templates in your application:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>npm run cli -- list --emails</code>
          </pre>
          <p className="mt-2">
            This will display a table with all email templates, their descriptions, and subject lines.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Advanced Template Techniques</h2>
        
        <div className="mt-4">
          <h3 className="text-xl font-bold text-gray-900">Conditionals</h3>
          <p>
            Use EJS conditionals to show or hide content based on variables:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`<% if (showVerification) { %>
  <p>Please verify your email address by clicking the button below:</p>
  <p><a href="<%= verificationUrl %>" class="button">Verify Email</a></p>
<% } %>

<% if (userType === 'admin') { %>
  <p>You have been granted admin privileges.</p>
<% } else { %>
  <p>You have a standard user account.</p>
<% } %>`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Loops</h3>
          <p>
            Use loops to render repeated elements:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`<h3>Your Recent Orders:</h3>
<ul>
  <% orders.forEach(function(order) { %>
    <li>
      Order #<%= order.id %>: <%= order.items.length %> items, 
      $<%= order.total.toFixed(2) %>
    </li>
  <% }); %>
</ul>`}
            </code>
          </pre>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-bold text-gray-900">Custom Helpers</h3>
          <p>
            You can define custom helper functions for your templates:
          </p>
          <pre className="overflow-x-auto rounded-md bg-gray-100 p-4 my-4">
            <code>
{`// lib/email/helpers.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date(date));
};

// Use in template
<p>Total: <%= helpers.formatCurrency(order.total) %></p>
<p>Order Date: <%= helpers.formatDate(order.createdAt) %></p>`}
            </code>
          </pre>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900">Next Steps</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Email Service</h3>
            <p className="mt-2 text-gray-600">
              Learn more about the email service and sending emails.
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
          
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Cron Tasks</h3>
            <p className="mt-2 text-gray-600">
              Set up automated emails using cron tasks.
            </p>
            <div className="mt-4">
              <Link
                href="/docs/cli/cron-tasks"
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Cron Tasks →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 