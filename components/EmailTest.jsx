'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { 
  sendEmail, 
  getEmailProvider, 
  getEmailTemplates 
} from '@/app/actions/email';

export default function EmailTest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentProvider, setCurrentProvider] = useState('loading...');
  const [availableTemplates, setAvailableTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [jsonData, setJsonData] = useState('{\n  "user": {\n    "name": "Test User"\n  }\n}');
  const { addNotification } = useStore();

  // Fetch the current email provider and available templates when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch email provider
        const providerResult = await getEmailProvider();
        if (providerResult.success) {
          setCurrentProvider(providerResult.provider);
        } else {
          setCurrentProvider('unknown');
        }
        
        // Fetch available templates
        const templatesResult = await getEmailTemplates();
        if (templatesResult.success) {
          setAvailableTemplates(templatesResult.templates);
          if (templatesResult.templates.length > 0) {
            setSelectedTemplate(templatesResult.templates[0]);
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setCurrentProvider('unknown');
      }
    };

    fetchData();
  }, []);

  const handleSendTestEmail = async () => {
    if (!selectedTemplate) {
      addNotification({
        type: 'error',
        title: 'Missing Template',
        message: 'Please select an email template',
      });
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      let templateData = {};
      
      // Parse JSON data if provided
      try {
        templateData = JSON.parse(jsonData);
      } catch (err) {
        throw new Error('Invalid JSON data. Please check your syntax.');
      }

      // Send the email with the selected template and data
      const result = await sendEmail({ 
        templateName: selectedTemplate, 
        data: templateData 
      });

      if (!result.success) {
        throw new Error(result.error || 'Failed to send email');
      }

      addNotification({
        type: 'success',
        title: 'Email Sent',
        message: `Email with template '${selectedTemplate}' was sent successfully!`,
      });
    } catch (err) {
      setError(err.message);
      addNotification({
        type: 'error',
        title: 'Email Error',
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate template data examples
  const generateExampleData = (templateName) => {
    switch (templateName) {
      case 'welcome':
        return JSON.stringify({ 
          user: { name: "New User" } 
        }, null, 2);
      case 'password-reset':
        return JSON.stringify({ 
          resetToken: "sample-token-123",
          resetUrl: `${window.location.origin}/auth/reset-password?token=sample-token-123` 
        }, null, 2);
      case 'subscription-confirmation':
        return JSON.stringify({
          user: { name: "Subscriber" },
          subscription: {
            planName: "Pro Plan",
            billingCycle: "Monthly",
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()
          }
        }, null, 2);
      default:
        return "{\n  \"user\": {\n    \"name\": \"Test User\"\n  }\n}";
    }
  };

  const handleTemplateChange = (e) => {
    const templateName = e.target.value;
    setSelectedTemplate(templateName);
    setJsonData(generateExampleData(templateName));
  };

  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Email Testing</h2>
        <div className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
          Provider: <span className="font-semibold">{currentProvider}</span>
        </div>
      </div>

      <p className="mb-6 text-gray-600">
        Test the email functionality by selecting a template and providing template data.
        Make sure you have configured your email provider in your .env file.
      </p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div>
          <label 
            htmlFor="template-select" 
            className="block text-sm font-medium mb-1"
          >
            Select Email Template
          </label>
          <select
            id="template-select"
            value={selectedTemplate}
            onChange={handleTemplateChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>Select a template</option>
            {availableTemplates.map((template) => (
              <option key={template} value={template}>
                {template}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label 
            htmlFor="template-data" 
            className="block text-sm font-medium mb-1"
          >
            Template Data (JSON)
          </label>
          <textarea
            id="template-data"
            value={jsonData}
            onChange={(e) => setJsonData(e.target.value)}
            rows={10}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <button
        onClick={handleSendTestEmail}
        disabled={loading || !selectedTemplate}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Send Email'}
      </button>
    </div>
  );
} 