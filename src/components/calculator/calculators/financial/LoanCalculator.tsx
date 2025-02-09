import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCalculatorHistory } from "@/contexts/CalculatorHistoryContext";

export const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const { addToHistory, getHistory } = useCalculatorHistory();
  const history = getHistory("Loan Calculator");

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const months = parseFloat(loanTerm) * 12; // Total months

    if (principal && rate && months) {
      const monthlyPmt =
        (principal * rate * Math.pow(1 + rate, months)) /
        (Math.pow(1 + rate, months) - 1);
      const totalPmt = monthlyPmt * months;

      const monthlyPaymentRounded = Math.round(monthlyPmt * 100) / 100;
      const totalPaymentRounded = Math.round(totalPmt * 100) / 100;

      setMonthlyPayment(monthlyPaymentRounded);
      setTotalPayment(totalPaymentRounded);

      // Add calculation to history
      addToHistory({
        calculator: "Loan Calculator",
        inputs: {
          loanAmount: principal,
          interestRate: parseFloat(interestRate),
          loanTerm: parseFloat(loanTerm),
        },
        result: {
          monthlyPayment: monthlyPaymentRounded,
          totalPayment: totalPaymentRounded,
          totalInterest: totalPaymentRounded - principal,
        },
      });
    }
  };

  return (
    <Card className="p-6 bg-background">
      <h2 className="text-2xl font-bold mb-4">Loan Calculator</h2>

      <div className="space-y-4">
        <div>
          <Label>Loan Amount ($)</Label>
          <Input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Enter loan amount"
          />
        </div>

        <div>
          <Label>Annual Interest Rate (%)</Label>
          <Input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            placeholder="Enter annual interest rate"
          />
        </div>

        <div>
          <Label>Loan Term (Years)</Label>
          <Input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            placeholder="Enter loan term in years"
          />
        </div>

        <Button onClick={calculateLoan} className="w-full">
          Calculate Loan
        </Button>

        {monthlyPayment !== null && totalPayment !== null && (
          <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
            <p className="text-lg font-semibold">
              Monthly Payment: ${monthlyPayment.toLocaleString()}
            </p>
            <p className="text-lg font-semibold">
              Total Payment: ${totalPayment.toLocaleString()}
            </p>
            <p className="text-muted-foreground">
              Total Interest: $
              {(totalPayment - parseFloat(loanAmount)).toLocaleString()}
            </p>
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
                      ${entry.inputs.loanAmount.toLocaleString()} loan at{" "}
                      {entry.inputs.interestRate}% for {entry.inputs.loanTerm}{" "}
                      years
                    </p>
                    <p className="text-sm font-medium">
                      Monthly Payment: $
                      {entry.result.monthlyPayment.toLocaleString()}
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
