import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const ScientificCalculator = () => {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState<number>(0);

  const scientificFunctions = {
    sin: Math.sin,
    cos: Math.cos,
    tan: Math.tan,
    log: Math.log10,
    ln: Math.log,
    sqrt: Math.sqrt,
    pow2: (x: number) => Math.pow(x, 2),
    pow3: (x: number) => Math.pow(x, 3),
  };

  const handleScientificFunction = (func: keyof typeof scientificFunctions) => {
    try {
      const result = scientificFunctions[func](parseFloat(display));
      setDisplay(result.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  return (
    <Card className="p-6 bg-background">
      <div className="mb-4 bg-muted p-4 rounded-lg">
        <div className="text-right text-3xl font-mono overflow-hidden">
          {display}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {Object.keys(scientificFunctions).map((func) => (
          <Button
            key={func}
            variant="outline"
            onClick={() =>
              handleScientificFunction(func as keyof typeof scientificFunctions)
            }
          >
            {func}
          </Button>
        ))}
      </div>
    </Card>
  );
};
