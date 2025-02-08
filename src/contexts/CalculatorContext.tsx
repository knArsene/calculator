import React, { createContext, useContext, useState } from "react";

type CalculatorContextType = {
  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const CalculatorContext = createContext<CalculatorContextType | undefined>(
  undefined,
);

export function CalculatorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <CalculatorContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
}
