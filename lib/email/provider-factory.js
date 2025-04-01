import { SendGridProvider } from './providers/sendgrid-provider';
import { SESProvider } from './providers/ses-provider';
import { MailchimpProvider } from './providers/mailchimp-provider';
import { ResendProvider } from './providers/resend-provider';

/**
 * Factory class to create the appropriate email provider instance
 */
export class EmailProviderFactory {
  /**
   * Create an email provider based on configuration
   * @param {string} providerName - The name of the provider to use
   * @param {object} config - Provider-specific configuration
   * @returns {object} - An instance of the appropriate email provider
   */
  static createProvider(providerName, config = {}) {
    switch (providerName?.toLowerCase()) {
      case 'sendgrid':
        return new SendGridProvider({
          apiKey: process.env.SENDGRID_API_KEY,
          from: process.env.EMAIL_FROM,
          ...config,
        });
      
      case 'ses':
        return new SESProvider({
          accessKeyId: process.env.AWS_SES_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY,
          region: process.env.AWS_SES_REGION,
          from: process.env.EMAIL_FROM,
          ...config,
        });
      
      case 'mailchimp':
        return new MailchimpProvider({
          apiKey: process.env.MAILCHIMP_API_KEY,
          from: process.env.EMAIL_FROM,
          ...config,
        });
      
      case 'resend':
        return new ResendProvider({
          apiKey: process.env.RESEND_API_KEY,
          from: process.env.EMAIL_FROM,
          ...config,
        });
      
      default:
        // Default to SendGrid if provider not specified or unrecognized
        console.warn(`Unrecognized email provider: ${providerName}. Defaulting to SendGrid.`);
        return new SendGridProvider({
          apiKey: process.env.SENDGRID_API_KEY,
          from: process.env.EMAIL_FROM,
          ...config,
        });
    }
  }
} 