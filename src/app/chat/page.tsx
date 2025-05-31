'use client';
import Message from '@/components/chat/message';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUserStore } from '@/stores/use-user';
import { useChat } from '@ai-sdk/react';
import { ArrowLeft, Bot, Send } from 'lucide-react';
import Link from 'next/link';

export default function ChatPage() {
  const { user } = useUserStore();
  const { messages, input, handleInputChange, handleSubmit, status } = useChat({
    body: {
      user: user,
    },
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-50 p-4">
      <Button asChild variant="secondary">
        <Link href="/">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>
      </Button>
      <section className=" flex flex-col w-full max-w-2xl py-24 mx-auto">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-10">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 mt-8">
              <Bot className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Hi! I'm your AI assistant. How can I help you today?</p>
            </div>
          )}

          {messages.map(message => (
            <Message key={message.id} message={message} />
          ))}

          {/* Loading indicator */}
          {status === 'submitted' && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl rounded-bl-md px-4 py-3 shadow-sm border">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-green-500" />
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.1s' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0.2s' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={handleSubmit}
          className="fixed bottom-0 w-full max-w-2xl mb-8 flex gap-2 px-8"
        >
          <Input
            className="flex-1 bg-white"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            className="cursor-pointer"
            disabled={status === 'submitted' || status === 'streaming'}
          >
            <Send className="w-4 h-4" />
            Send
          </Button>
        </form>
      </section>
    </section>
  );
}
