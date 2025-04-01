import sgMail from '@sendgrid/mail';

export class SendGridProvider {
  constructor(config) {
    this.config = config;
    
    if (this.config.apiKey) {
      sgMail.setApiKey(this.config.apiKey);
    }
  }

  async sendEmail({ to, from, subject, text, html }) {
    if (!this.config.apiKey) {
      console.warn('SendGrid API key not found. Skipping email.');
      return null;
    }

    try {
      const msg = {
        to,
        from: from || this.config.from || 'noreply@yourdomain.com',
        subject,
        text,
        html,
      };

      return await sgMail.send(msg);
    } catch (error) {
      console.error('Error sending email with SendGrid:', error);
      throw error;
    }
  }
} 