'use client';

import { useChat } from 'ai/react';

export default function AiChat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/ai/chat',
  });

  return (
    <div className="flex flex-col w-full max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`p-3 rounded-lg ${
              message.role === 'user' 
                ? 'bg-blue-100 ml-auto' 
                : 'bg-gray-100'
            } max-w-[80%]`}
          >
            {message.content}
          </div>
        ))}
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            Start a conversation with the AI
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input
          className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question..."
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !input.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Thinking...' : 'Send'}
        </button>
      </form>
    </div>
  );
} 