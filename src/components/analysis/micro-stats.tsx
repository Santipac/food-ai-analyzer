import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { NutritionAnalysisResponse } from '@/interfaces/nutrition-analysis';
import { Heart } from 'lucide-react';
import { Badge } from '../ui/badge';

interface MicroStatsProps {
  micronutrients: NutritionAnalysisResponse['micronutrients'];
}

export default function MicroStats({ micronutrients }: MicroStatsProps) {
  return (
    <Card className="shadow-lg border-0 bg-neutral-900 backdrop-blur">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-red-600" />
          Key Micronutrients
        </CardTitle>
        <CardDescription>
          Essential vitamins and minerals in this meal
        </CardDescription>
      </CardHeader>
      <CardContent>
        {micronutrients ? (
          <div className="flex flex-col gap-4">
            {micronutrients.map((nutrient, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-neutral-700 rounded-lg"
              >
                <div>
                  <div className="font-medium">{nutrient.name}</div>
                  <div className="text-sm text-neutral-400">{nutrient.amount}</div>
                </div>
                <Badge variant="outline">{nutrient.dailyValue}% DV</Badge>
              </div>
            ))}
          </div>
        ) : (
          <CardContent>
            <p>No data available</p>
          </CardContent>
        )}
      </CardContent>
    </Card>
  );
}
