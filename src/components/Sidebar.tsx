
import {
  BarChart3,
  Calendar,
  GanttChart,
  Home,
  Map,
  PieChart,
  Settings,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarProps {
  isOpen: boolean;
  className?: string;
}

export default function Sidebar({ isOpen, className }: SidebarProps) {
  const navItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: BarChart3, label: "Charts", href: "/charts" },
    { icon: Map, label: "Maps", href: "/maps" },
    { icon: GanttChart, label: "Time Series", href: "/time-series" },
    { icon: PieChart, label: "Demographics", href: "/demographics" },
    { icon: Calendar, label: "Historical", href: "/historical" },
    { icon: Users, label: "Population", href: "/population" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300",
        isOpen ? "w-64" : "w-0 md:w-16",
        className
      )}
    >
      <div className="border-b px-3 py-2 h-16 flex items-center">
        <h2 className={cn("text-lg font-semibold", !isOpen && "md:sr-only")}>
          Navigation
        </h2>
      </div>
      <ScrollArea className="flex-1 pt-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              asChild
              className={cn(
                "w-full justify-start gap-3",
                !isOpen && "md:justify-center md:px-2"
              )}
            >
              <a href={item.href}>
                <item.icon className="h-5 w-5" />
                <span className={cn("text-sm", !isOpen && "md:sr-only")}>
                  {item.label}
                </span>
              </a>
            </Button>
          ))}
        </nav>
      </ScrollArea>
      <div className="border-t p-4">
        <div className={cn("flex items-center gap-3", !isOpen && "md:justify-center")}>
          <div className="h-8 w-8 rounded-full bg-dataviz-blue" />
          <div className={cn(!isOpen && "md:sr-only")}>
            <p className="text-sm font-medium">Data Explorer</p>
            <p className="text-xs text-muted-foreground">Public User</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
