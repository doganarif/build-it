import mailchimp from '@mailchimp/mailchimp_transactional';

export class MailchimpProvider {
  constructor(config) {
    this.config = config;
    
    if (this.config.apiKey) {
      this.client = mailchimp(this.config.apiKey);
    }
  }

  async sendEmail({ to, from, subject, text, html }) {
    if (!this.config.apiKey) {
      console.warn('Mailchimp API key not found. Skipping email.');
      return null;
    }

    try {
      // Format recipients as array of objects with email property
      const toAddresses = Array.isArray(to) 
        ? to.map(recipient => ({ email: recipient })) 
        : [{ email: to }];
      
      const message = {
        from_email: from || this.config.from || 'noreply@yourdomain.com',
        subject: subject,
        text: text,
        html: html,
        to: toAddresses,
      };

      return await this.client.messages.send({ message });
    } catch (error) {
      console.error('Error sending email with Mailchimp:', error);
      throw error;
    }
  }
} 