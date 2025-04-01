import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export class SESProvider {
  constructor(config) {
    this.config = config;
    
    // Create SES client with region
    this.client = new SESClient({
      region: this.config.region || 'us-east-1',
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
      },
    });
  }

  async sendEmail({ to, from, subject, text, html }) {
    if (!this.config.accessKeyId || !this.config.secretAccessKey) {
      console.warn('AWS SES credentials not found. Skipping email.');
      return null;
    }

    try {
      // Format recipients as array if not already
      const toAddresses = Array.isArray(to) ? to : [to];
      
      const params = {
        Source: from || this.config.from || 'noreply@yourdomain.com',
        Destination: {
          ToAddresses: toAddresses,
        },
        Message: {
          Subject: {
            Data: subject,
            Charset: 'UTF-8',
          },
          Body: {
            Text: {
              Data: text,
              Charset: 'UTF-8',
            },
            Html: {
              Data: html,
              Charset: 'UTF-8',
            },
          },
        },
      };

      const command = new SendEmailCommand(params);
      return await this.client.send(command);
    } catch (error) {
      console.error('Error sending email with Amazon SES:', error);
      throw error;
    }
  }
} 