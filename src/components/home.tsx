import React, { useState } from "react";
import Header from "./layout/Header";
import Sidebar from "./navigation/Sidebar";
import MainCalculator from "./calculator/MainCalculator";
import CategoryGrid from "./calculator/CategoryGrid";
import CategoryView from "./calculator/CategoryView";
import { useCalculator } from "@/contexts/CalculatorContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { categories, calculatorComponents } from "./calculator/calculators";

const getCategoryById = (id: string) => categories.find((cat) => cat.id === id);

const Home = () => {
  const [selectedCalculator, setSelectedCalculator] = useState<string | null>(
    null,
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { selectedCategory, isDarkMode, toggleDarkMode } = useCalculator();

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const allCalculators = Object.keys(calculatorComponents);
    const results = allCalculators.filter((calc) =>
      calc.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSearchResults(results);
  };

  const handleCalculatorSelect = (calculator: string) => {
    setSelectedCalculator(calculator);
    setIsSearching(false);
  };

  const SearchResults = () => (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Search Results</h2>
      {searchResults.length === 0 ? (
        <p className="text-muted-foreground">No calculators found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((calculator) => (
            <Button
              key={calculator}
              variant="outline"
              className="h-24 flex flex-col items-center justify-center gap-2 p-4"
              onClick={() => handleCalculatorSelect(calculator)}
            >
              <span className="text-lg font-medium">{calculator}</span>
            </Button>
          ))}
        </div>
      )}
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header
        isDarkMode={isDarkMode}
        onThemeToggle={toggleDarkMode}
        onSearch={handleSearch}
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
      />

      <Sidebar open={sidebarOpen} onOpenChange={setSidebarOpen} />

      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "lg:pl-[280px]" : "lg:pl-0"
        }`}
      >
        <div className="container mx-auto p-6 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div
              className="lg:col-span-1"
              style={{
                backgroundColor: selectedCalculator ? "#F2EFE7" : "transparent",
                borderRadius: "0.5rem",
                padding: selectedCalculator ? "1rem" : "0",
              }}
            >
              {selectedCalculator &&
              calculatorComponents[selectedCalculator] ? (
                React.createElement(calculatorComponents[selectedCalculator])
              ) : (
                <MainCalculator />
              )}
            </div>
            <div className="lg:col-span-2">
              {isSearching ? (
                <SearchResults />
              ) : selectedCategory ? (
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
