import { CategoryIcon } from "./CategoryIcon";
import { BasicCalculator } from "./BasicCalculator";
import { ScientificCalculator } from "./ScientificCalculator";
import { BMICalculator } from "./health/BMICalculator";
import { MortgageCalculator } from "./financial/MortgageCalculator";
import { PercentageCalculator } from "./math/PercentageCalculator";

export const calculatorComponents = {
  "Basic Calculator": BasicCalculator,
  "Scientific Calculator": ScientificCalculator,
  "BMI Calculator": BMICalculator,
  "Mortgage Calculator": MortgageCalculator,
  "Percentage Calculator": PercentageCalculator,
};

export const categories = [
  {
    id: "financial",
    title: "Financial Calculators",
    description: "Financial planning and analysis tools",
    icon: CategoryIcon,
    calculators: [
      "Mortgage Calculator",
      "Loan Calculator",
      "Auto Loan Calculator",
      "Interest Calculator",
      "Payment Calculator",
      "Retirement Calculator",
      "Amortization Calculator",
      "Investment Calculator",
      "Inflation Calculator",
      "Finance Calculator",
      "Income Tax Calculator",
      "Compound Interest Calculator",
      "Salary Calculator",
      "Interest Rate Calculator",
      "Sales Tax Calculator",
    ],
  },
  {
    id: "health",
    title: "Fitness & Health Calculators",
    description: "Health and fitness tracking tools",
    icon: CategoryIcon,
    calculators: [
      "BMI Calculator",
      "Calorie Calculator",
      "Body Fat Calculator",
      "BMR Calculator",
      "Ideal Weight Calculator",
      "Pace Calculator",
      "Pregnancy Calculator",
      "Pregnancy Conception Calculator",
      "Due Date Calculator",
    ],
  },
  {
    id: "math",
    title: "Math Calculators",
    description: "Mathematical and scientific tools",
    icon: CategoryIcon,
    calculators: [
      "Scientific Calculator",
      "Fraction Calculator",
      "Percentage Calculator",
      "Random Number Generator",
      "Triangle Calculator",
      "Standard Deviation Calculator",
    ],
  },
  {
    id: "other",
    title: "Other Calculators",
    description: "Utility and conversion tools",
    icon: CategoryIcon,
    calculators: [
      "Age Calculator",
      "Date Calculator",
      "Time Calculator",
      "Hours Calculator",
      "GPA Calculator",
      "Grade Calculator",
      "Concrete Calculator",
      "Subnet Calculator",
      "Password Generator",
      "Conversion Calculator",
    ],
  },
];
