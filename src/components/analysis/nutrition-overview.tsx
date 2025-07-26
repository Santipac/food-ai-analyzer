import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { NutritionAnalysisResponse } from '@/interfaces/nutrition-analysis';
import { Badge } from '../ui/badge';
import { Zap } from 'lucide-react';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import {
  getHealthScoreBg,
  getHealthScoreColor,
} from '@/helpers/nutrition-overview';

interface NutritionOverviewProps {
  nutritionData: NutritionAnalysisResponse;
}

export default function NutritionOverview({
  nutritionData,
}: NutritionOverviewProps) {
  const { dishName, calories, healthScore, macros } = nutritionData;

  return (
    <Card className="shadow-lg border-0 bg-neutral-900 backdrop-blur">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-orange-600" />
          Nutrition Overview
        </CardTitle>
        <CardDescription>
          Caloric content and overall health assessment for{' '}
          {dishName || 'the meal'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-orange-600">
              {calories ?? 'N/A'}
            </div>
            <p className="text-neutral-400 font-medium">Total Calories</p>
            <div className="flex items-center justify-center gap-2 text-sm text-neutral-400">
              <Zap className="h-4 w-4" />
              <span>Energy Content</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-400">Health Score</span>
              <Badge
                variant="secondary"
                className={`${getHealthScoreBg(
                  healthScore ?? 0
                )} ${getHealthScoreColor(
                  healthScore ?? 0
                )} border-0 font-semibold`}
              >
                {typeof healthScore === 'number'
                  ? healthScore >= 80
                    ? 'Excellent'
                    : healthScore >= 60
                    ? 'Good'
                    : 'Needs Improvement'
                  : 'Not Rated'}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className={`text-3xl font-bold ${getHealthScoreColor(
                    healthScore ?? 0
                  )}`}
                >
                  {healthScore ?? 'N/A'}
                </span>
                <span className="text-sm text-gray-500">/ 100</span>
              </div>
              <Progress value={healthScore ?? 0} className="h-3" />
              <p className="text-xs text-gray-500 text-center">
                Based on nutritional balance and quality
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-lg font-semibold text-purple-600">
              {`${macros?.protein?.grams ?? 'N/A'}`}{' '}
              {macros?.protein?.grams ? 'g' : ''}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Protein
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold text-blue-600">
              {`${macros?.carbs?.grams ?? 'N/A'}`}{' '}
              {macros?.carbs?.grams ? 'g' : ''}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Carbs
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-lg font-semibold text-green-600">
              {`${macros?.fat?.grams ?? 'N/A'}`} {macros?.fat?.grams ? 'g' : ''}
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              Fat
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
