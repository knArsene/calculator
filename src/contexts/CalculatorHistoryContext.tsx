import React, { createContext, useContext, useEffect, useState } from "react";

type HistoryEntry = {
  calculator: string;
  inputs: Record<string, any>;
  result: any;
  timestamp: number;
};

type CalculatorHistoryContextType = {
  addToHistory: (entry: Omit<HistoryEntry, "timestamp">) => void;
  getHistory: (calculator: string) => HistoryEntry[];
  clearHistory: (calculator: string) => void;
};

const CalculatorHistoryContext = createContext<
  CalculatorHistoryContextType | undefined
>(undefined);

const HISTORY_KEY = "calculator_history";
const MAX_HISTORY_ITEMS = 5;

export function CalculatorHistoryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [history, setHistory] = useState<Record<string, HistoryEntry[]>>({});

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_KEY);
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  }, [history]);

  const addToHistory = (entry: Omit<HistoryEntry, "timestamp">) => {
    setHistory((prev) => {
      const calculatorHistory = prev[entry.calculator] || [];
      const newEntry = { ...entry, timestamp: Date.now() };

      // Add new entry and keep only the last MAX_HISTORY_ITEMS
      const updatedHistory = [newEntry, ...calculatorHistory].slice(
        0,
        MAX_HISTORY_ITEMS,
      );

      return {
        ...prev,
        [entry.calculator]: updatedHistory,
      };
    });
  };

  const getHistory = (calculator: string) => {
    return history[calculator] || [];
  };

  const clearHistory = (calculator: string) => {
    setHistory((prev) => {
      const newHistory = { ...prev };
      delete newHistory[calculator];
      return newHistory;
    });
  };

  return (
    <CalculatorHistoryContext.Provider
      value={{ addToHistory, getHistory, clearHistory }}
    >
      {children}
    </CalculatorHistoryContext.Provider>
  );
}

export function useCalculatorHistory() {
  const context = useContext(CalculatorHistoryContext);
  if (context === undefined) {
    throw new Error(
      "useCalculatorHistory must be used within a CalculatorHistoryProvider",
    );
  }
  return context;
}
