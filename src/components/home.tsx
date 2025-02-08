import React, { useState } from "react";
import Header from "./layout/Header";
import Sidebar from "./navigation/Sidebar";
import MainCalculator from "./calculator/MainCalculator";
import CategoryGrid from "./calculator/CategoryGrid";
import CategoryView from "./calculator/CategoryView";
import { useCalculator } from "@/contexts/CalculatorContext";

import { categories, calculatorComponents } from "./calculator/calculators";

const getCategoryById = (id: string) => categories.find((cat) => cat.id === id);

const Home = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(
    null,
  );
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { selectedCategory, isDarkMode, toggleDarkMode } = useCalculator();

  const handleSearch = (searchTerm: string) => {
    console.log("Searching for:", searchTerm);
  };

  const handleCalculatorSelect = (calculator: string) => {
    setSelectedCalculator(calculator);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        isDarkMode={isDarkMode}
        onThemeToggle={toggleDarkMode}
        onSearch={handleSearch}
      />

      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "lg:pl-[280px]" : "lg:pl-0"
        }`}
      >
        <div className="container mx-auto p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              {selectedCalculator &&
              calculatorComponents[selectedCalculator] ? (
                React.createElement(calculatorComponents[selectedCalculator])
              ) : (
                <MainCalculator />
              )}
            </div>
            <div className="lg:col-span-2">
              {selectedCategory ? (
                <CategoryView
                  categoryId={selectedCategory}
                  title={getCategoryById(selectedCategory)?.title || ""}
                  calculators={
                    getCategoryById(selectedCategory)?.calculators || []
                  }
                  onCalculatorSelect={handleCalculatorSelect}
                />
              ) : (
                <CategoryGrid />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
