import { cn } from '@/lib/utils';
import type { UIMessage } from 'ai';
import { Bot } from 'lucide-react';
import React from 'react';

const formatBoldText = (text: string) => {
  if (!text) return [];

  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      const boldText = part.slice(2, -2);
      return <strong key={index}>{boldText}</strong>;
    }
    return part;
  });
};

export default function Message({ message }: { message: UIMessage }) {
  return (
    <div
      key={message.id}
      className={cn(
        'flex',
        message.role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          ' max-w-[80%] rounded-2xl px-4 py-2',
          message.role === 'user'
            ? 'bg-blue-500 text-white rounded-br-md'
            : 'bg-white text-gray-800 rounded-bl-md shadow-sm border'
        )}
      >
        {/* Avatar for AI messages */}
        {message.role === 'assistant' && (
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="text-xs text-gray-500 font-medium">Morfeo</span>
          </div>
        )}

        <div className="whitespace-pre-wrap leading-relaxed">
          {message.parts.map((part, i) => {
            switch (part.type) {
              case 'text':
                return (
                  <span key={`${message.id}-${i}`}>
                    {formatBoldText(part.text)}
                  </span>
                );
              default:
                return null;
            }
          })}
        </div>

        {/* Timestamp */}
        <div
          className={cn(
            'text-xs mt-1',
            message.role === 'user' ? 'text-blue-100' : 'text-gray-400'
          )}
        >
          {new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>
    </div>
  );
}
