import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCalculatorHistory } from "@/contexts/CalculatorHistoryContext";

export const AgeCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [age, setAge] = useState<{
    years: number;
    months: number;
    days: number;
  } | null>(null);

  const { addToHistory, getHistory } = useCalculatorHistory();
  const history = getHistory("Age Calculator");

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const today = new Date();

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const lastMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        birth.getDate(),
      );
      days = Math.floor(
        (today.getTime() - lastMonth.getTime()) / (1000 * 60 * 60 * 24),
      );
    }

    const result = { years, months, days };
    setAge(result);

    addToHistory({
      calculator: "Age Calculator",
      inputs: { birthDate },
      result,
    });
  };

  return (
    <Card className="p-6 bg-background">
      <h2 className="text-2xl font-bold mb-4">Age Calculator</h2>

      <div className="space-y-4">
        <div>
          <Label>Birth Date</Label>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
          />
        </div>

        <Button onClick={calculateAge} className="w-full">
          Calculate Age
        </Button>

        {age && (
          <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
            <p className="text-lg font-semibold">
              Age: {age.years} years, {age.months} months, {age.days} days
            </p>
            <p className="text-muted-foreground">
              You've lived for approximately:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>{age.years * 365 + age.months * 30 + age.days} days</li>
              <li>
                {Math.floor((age.years * 365 + age.months * 30 + age.days) / 7)}{" "}
                weeks
              </li>
              <li>{age.years * 12 + age.months} months</li>
            </ul>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Recent Calculations</h3>
            <ScrollArea className="h-48 w-full rounded-md border">
              <div className="p-4 space-y-4">
                {history.map((entry) => (
                  <div
                    key={entry.timestamp}
                    className="p-3 bg-muted rounded-lg"
                  >
                    <p className="text-sm text-muted-foreground mb-1">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                    <p className="text-sm">
                      Birth Date:{" "}
                      {new Date(entry.inputs.birthDate).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-medium">
                      Age: {entry.result.years}y {entry.result.months}m{" "}
                      {entry.result.days}d
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </Card>
  );
};
