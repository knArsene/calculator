import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const MortgageCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMortgage = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12; // Monthly interest rate
    const n = parseFloat(years) * 12; // Total number of months

    if (p && r && n) {
      const payment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(Math.round(payment * 100) / 100);
    }
  };

  return (
    <Card className="p-6 bg-background">
      <h2 className="text-2xl font-bold mb-4">Mortgage Calculator</h2>

      <div className="space-y-4">
        <div>
          <Label>Loan Amount ($)</Label>
          <Input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="Enter loan amount"
          />
        </div>

        <div>
          <Label>Annual Interest Rate (%)</Label>
          <Input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Enter annual interest rate"
          />
        </div>

        <div>
          <Label>Loan Term (Years)</Label>
          <Input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            placeholder="Enter loan term in years"
          />
        </div>

        <Button onClick={calculateMortgage} className="w-full">
          Calculate Monthly Payment
        </Button>

        {monthlyPayment !== null && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-lg font-semibold">
              Monthly Payment: ${monthlyPayment.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};
