'use client';
import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { NutritionAnalysisResponse } from '@/interfaces/nutrition-analysis';
import { Loader2, Send } from 'lucide-react';
import { useUserStore } from '@/stores/use-user';

interface FormProps {
  setData: (data: NutritionAnalysisResponse | null) => void;
  isPending: boolean;
  startTransition: React.TransitionStartFunction;
}

export default function Form({
  setData,
  isPending,
  startTransition,
}: FormProps) {
  const { user } = useUserStore();
  const [input, setInput] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleOnClick() {
    startTransition(async () => {
      try {
        const response = await fetch('/api/nutrition-analysis', {
          method: 'POST',
          body: JSON.stringify({
            messages: [{ role: 'user', content: input }],
            user: user,
          }),
        });
        const data = await response.json();

        if (!response.ok) {
          const errorMsg =
            data.error || data.details || `Error: ${response.statusText}`;
          throw new Error(errorMsg);
        }
        setData(data as NutritionAnalysisResponse);
      } catch (error) {
        setError('Something went wrong. Please try again.');
      } finally {
        setInput('');
      }
    });
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Describe your meal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter your meal description here..."
          className="resize-none"
          maxLength={144}
        />
        <Button
          className="cursor-pointer"
          disabled={isPending || !input.trim()}
          onClick={handleOnClick}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {isPending ? 'Analyzing...' : 'Send'}
        </Button>
      </CardContent>
      <CardFooter>
        {error && <p className="text-red-500">{error}</p>}
      </CardFooter>
    </Card>
  );
}
