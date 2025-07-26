import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Target } from 'lucide-react';
import { NutritionAnalysisResponse } from '@/interfaces/nutrition-analysis';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';

interface MacroStatsProps {
  macroData: NutritionAnalysisResponse['macros'];
}

export default function MacroStats({ macroData }: MacroStatsProps) {
  return (
    <Card className="shadow-lg border-0 bg-neutral-900 backdrop-blur">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-purple-600" />
          Macronutrients
        </CardTitle>
      </CardHeader>
      {macroData ? (
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Protein</span>
              <span className="text-sm text-neutral-400">
                {macroData.protein.grams}g ({macroData.protein.percentage}%)
              </span>
            </div>
            <Progress value={macroData.protein.percentage} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Carbohydrates</span>
              <span className="text-sm text-neutral-400">
                {macroData.carbs.grams}g ({macroData.carbs.percentage}%)
              </span>
            </div>
            <Progress value={macroData.carbs.percentage} className="h-2" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Fat</span>
              <span className="text-sm text-neutral-400">
                {macroData.fat.grams}g ({macroData.fat.percentage}%)
              </span>
            </div>
            <Progress value={macroData.fat.percentage} className="h-2" />
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="font-medium">Fiber</span>
            <span className="text-sm text-neutral-400">
              {macroData.fiber.grams}g
            </span>
          </div>
        </CardContent>
      ) : (
        <CardContent>
          <p>No data available</p>
        </CardContent>
      )}
    </Card>
  );
}
