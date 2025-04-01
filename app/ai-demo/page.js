import AiChat from '../../components/AiChat';

export const metadata = {
  title: 'AI Chat Demo',
  description: 'A demo of Vercel AI SDK integration',
};

export default function AiDemoPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">AI Chat Demo</h1>
      <p className="text-center mb-8 text-gray-600">
        This demo showcases the Vercel AI SDK integration with OpenAI.
      </p>
      <AiChat />
    </div>
  );
} 