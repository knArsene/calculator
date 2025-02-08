import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, X, Divide, Equal, Delete, History } from "lucide-react";

interface CalculatorProps {
  onCalculate?: (result: number) => void;
  showHistory?: boolean;
  initialValue?: string;
}

const MainCalculator = ({
  onCalculate = () => {},
  showHistory = true,
  initialValue = "0",
}: CalculatorProps) => {
  const [display, setDisplay] = useState(initialValue);
  const [history, setHistory] = useState<string[]>([
    "2 + 2 = 4",
    "10 * 5 = 50",
  ]);

  const handleNumberClick = (num: string) => {
    setDisplay((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperatorClick = (operator: string) => {
    setDisplay((prev) => prev + " " + operator + " ");
  };

  const handleClear = () => {
    setDisplay("0");
  };

  const handleCalculate = () => {
    try {
      // This is just for UI demonstration - actual calculation logic would be more robust
      const result = eval(display);
      setHistory((prev) => [`${display} = ${result}`, ...prev]);
      setDisplay(result.toString());
      onCalculate(result);
    } catch (error) {
      setDisplay("Error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-background">
      <Card className="p-6 shadow-lg">
        <div className="mb-6 bg-muted p-4 rounded-lg">
          <div className="text-right text-3xl font-mono overflow-hidden">
            {display}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {/* First row */}
          <Button
            variant="outline"
            className="aspect-square text-xl"
            onClick={handleClear}
          >
            C
          </Button>
          <Button
            variant="outline"
            className="aspect-square text-xl"
            onClick={() => handleOperatorClick("/")}
          >
            <Divide className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            className="aspect-square text-xl"
            onClick={() => handleOperatorClick("*")}
          >
            <X className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            className="aspect-square text-xl"
            onClick={() => handleOperatorClick("-")}
          >
            <Minus className="h-6 w-6" />
          </Button>

          {/* Number pad */}
          {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
            <Button
              key={num}
              variant="outline"
              className="aspect-square text-xl"
              onClick={() => handleNumberClick(num.toString())}
            >
              {num}
            </Button>
          ))}

          {/* Last row */}
          <Button
            variant="outline"
            className="aspect-square text-xl"
            onClick={() => handleOperatorClick("+")}
          >
            <Plus className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            className="aspect-square text-xl"
            onClick={() => handleNumberClick("0")}
          >
            0
          </Button>
          <Button
            variant="outline"
            className="aspect-square text-xl"
            onClick={() => handleNumberClick(".")}
          >
            .
          </Button>
          <Button
            className="aspect-square text-xl bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handleCalculate}
          >
            <Equal className="h-6 w-6" />
          </Button>
        </div>

        {showHistory && (
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <History className="h-4 w-4" />
              <span className="text-sm font-medium">History</span>
            </div>
            <Separator className="mb-2" />
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {history.map((item, index) => (
                  <div
                    key={index}
                    className="text-sm text-muted-foreground p-2 hover:bg-muted rounded"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MainCalculator;
