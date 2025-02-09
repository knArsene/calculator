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

export const FractionCalculator = () => {
  const [num1, setNum1] = useState("");
  const [den1, setDen1] = useState("");
  const [num2, setNum2] = useState("");
  const [den2, setDen2] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState<{ num: number; den: number } | null>(
    null,
  );

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyFraction = (num: number, den: number) => {
    const divisor = gcd(Math.abs(num), Math.abs(den));
    return {
      num: num / divisor,
      den: den / divisor,
    };
  };

  const calculateFraction = () => {
    const n1 = parseInt(num1);
    const d1 = parseInt(den1);
    const n2 = parseInt(num2);
    const d2 = parseInt(den2);

    if (d1 === 0 || d2 === 0) {
      alert("Denominator cannot be zero");
      return;
    }

    let resultNum: number;
    let resultDen: number;

    switch (operation) {
      case "+":
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case "-":
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case "*":
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case "/":
        if (n2 === 0) {
          alert("Cannot divide by zero");
          return;
        }
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
      default:
        return;
    }

    setResult(simplifyFraction(resultNum, resultDen));
  };

  return (
    <Card className="p-6 bg-background">
      <h2 className="text-2xl font-bold mb-4">Fraction Calculator</h2>

      <div className="grid grid-cols-7 gap-4 items-end mb-4">
        <div className="col-span-2">
          <Label>First Fraction</Label>
          <div className="space-y-2">
            <Input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="Numerator"
            />
            <div className="border-t border-border w-full"></div>
            <Input
              type="number"
              value={den1}
              onChange={(e) => setDen1(e.target.value)}
              placeholder="Denominator"
            />
          </div>
        </div>

        <div className="col-span-1 flex items-center justify-center">
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger className="w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+">+</SelectItem>
              <SelectItem value="-">-</SelectItem>
              <SelectItem value="*">×</SelectItem>
              <SelectItem value="/">÷</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2">
          <Label>Second Fraction</Label>
          <div className="space-y-2">
            <Input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Numerator"
            />
            <div className="border-t border-border w-full"></div>
            <Input
              type="number"
              value={den2}
              onChange={(e) => setDen2(e.target.value)}
              placeholder="Denominator"
            />
          </div>
        </div>

        <div className="col-span-2 flex items-center">
          <Button onClick={calculateFraction} className="w-full">
            Calculate
          </Button>
        </div>
      </div>

      {result && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <p className="text-lg font-semibold mb-2">Result:</p>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-xl">{result.num}</div>
              <div className="border-t border-foreground w-12 mx-auto my-1"></div>
              <div className="text-xl">{result.den}</div>
            </div>
            <div className="text-xl">=</div>
            <div className="text-xl">
              {(result.num / result.den).toFixed(3)}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
