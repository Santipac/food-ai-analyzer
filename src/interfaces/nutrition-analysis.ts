export interface NutritionAnalysisResponse {
    dishName?: string;
    calories?: number
    macros?: {
        protein: { grams: number; percentage: number }
        carbs: { grams: number; percentage: number }
        fat: { grams: number; percentage: number }
        fiber: { grams: number }
    }
    micronutrients?: Array<{ name: string; amount: string; dailyValue: number }>
    tips?: string[]
    healthScore?: number
    error?: string;
}