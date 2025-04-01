import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name for the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Default template directory
const DEFAULT_TEMPLATE_DIR = path.join(__dirname, 'templates');

/**
 * Email template loader with auto-discovery functionality
 */
export class TemplateLoader {
  constructor(templateDir = DEFAULT_TEMPLATE_DIR) {
    this.templateDir = templateDir;
    this.templates = new Map();
    this.loadTemplates();
  }

  /**
   * Auto-discover and load all templates from the template directory
   */
  loadTemplates() {
    try {
      if (!fs.existsSync(this.templateDir)) {
        fs.mkdirSync(this.templateDir, { recursive: true });
      }

      const templateFolders = fs.readdirSync(this.templateDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      for (const folder of templateFolders) {
        const htmlPath = path.join(this.templateDir, folder, 'html.html');
        const textPath = path.join(this.templateDir, folder, 'text.txt');
        const subjectPath = path.join(this.templateDir, folder, 'subject.txt');
        
        if (fs.existsSync(htmlPath) || fs.existsSync(textPath)) {
          const template = {
            name: folder
          };
          
          if (fs.existsSync(htmlPath)) {
            template.html = fs.readFileSync(htmlPath, 'utf-8');
          }
          
          if (fs.existsSync(textPath)) {
            template.text = fs.readFileSync(textPath, 'utf-8');
          }
          
          if (fs.existsSync(subjectPath)) {
            template.subject = fs.readFileSync(subjectPath, 'utf-8').trim();
          }
          
          this.templates.set(folder, template);
        }
      }
      
      console.log(`Loaded ${this.templates.size} email templates`);
    } catch (error) {
      console.error('Error loading email templates:', error);
    }
  }

  /**
   * Get a template by name
   * @param {string} templateName - Name of the template to retrieve
   * @returns {Object|null} - The template object or null if not found
   */
  getTemplate(templateName) {
    return this.templates.get(templateName) || null;
  }

  /**
   * List all available templates
   * @returns {string[]} - Array of template names
   */
  listTemplates() {
    return Array.from(this.templates.keys());
  }

  /**
   * Compile a template with provided data
   * @param {string} templateName - Name of the template to compile
   * @param {Object} data - Data to inject into the template
   * @returns {Object|null} - Compiled template with html and text content
   */
  compileTemplate(templateName, data) {
    const template = this.getTemplate(templateName);
    if (!template) {
      console.warn(`Template "${templateName}" not found`);
      return null;
    }

    let html = template.html || '';
    let text = template.text || '';
    let subject = template.subject || '';

    // Simple variable replacement
    if (data) {
      const replacePlaceholder = (content) => {
        return content.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
          const keys = key.trim().split('.');
          let value = data;
          
          for (const k of keys) {
            value = value?.[k];
            if (value === undefined) break;
          }
          
          return value !== undefined ? value : match;
        });
      };

      html = html ? replacePlaceholder(html) : '';
      text = text ? replacePlaceholder(text) : '';
      subject = subject ? replacePlaceholder(subject) : '';
    }

    return {
      html,
      text,
      subject
    };
  }
} 