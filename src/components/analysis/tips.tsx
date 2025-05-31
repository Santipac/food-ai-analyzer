import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { NutritionAnalysisResponse } from '@/interfaces/nutrition-analysis';
import { Info } from 'lucide-react';

interface TipsProps {
  tips: NutritionAnalysisResponse['tips'];
}

export default function Tips({ tips }: TipsProps) {
  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Info className="h-5 w-5 text-blue-600" />
          Personalized Dietary Tips
        </CardTitle>
        <CardDescription>
          AI-powered recommendations to optimize your nutrition
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tips ? (
          <div className="space-y-3">
            {tips.map((tip, index) => (
              <div key={index} className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No data available</p>
        )}
      </CardContent>
    </Card>
  );
}
