
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { label: "Environmental", value: "environment" },
    { label: "Education", value: "education" },
    { label: "Economic", value: "economy" },
    { label: "Healthcare", value: "healthcare" },
    { label: "Transportation", value: "transportation" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search functionality
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <a href="/" className="flex items-center space-x-2">
            <div className="rounded-full bg-dataviz-blue p-1">
              <div className="h-6 w-6 rounded-full bg-dataviz-teal" />
            </div>
            <span className="hidden font-bold sm:inline-block">DataViz Portal</span>
          </a>
        </div>
        
        <div className={cn(
          "search-container transition-all duration-300 ease-in-out",
          isSearchExpanded ? "w-full md:w-[600px]" : "w-auto"
        )}>
          <form onSubmit={handleSearch} className="relative w-full flex items-center">
            <Input
              type="search"
              placeholder="Search datasets..."
              className={cn(
                "pr-10 transition-all duration-300",
                isSearchExpanded ? "w-full" : "w-0 md:w-[200px] opacity-0 md:opacity-100"
              )}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchExpanded(true)}
              onBlur={() => {
                if (!searchQuery) setIsSearchExpanded(false);
              }}
            />
            
            <div className="absolute right-0 top-0 flex h-full items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-full px-2 py-1 text-muted-foreground">
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Categories</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuItem key={category.value}>
                      {category.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button type="submit" variant="ghost" size="icon" className="h-full">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </form>
        </div>
        
        <nav className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            Share
          </Button>
          <Button size="sm">Get API Key</Button>
        </nav>
      </div>
    </header>
  );
}
