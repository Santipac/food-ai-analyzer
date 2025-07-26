import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Activity, Target, User as UserIcon } from 'lucide-react';
import { Separator } from '../ui/separator';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { validateOnboardingForm } from '@/helpers/onboarding-validation';
import { useUserStore } from '@/stores/use-user';
import type { User } from '@/interfaces/user';

export interface UserFormData {
  height: string;
  heightUnit: string;
  weight: string;
  weightUnit: string;
  gender: string;
  age: string;
  trainingFrequency: string;
  fitnessObjective: string;
}

export interface FormErrors {
  height?: string;
  weight?: string;
  gender?: string;
  age?: string;
  trainingFrequency?: string;
  fitnessObjective?: string;
}

export default function OnboardingForm() {
  const { setUser } = useUserStore();
  const [formData, setFormData] = useState<UserFormData>({
    height: '',
    heightUnit: 'cm',
    weight: '',
    weightUnit: 'kg',
    gender: '',
    age: '',
    trainingFrequency: '',
    fitnessObjective: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleChange(field: keyof UserFormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (field in errors) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field as keyof FormErrors];
        return newErrors;
      });
    }
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (validateOnboardingForm(formData, setErrors)) {
      setIsSubmitted(true);
      setUser(formData as User);
    }
  }

  return (
    <section className="mt-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">
            Welcome to Your Fitness Journey
          </CardTitle>
          <CardDescription className="text-lg text-neutral-400">
            Let's get to know you better to create a personalized experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Height */}
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)*</Label>
                  <div className="flex gap-2">
                    <Input
                      id="height"
                      type="number"
                      placeholder="170"
                      value={formData.height}
                      onChange={e => handleChange('height', e.target.value)}
                      className={errors.height ? 'border-red-500' : ''}
                      step="0.1"
                    />
                  </div>
                  {errors.height && (
                    <p className="text-sm text-red-500">{errors.height}</p>
                  )}
                </div>

                {/* Weight */}
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)*</Label>
                  <div className="flex gap-2">
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={formData.weight}
                      onChange={e => handleChange('weight', e.target.value)}
                      className={errors.weight ? 'border-red-500' : ''}
                      step="0.1"
                    />
                  </div>
                  {errors.weight && (
                    <p className="text-sm text-red-500">{errors.weight}</p>
                  )}
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label htmlFor="age">Age *</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={e => handleChange('age', e.target.value)}
                    className={errors.age ? 'border-red-500' : ''}
                    min="13"
                    max="120"
                  />
                  {errors.age && (
                    <p className="text-sm text-red-500">{errors.age}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="training-frequency">
                    How often do you train per week? *
                  </Label>
                  <Select
                    value={formData.trainingFrequency}
                    onValueChange={value =>
                      handleChange('trainingFrequency', value)
                    }
                  >
                    <SelectTrigger
                      className={cn(
                        'w-full',
                        errors.trainingFrequency ? 'border-red-500' : ''
                      )}
                    >
                      <SelectValue placeholder="Select training frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0 times per week">
                        I don't train currently
                      </SelectItem>
                      <SelectItem value="1-2 times per week">
                        1-2 times per week
                      </SelectItem>
                      <SelectItem value="3-4 times per week">
                        3-4 times per week
                      </SelectItem>
                      <SelectItem value="5-6 times per week">
                        5-6 times per week
                      </SelectItem>
                      <SelectItem value="7+ times per week">
                        7+ times per week
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.trainingFrequency && (
                    <p className="text-sm text-red-500">
                      {errors.trainingFrequency}
                    </p>
                  )}
                </div>
                {/* Gender */}
                <div className="space-y-3">
                  <Label>Gender *</Label>
                  <RadioGroup
                    value={formData.gender}
                    onValueChange={value => handleChange('gender', value)}
                    className="flex gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" />
                      <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" />
                      <Label htmlFor="female">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                  {errors.gender && (
                    <p className="text-sm text-red-500">{errors.gender}</p>
                  )}
                </div>
              </div>
            </div>

            <Separator />

            {/* Goals Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-semibold">
                  Your Goals
                </h3>
              </div>

              <div className="space-y-3">
                <Label>What's your primary fitness objective? *</Label>
                <RadioGroup
                  value={formData.fitnessObjective}
                  onValueChange={value =>
                    handleChange('fitnessObjective', value)
                  }
                  className="space-y-3"
                >
                  <Label
                    htmlFor="gain-mass"
                    className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem
                      value="gain-mass"
                      id="gain-mass"
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <span className="font-medium">Gain Mass</span>
                      <p className="text-sm text-neutral-400">
                        Build muscle and increase overall body weight
                      </p>
                    </div>
                  </Label>
                  <Label
                    htmlFor="lose-fat"
                    className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem
                      value="lose-fat"
                      id="lose-fat"
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <span className="font-medium">Lose Fat</span>
                      <p className="text-sm text-neutral-400">
                        Reduce body fat and improve body composition
                      </p>
                    </div>
                  </Label>
                  <Label
                    htmlFor="longevity"
                    className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-neutral-700 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem
                      value="longevity"
                      id="longevity"
                      className="mt-1"
                    />
                    <div className="space-y-1">
                      <span className="font-medium">Longevity</span>
                        <p className="text-sm text-neutral-400">
                        Focus on long-term health and wellness
                      </p>
                    </div>
                  </Label>
                </RadioGroup>
                {errors.fitnessObjective && (
                  <p className="text-sm text-red-500">
                    {errors.fitnessObjective}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold"
              >
                Complete Your Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
