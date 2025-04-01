import EmailTest from '@/components/EmailTest';

export const metadata = {
  title: 'Email Features - BuildIt',
  description: 'Explore the email service integration in BuildIt',
};

export default function EmailFeaturePage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Email Service Integration</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">About This Feature</h2>
        <p className="mb-4">
          This boilerplate includes a complete email service integration supporting multiple providers.
          The implementation includes:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Support for multiple email service providers</li>
          <li>Auto-discovery of email templates from the filesystem</li>
          <li>File-based templates with variable injection</li>
          <li>API endpoint for sending any template-based emails</li>
          <li>Automatic welcome emails for new users</li>
          <li>Password reset functionality</li>
          <li>Subscription confirmation emails</li>
        </ul>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-8">
          <h3 className="font-semibold text-blue-800 mb-2">Configuration</h3>
          <p className="text-blue-700 mb-2">
            To use this feature, select your preferred email provider and configure it in the <code>.env</code> file:
          </p>
          <pre className="bg-gray-800 text-gray-200 p-3 rounded mt-2 overflow-x-auto break-words">
            <code>EMAIL_FROM="noreply@yourdomain.com"
EMAIL_PROVIDER="sendgrid" # Options: sendgrid, ses, mailchimp, resend</code>
          </pre>
        </div>
        
        <h3 className="text-xl font-bold mb-4">Supported Email Providers</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="border rounded-lg p-5 shadow-sm">
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold">SendGrid</span>
              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Default</span>
            </div>
            <p className="text-gray-600 mb-3">SendGrid is a cloud-based email service that delivers marketing and transactional emails.</p>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
              <code>SENDGRID_API_KEY="your-sendgrid-api-key"</code>
            </pre>
          </div>
          
          <div className="border rounded-lg p-5 shadow-sm">
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold">Amazon SES</span>
            </div>
            <p className="text-gray-600 mb-3">Amazon Simple Email Service (SES) is a cost-effective, flexible and scalable email service.</p>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto whitespace-pre-wrap break-all">
              <code>AWS_SES_ACCESS_KEY_ID="your-access-key-id"
AWS_SES_SECRET_ACCESS_KEY="your-secret-key"
AWS_SES_REGION="us-east-1"</code>
            </pre>
          </div>
          
          <div className="border rounded-lg p-5 shadow-sm">
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold">Mailchimp Transactional</span>
            </div>
            <p className="text-gray-600 mb-3">Mailchimp Transactional (formerly Mandrill) is an email API for sending personalized transactional emails.</p>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
              <code>MAILCHIMP_API_KEY="your-mailchimp-api-key"</code>
            </pre>
          </div>
          
          <div className="border rounded-lg p-5 shadow-sm">
            <div className="flex items-center mb-3">
              <span className="text-lg font-semibold">Resend</span>
            </div>
            <p className="text-gray-600 mb-3">Resend is a new email API built for developers with a focus on deliverability and simplicity.</p>
            <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
              <code>RESEND_API_KEY="your-resend-api-key"</code>
            </pre>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4">File-based Email Templates</h3>
        
        <div className="bg-yellow-50 p-5 rounded-lg border border-yellow-200 mb-8">
          <h4 className="font-semibold text-yellow-800 mb-3">Template Directory Structure</h4>
          <p className="text-yellow-700 mb-3">
            Email templates are stored in the <code>lib/email/templates</code> directory with the following structure:
          </p>
          
          <pre className="bg-gray-800 text-gray-200 p-3 rounded font-mono text-sm overflow-auto">
<code>lib/email/templates/ |— welcome/           # Template directory name
                  |   |— html.html        # HTML version of the template
                  |   |— text.txt         # Plain text version of the template
                  |   |— subject.txt      # Email subject line
                  |
                  |— password-reset/    # Another template
                  |   |— html.html
                  |   |— text.txt
                  |   |— subject.txt</code>
          </pre>
          
          <p className="text-yellow-700 mt-3">
            Templates use a simple variable replacement syntax with double curly braces, e.g., <code>{"{{user.name}}"}</code>.
            Variables can access nested properties using dot notation.
          </p>
        </div>
      </div>
      
      <EmailTest />
      
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Implementation Details</h2>
        <p className="mb-4">
          The email service is implemented using a provider factory pattern, allowing you to easily switch between
          different email service providers without changing your application code.
        </p>
        <p className="mb-4">
          Each provider implements a common interface, ensuring consistent behavior regardless of which
          email service you choose to use. This architecture makes it easy to add support for additional
          providers in the future.
        </p>
        <p className="mb-4">
          The template system uses auto-discovery to find and load templates from the filesystem. To add a new
          template type, simply create a new directory in <code>lib/email/templates</code> with the appropriate files.
        </p>
        <p>
          The API endpoint handles authenticated requests to send emails, and automatically uses
          the configured provider with the selected template.
        </p>
      </div>
    </div>
  );
} 