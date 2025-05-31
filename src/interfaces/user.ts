export type Objective = "gain-muscle" | "lose-fat" | "longevity"
export type Gender = "male" | "female" | "other"

export interface User {
    height: string;
    heightUnit: "cm";
    weight: string;
    weightUnit: "kg";
    gender: Gender;
    age: string;
    trainingFrequency: string;
    fitnessObjective: Objective;
}