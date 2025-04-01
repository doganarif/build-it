'use server';

import { getServerSession } from '@/lib/auth';
import { emailService } from '@/lib/email';
import { db } from '@/lib/db';

/**
 * Send an email based on the provided template and data
 * 
 * @param {Object} params - Email parameters
 * @param {string} params.templateName - The email template to use
 * @param {Object} params.data - Template-specific data
 * @returns {Object} - Result of the email sending operation
 */
export async function sendEmail({ templateName, data = {} }) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session) {
      return { success: false, error: 'Unauthorized' };
    }

    if (!templateName) {
      return { success: false, error: 'Template name is required' };
    }

    // Get user from session
    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Prepare the template data based on template
    let templateData = { ...data };
    
    // Add user data to template context by default
    templateData.user = {
      ...user,
      ...templateData.user
    };

    // Send the email using the generic method
    const result = await emailService.sendEmail({
      to: user.email,
      templateName,
      templateData
    });

    return { success: true, result };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: 'Failed to send email' };
  }
}

/**
 * Get the current email provider information
 * 
 * @returns {Object} - Provider information
 */
export async function getEmailProvider() {
  try {
    const providerName = emailService.getProviderName();
    return { success: true, provider: providerName };
  } catch (error) {
    console.error('Error getting email provider:', error);
    return { success: false, error: 'Failed to get email provider' };
  }
}

/**
 * Get list of available email templates
 * 
 * @returns {Object} - List of available templates
 */
export async function getEmailTemplates() {
  try {
    const templates = emailService.getAvailableTemplates();
    return { success: true, templates };
  } catch (error) {
    console.error('Error getting email templates:', error);
    return { success: false, error: 'Failed to get email templates' };
  }
} 