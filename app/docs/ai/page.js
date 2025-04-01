import Link from 'next/link';

export const metadata = {
  title: 'AI Features - BuildIt Documentation',
  description: 'Learn about the AI capabilities in BuildIt',
};

export default function AIDocsPage() {
  return (
    <div className="prose prose-blue max-w-none">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900">AI Features</h1>
      
      <div className="mt-6">
        <p className="text-lg text-gray-600">
          BuildIt provides powerful AI capabilities that you can integrate into your application to enhance user 
          experience, automate tasks, and add intelligent features. This guide covers the available AI features 
          and how to implement them.
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p>
          The AI functionality in BuildIt is powered by OpenAI's models through the Vercel AI SDK,
          providing a simple way to add AI capabilities to your application:
        </p>
        <ul>
          <li>AI Chat interfaces for user interaction</li>
          <li>Text generation for content creation</li>
          <li>Content summarization for data processing</li>
          <li>Stream-based responses for real-time interactions</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Available Features</h2>
        
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">AI Chat</h3>
            <p>
              The AI Chat feature allows users to interact with an AI assistant directly within your application.
              It provides a conversational interface that can help with customer support, answer questions, 
              and assist with various tasks.
            </p>
            <p className="mt-2">
              Key capabilities include:
            </p>
            <ul>
              <li>Multi-turn conversations with context memory</li>
              <li>Stream-based responses for real-time typing effect</li>
              <li>Support for different AI models (e.g., GPT-4o, GPT-3.5-turbo)</li>
              <li>Customizable chat interface components</li>
            </ul>
            <p className="mt-2">
              Try the chat interface in the <Link href="/ai-demo" className="text-blue-600 hover:underline">AI Demo section</Link>.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">Text Generation</h3>
            <p>
              The text generation API allows you to create content, complete text, or generate ideas
              based on provided prompts. This is useful for:
            </p>
            <ul>
              <li>Content creation for blogs, product descriptions, emails</li>
              <li>Code generation and completion</li>
              <li>Creative writing assistance</li>
              <li>Automated responses based on user input</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">Content Summarization</h3>
            <p>
              The content summarization feature enables automatic summarization of long-form content into
              concise, easy-to-digest formats, useful for:
            </p>
            <ul>
              <li>Document summarization for quick review</li>
              <li>News article condensation</li>
              <li>Meeting notes summarization</li>
              <li>Data extraction from lengthy texts</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Implementation</h2>
        
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Setting Up</h3>
            <p>
              The AI features require an OpenAI API key. Add your key to the <code>.env</code> file:
            </p>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>
                OPENAI_API_KEY=your_openai_api_key
              </code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">Adding Chat to Your Application</h3>
            <p>
              To add the AI chat component to your application:
            </p>
            <ol>
              <li>Use the provided <code>AiChat</code> component in your page:</li>
            </ol>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>{`import AiChat from '@/components/AiChat';

export default function YourPage() {
  return (
    <div>
      <h1>Your Chat Interface</h1>
      <AiChat />
    </div>
  );
}`}</code>
            </pre>
            <p className="mt-2">
              This component uses the Vercel AI SDK to handle the chat state and API communication, providing
              a seamless chat experience with streaming responses.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">Creating a Custom AI API Endpoint</h3>
            <p>
              You can create custom AI endpoints to handle specific AI tasks:
            </p>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>{`// app/api/ai/your-endpoint/route.js
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const maxDuration = 30; // Allow streaming responses up to 30 seconds

export async function POST(req) {
  const { messages } = await req.json();
  
  const result = streamText({
    model: openai('gpt-4o'),
    messages,
    // Optional parameters
    temperature: 0.7,
    max_tokens: 500,
  });
  
  return result.toDataStreamResponse();
}`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">Configuration Options</h3>
            <p>
              The AI services can be configured with various parameters to control the output:
            </p>
            <table className="min-w-full divide-y divide-gray-300 mt-2">
              <thead>
                <tr>
                  <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Parameter</th>
                  <th className="py-3.5 pl-3 pr-4 text-left text-sm font-semibold text-gray-900">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">model</td>
                  <td className="py-4 pl-3 pr-4 text-sm text-gray-500">Specify the AI model to use (e.g., 'gpt-4o', 'gpt-3.5-turbo')</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">temperature</td>
                  <td className="py-4 pl-3 pr-4 text-sm text-gray-500">Control the randomness of the output (0.0-1.0). Lower values are more focused and deterministic.</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">max_tokens</td>
                  <td className="py-4 pl-3 pr-4 text-sm text-gray-500">Limit the length of generated responses</td>
                </tr>
                <tr>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">messages</td>
                  <td className="py-4 pl-3 pr-4 text-sm text-gray-500">Array of message objects representing the conversation history</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900">Custom Integration Examples</h2>
        
        <div className="mt-4 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Client-Side Integration</h3>
            <p>
              For client-side integration with more control, you can use the AI hooks directly:
            </p>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>{`'use client';

import { useState } from 'react';
import { useChat } from 'ai/react';

export default function CustomChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/chat',
    initialMessages: [
      {
        id: 'welcome-message',
        role: 'assistant',
        content: 'Hello! How can I help you today?'
      }
    ],
  });

  return (
    <div className="chat-container">
      {/* Custom chat UI implementation */}
      {/* ... */}
    </div>
  );
}`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900">Advanced Usage: Custom Processing</h3>
            <p>
              For more complex scenarios, you can add custom processing logic to your AI endpoints:
            </p>
            <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">
              <code>{`// Custom endpoint with additional processing
export async function POST(req) {
  const { messages, options } = await req.json();
  
  // Add system message for specific behavior
  const enhancedMessages = [
    { role: 'system', content: 'You are a helpful assistant specialized in technical support.' },
    ...messages
  ];
  
  // Fetch additional context from database if needed
  const additionalContext = await fetchRelevantInfo(messages);
  
  if (additionalContext) {
    enhancedMessages.push({ 
      role: 'system', 
      content: \`Additional context: \${additionalContext}\` 
    });
  }
  
  const result = streamText({
    model: openai(options.model || 'gpt-4o'),
    messages: enhancedMessages,
    temperature: options.temperature || 0.7,
  });
  
  return result.toDataStreamResponse();
}`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex justify-between">
          <Link
            href="/docs/deployment"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            ← Deployment
          </Link>
          <Link
            href="/docs/api-reference"
            className="text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            API Reference →
          </Link>
        </div>
      </div>
    </div>
  );
} 