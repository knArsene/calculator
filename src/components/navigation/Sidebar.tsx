import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCalculator } from "@/contexts/CalculatorContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Calculator,
  ChevronRight,
  Clock,
  Home,
  Menu,
  Percent,
  PlusSquare,
  Settings,
  Sigma,
} from "lucide-react";

interface SidebarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const defaultCategories = [
  { title: "Scientific", icon: <Calculator size={20} />, href: "/scientific" },
  { title: "Physics", icon: <Sigma size={20} />, href: "/physics" },
  { title: "Finance", icon: <Percent size={20} />, href: "/finance" },
  { title: "Academic", icon: <PlusSquare size={20} />, href: "/academic" },
];

const defaultQuickLinks = [
  { title: "Home", icon: <Home size={20} />, href: "/" },
  { title: "Recent", icon: <Clock size={20} />, href: "/recent" },
  { title: "Settings", icon: <Settings size={20} />, href: "/settings" },
];

export default function Sidebar({ open = true, onOpenChange }: SidebarProps) {
  const { setSelectedCategory, isDarkMode, toggleDarkMode } = useCalculator();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenChange = (value: boolean) => {
    setIsOpen(value);
    onOpenChange?.(value);
  };

  const NavItem = ({ item }: { item: NavItem }) => (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2 px-2"
      onClick={() => {
        if (item.href.startsWith("/") && item.href !== "/") {
          setSelectedCategory(item.href.substring(1));
        }
      }}
    >
      {item.icon}
      <span>{item.title}</span>
    </Button>
  );

  const SidebarContent = () => (
    <div className="flex h-full w-full flex-col bg-background p-4">
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 text-lg font-semibold">Quick Access</h2>
          <div className="space-y-1">
            {defaultQuickLinks.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 text-lg font-semibold">Categories</h2>
          <div className="space-y-1">
            {defaultCategories.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 text-lg font-semibold">Recent Calculators</h2>
          <div className="space-y-1">
            {["Basic Calculator", "Unit Converter", "BMI Calculator"].map(
              (calc, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start gap-2 px-2"
                >
                  <Calculator size={20} />
                  <span>{calc}</span>
                </Button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 z-40 lg:hidden"
        >
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] border-r p-0">
        <ScrollArea className="h-full w-full">
          <SidebarContent />
        </ScrollArea>
      </SheetContent>

      <div
        className={cn(
          "fixed left-0 top-0 z-30 hidden h-full w-[280px] border-r bg-background lg:block",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <ScrollArea className="h-full w-full">
          <SidebarContent />
        </ScrollArea>

        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-4 hidden lg:flex"
          onClick={() => handleOpenChange(!isOpen)}
        >
          <ChevronRight
            size={24}
            className={cn("transition-transform", isOpen ? "rotate-180" : "")}
          />
        </Button>
      </div>
    </Sheet>
  );
}
