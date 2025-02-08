import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, ChevronRight } from "lucide-react";
import { useCalculator } from "@/contexts/CalculatorContext";

interface CalculatorCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType;
  calculators: string[];
}

import { categories } from "./calculators/index";

const CategoryGrid = () => {
  const { setSelectedCategory } = useCalculator();

  return (
    <div className="w-full min-h-[400px] bg-background p-6">
      <h2 className="text-2xl font-bold mb-6">Calculator Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="flex items-center gap-4 mb-4">
              {React.createElement(category.icon)}
              <h3 className="text-xl font-semibold">{category.title}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{category.description}</p>
            <div className="space-y-2">
              {category.calculators.map((calc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm text-muted-foreground"
                >
                  <span>{calc}</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              ))}
            </div>
            <Button
              variant="ghost"
              className="w-full mt-4"
              onClick={() => setSelectedCategory(category.id)}
            >
              View All
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
