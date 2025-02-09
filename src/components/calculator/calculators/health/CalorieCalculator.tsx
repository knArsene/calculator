import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const CalorieCalculator = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [calories, setCalories] = useState<number | null>(null);

  const activityMultipliers = {
    sedentary: 1.2, // Little or no exercise
    light: 1.375, // Light exercise 1-3 days/week
    moderate: 1.55, // Moderate exercise 3-5 days/week
    active: 1.725, // Heavy exercise 6-7 days/week
    veryActive: 1.9, // Very heavy exercise, physical job
  };

  const calculateCalories = () => {
    const weightKg = parseFloat(weight);
    const heightCm = parseFloat(height);
    const ageYears = parseFloat(age);

    if (weightKg && heightCm && ageYears) {
      // Harris-Benedict BMR Formula
      let bmr;
      if (gender === "male") {
        bmr = 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * ageYears;
      } else {
        bmr = 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * ageYears;
      }

      // Calculate total daily calories needed
      const totalCalories = bmr * activityMultipliers[activityLevel];
      setCalories(Math.round(totalCalories));
    }
  };

  return (
    <Card className="p-6 bg-background">
      <h2 className="text-2xl font-bold mb-4">Calorie Calculator</h2>

      <div className="space-y-4">
        <div>
          <Label>Age (years)</Label>
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
          />
        </div>

        <div>
          <Label>Gender</Label>
          <Select value={gender} onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Height (cm)</Label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in centimeters"
          />
        </div>

        <div>
          <Label>Weight (kg)</Label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kilograms"
          />
        </div>

        <div>
          <Label>Activity Level</Label>
          <Select value={activityLevel} onValueChange={setActivityLevel}>
            <SelectTrigger>
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">
                Sedentary (little or no exercise)
              </SelectItem>
              <SelectItem value="light">
                Lightly active (1-3 days/week)
              </SelectItem>
              <SelectItem value="moderate">
                Moderately active (3-5 days/week)
              </SelectItem>
              <SelectItem value="active">
                Very active (6-7 days/week)
              </SelectItem>
              <SelectItem value="veryActive">
                Extra active (very physical job/training)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={calculateCalories} className="w-full">
          Calculate Daily Calories
        </Button>

        {calories !== null && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-lg font-semibold">
              Daily Calories Needed: {calories.toLocaleString()} calories
            </p>
            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
              <p>
                To lose weight: {Math.round(calories * 0.8).toLocaleString()}{" "}
                calories/day
              </p>
              <p>
                To gain weight: {Math.round(calories * 1.2).toLocaleString()}{" "}
                calories/day
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
