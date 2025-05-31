import React from "react";
import { FormErrors, UserFormData } from "@/components/onboarding/form";

export function validateOnboardingForm(formData: UserFormData, setErrors: React.Dispatch<React.SetStateAction<FormErrors>>): boolean {
    const newErrors: FormErrors = {};

    // Height validation
    if (!formData.height) {
        newErrors.height = "Height is required"
    } else if (isNaN(Number(formData.height)) || Number(formData.height) <= 0) {
        newErrors.height = "Please enter a valid height"
    } else if (formData.heightUnit === "cm" && (Number(formData.height) < 50 || Number(formData.height) > 300)) {
        newErrors.height = "Height must be between 50-300 cm"
    } else if (formData.heightUnit === "ft" && (Number(formData.height) < 2 || Number(formData.height) > 10)) {
        newErrors.height = "Height must be between 2-10 feet"
    }

    // Weight validation
    if (!formData.weight) {
        newErrors.weight = "Weight is required"
    } else if (isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
        newErrors.weight = "Please enter a valid weight"
    } else if (formData.weightUnit === "kg" && (Number(formData.weight) < 20 || Number(formData.weight) > 500)) {
        newErrors.weight = "Weight must be between 20-500 kg"
    } else if (formData.weightUnit === "lbs" && (Number(formData.weight) < 44 || Number(formData.weight) > 1100)) {
        newErrors.weight = "Weight must be between 44-1100 lbs"
    }

    // Age validation
    if (!formData.age) {
        newErrors.age = "Age is required"
    } else if (isNaN(Number(formData.age)) || Number(formData.age) < 13 || Number(formData.age) > 120) {
        newErrors.age = "Age must be between 13-120 years"
    }

    // Gender validation
    if (!formData.gender) {
        newErrors.gender = "Please select your gender"
    }

    // Training frequency validation
    if (!formData.trainingFrequency) {
        newErrors.trainingFrequency = "Please select your training frequency"
    }

    // Fitness objective validation
    if (!formData.fitnessObjective) {
        newErrors.fitnessObjective = "Please select your fitness objective"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
}
