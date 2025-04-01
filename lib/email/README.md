# Email Service

This email service provides a flexible system for sending transactional emails using file-based templates with auto-discovery.

## Overview

The service features:
- File-based email templates with auto-discovery
- Support for multiple email providers
- Fallback to inline templates when file-based templates are not available
- Easy template customization

## Template Structure

Email templates are stored in the `lib/email/templates` directory with the following structure:

```
lib/email/templates/
  ├── template-name/
  │   ├── html.html    # HTML version of the template
  │   ├── text.txt     # Plain text version of the template
  │   └── subject.txt  # Email subject line
```

Each template is stored in its own directory with the template name. At minimum, a template must have either an HTML or text file.

## Creating a New Template

1. Create a new directory in `lib/email/templates` with your template name
2. Create the following files:
   - `html.html` - HTML version of your email template
   - `text.txt` - Plain text version of your email template
   - `subject.txt` - The subject line for your email

### Template Syntax

Templates use a simple variable replacement syntax:

```
Hello {{user.name}},

Thank you for your {{subscription.planName}} subscription!
```

Variables are specified with double curly braces `{{}}` and can access nested properties using dot notation.

## Using Templates in Code

### Sending a Template-based Email

```javascript
// Using a specific template function
await emailService.sendWelcomeEmail(user);

// Using the generic templated email function
await emailService.sendTemplatedEmail({
  to: 'user@example.com',
  templateName: 'welcome',
  templateData: {
    user: {
      name: 'John Doe'
    }
  }
});
```

### Getting Available Templates

```javascript
const templates = emailService.getAvailableTemplates();
console.log('Available templates:', templates);
```

## Default Templates

The system includes the following default templates:
- `welcome` - Welcome email for new users
- `password-reset` - Password reset email
- `subscription-confirmation` - Subscription confirmation email

## Fallback Behavior

If a template doesn't exist or can't be loaded, the system will fall back to inline templates for backward compatibility. 