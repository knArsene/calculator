import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { useCalculator } from "@/contexts/CalculatorContext";

interface CategoryViewProps {
  categoryId: string;
  title: string;
  calculators: string[];
  onCalculatorSelect: (calculator: string) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({
  categoryId,
  title,
  calculators,
  onCalculatorSelect,
}) => {
  const { setSelectedCategory } = useCalculator();

  return (
    <Card className="p-6 bg-background">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSelectedCategory(null)}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h2 className="text-2xl font-bold">{title} Calculators</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {calculators.map((calculator, index) => (
          <Button
            key={index}
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2 p-4"
            onClick={() => onCalculatorSelect(calculator)}
          >
            <span className="text-lg font-medium">{calculator}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default CategoryView;
