import { EmailProviderFactory } from './provider-factory';
import { TemplateLoader } from './template-loader';

// Get the configured email provider from environment variables
const PROVIDER_NAME = process.env.EMAIL_PROVIDER || 'sendgrid';

// Create an instance of the email provider
const provider = EmailProviderFactory.createProvider(PROVIDER_NAME);

// Create template loader instance
const templateLoader = new TemplateLoader();

/**
 * Email service for sending transactional emails using the configured provider
 */
export const emailService = {
  /**
   * Get the current email provider name
   * @returns {string} - The name of the currently configured email provider
   */
  getProviderName: () => PROVIDER_NAME,

  /**
   * Get list of available email templates
   * @returns {string[]} - Array of template names
   */
  getAvailableTemplates: () => templateLoader.listTemplates(),

  /**
   * Send an email using a specific template
   * @param {Object} options - Email options
   * @param {string|string[]} options.to - Recipient email address(es)
   * @param {string} options.templateName - Name of the template to use (folder name in templates directory)
   * @param {Object} options.templateData - Data to inject into the template
   * @param {string} options.from - Sender email address (optional)
   * @param {string} options.subject - Email subject (overrides template subject)
   * @returns {Promise} - Email provider response
   */
  sendEmail: async ({ to, templateName, templateData = {}, from, subject }) => {
    if (!to) {
      console.warn('Recipient not provided. Skipping templated email.');
      return null;
    }

    if (!templateName) {
      console.warn('Template name not provided. Skipping templated email.');
      return null;
    }

    // Compile the template
    const compiled = templateLoader.compileTemplate(templateName, templateData);
    
    if (!compiled) {
      console.warn(`Template "${templateName}" not found. Skipping templated email.`);
      return null;
    }

    return await provider.sendEmail({
      to,
      from,
      subject: subject || compiled.subject || templateName,
      text: compiled.text,
      html: compiled.html,
    });
  },

  /**
   * Send a custom email with raw HTML/text content
   * @param {Object} options - Email options
   * @param {string|string[]} options.to - Recipient email address(es)
   * @param {string} options.from - Sender email address (optional)
   * @param {string} options.subject - Email subject
   * @param {string} options.text - Plain text email content
   * @param {string} options.html - HTML email content
   * @returns {Promise} - Email provider response
   */
  sendCustomEmail: async ({ to, from, subject, text, html }) => {
    if (!to) {
      console.warn('Recipient not provided. Skipping custom email.');
      return null;
    }

    return await provider.sendEmail({
      to,
      from,
      subject,
      text,
      html,
    });
  },

  // ----- Legacy Methods (for backward compatibility) -----

  /**
   * @deprecated Use sendEmail instead with templateName='welcome'
   * Send a welcome email to a new user
   * @param {Object} user - User object with email and name
   * @returns {Promise} - Email provider response
   */
  sendWelcomeEmail: async (user) => {
    if (!user?.email) {
      console.warn('User email not provided. Skipping welcome email.');
      return null;
    }

    return await emailService.sendEmail({
      to: user.email,
      templateName: 'welcome',
      templateData: {
        user: {
          ...user,
          name: user.name || 'there'
        }
      }
    });
  },

  /**
   * @deprecated Use sendEmail instead with templateName='password-reset'
   * Send a password reset email
   * @param {string} email - User's email address
   * @param {string} resetToken - Password reset token
   * @param {string} resetUrl - URL to reset password
   * @returns {Promise} - Email provider response
   */
  sendPasswordResetEmail: async (email, resetToken, resetUrl) => {
    if (!email) {
      console.warn('Email not provided. Skipping password reset email.');
      return null;
    }

    return await emailService.sendEmail({
      to: email,
      templateName: 'password-reset',
      templateData: {
        resetToken,
        resetUrl
      }
    });
  },

  /**
   * @deprecated Use sendEmail instead with templateName='subscription-confirmation'
   * Send a subscription confirmation email
   * @param {Object} user - User object with email and name
   * @param {Object} subscription - Subscription details
   * @returns {Promise} - Email provider response
   */
  sendSubscriptionConfirmation: async (user, subscription) => {
    if (!user?.email) {
      console.warn('User email not provided. Skipping subscription confirmation email.');
      return null;
    }

    return await emailService.sendEmail({
      to: user.email,
      templateName: 'subscription-confirmation',
      templateData: {
        user: {
          ...user,
          name: user.name || 'there'
        },
        subscription: {
          ...subscription,
          planName: subscription.planName || 'Premium',
          billingCycle: subscription.billingCycle || 'Monthly',
          nextBillingDate: subscription.nextBillingDate || 'N/A'
        }
      }
    });
  },

  /**
   * @deprecated Use sendEmail instead
   * Alias for sendEmail method for backward compatibility
   */
  sendTemplatedEmail: async (options) => {
    return await emailService.sendEmail(options);
  }
}; 