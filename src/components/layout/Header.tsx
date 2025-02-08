import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Moon, Sun } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeaderProps {
  isDarkMode?: boolean;
  onThemeToggle?: () => void;
  onSearch?: (searchTerm: string) => void;
}

const Header = ({
  isDarkMode = false,
  onThemeToggle = () => {},
  onSearch = () => {},
}: HeaderProps) => {
  return (
    <header className="w-full h-16 bg-background border-b border-border px-4 flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-foreground">Calculator Hub</h1>
      </div>

      <div className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            className="w-full pl-10"
            placeholder="Search calculators..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={onThemeToggle}
                className="h-10 w-10"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default Header;
