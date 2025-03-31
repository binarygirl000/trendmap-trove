
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for user preference on component mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark") || 
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.theme = 'light';
      setIsDarkMode(false);
      toast("Light mode", {
        description: "Switched to light appearance",
        position: "bottom-center",
      });
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = 'dark';
      setIsDarkMode(true);
      toast("Dark mode", {
        description: "Switched to dark appearance",
        position: "bottom-center",
      });
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-full bg-secondary hover:bg-secondary/80"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
