import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PercentageCalculator = () => {
  const [number, setNumber] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const calculatePercentage = () => {
    const num = parseFloat(number);
    const perc = parseFloat(percentage);

    if (num && perc) {
      setResult((num * perc) / 100);
    }
  };

  return (
    <Card className="p-6 bg-background">
      <h2 className="text-2xl font-bold mb-4">Percentage Calculator</h2>

      <div className="space-y-4">
        <div>
          <Label>Number</Label>
          <Input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Enter number"
          />
        </div>

        <div>
          <Label>Percentage (%)</Label>
          <Input
            type="number"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            placeholder="Enter percentage"
          />
        </div>

        <Button onClick={calculatePercentage} className="w-full">
          Calculate
        </Button>

        {result !== null && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-lg font-semibold">
              {percentage}% of {number} = {result}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
