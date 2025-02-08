import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(Math.round(bmiValue * 10) / 10);
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <Card className="p-6 bg-background">
      <h2 className="text-2xl font-bold mb-4">BMI Calculator</h2>

      <div className="space-y-4">
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

        <Button onClick={calculateBMI} className="w-full">
          Calculate BMI
        </Button>

        {bmi !== null && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-lg font-semibold">Your BMI: {bmi}</p>
            <p className="text-muted-foreground">
              Category: {getBMICategory(bmi)}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
