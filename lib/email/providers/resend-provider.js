import { Resend } from 'resend';

export class ResendProvider {
  constructor(config) {
    this.config = config;
    
    if (this.config.apiKey) {
      this.client = new Resend(this.config.apiKey);
    }
  }

  async sendEmail({ to, from, subject, text, html }) {
    if (!this.config.apiKey) {
      console.warn('Resend API key not found. Skipping email.');
      return null;
    }

    try {
      const data = {
        from: from || this.config.from || 'noreply@yourdomain.com',
        to: to,
        subject: subject,
        text: text,
        html: html,
      };

      return await this.client.emails.send(data);
    } catch (error) {
      console.error('Error sending email with Resend:', error);
      throw error;
    }
  }
} 