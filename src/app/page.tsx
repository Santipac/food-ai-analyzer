'use client';

import Form from '@/components/analysis/form';
import MacroStats from '@/components/analysis/macro-stats';
import MicroStats from '@/components/analysis/micro-stats';
import NutritionOverview from '@/components/analysis/nutrition-overview';
import Tips from '@/components/analysis/tips';
import OnboardingForm from '@/components/onboarding/form';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { NutritionAnalysisResponse } from '@/interfaces/nutrition-analysis';
import { useUserStore } from '@/stores/use-user';
import { Apple, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { useState, useTransition } from 'react';

export default function Home() {
  const { user } = useUserStore();
  const [data, setData] = useState<NutritionAnalysisResponse | null>(null);
  const [isPending, startTransition] = useTransition();
  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-200 to-blue-50 p-4">
      <article className="mx-auto max-w-2xl mt-16">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="p-3 bg-blue-100 rounded-full">
              <Apple className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">NutriAnalyzer</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Describe your meal and get instant nutritional insights powered by
            AI. Discover calories, macros, and personalized dietary tips.
          </p>
          {user && (
            <Button asChild variant="secondary">
              <Link href="/chat">
                <MessageCircle className="h-4 w-4 mr-2" />
                <span> Go to chat</span>
              </Link>
            </Button>
          )}
        </div>
        {user ? (
          <Form
            setData={setData}
            isPending={isPending}
            startTransition={startTransition}
          />
        ) : (
          <OnboardingForm />
        )}
      </article>

      {isPending && (
        <Skeleton className="h-40 w-full max-w-2xl mx-auto mt-16 bg-blue-50" />
      )}
      {data && !isPending && (
        <article className="mx-auto max-w-2xl mt-16 space-y-6">
          <NutritionOverview nutritionData={data} />
          <article className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <MacroStats macroData={data.macros} />
            <MicroStats micronutrients={data.micronutrients} />
          </article>
          <Tips tips={data.tips} />
        </article>
      )}
    </section>
  );
}
