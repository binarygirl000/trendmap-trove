
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DataSet } from "@/services/dataService";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, BarChart3, Map, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DataCardProps {
  dataset: DataSet;
  className?: string;
  onViewDetails?: (dataset: DataSet) => void;
}

export default function DataCard({ dataset, className = "", onViewDetails }: DataCardProps) {
  // Get average trend from all data points
  const avgTrend = dataset.points.reduce((acc, point) => acc + point.trend, 0) / dataset.points.length;

  // Determine which icon to display based on category
  const getIcon = () => {
    switch (dataset.category) {
      case "environment":
        return <Map className="h-5 w-5" />;
      case "education":
        return <PieChart className="h-5 w-5" />;
      case "economy":
        return <BarChart3 className="h-5 w-5" />;
      default:
        return <BarChart3 className="h-5 w-5" />;
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-md overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {dataset.category}
          </Badge>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Updated: {dataset.lastUpdated}</span>
          </div>
        </div>
        <CardTitle className="text-lg font-semibold mt-2">{dataset.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{dataset.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm font-medium">{dataset.points.length} data points</span>
            {avgTrend !== 0 && (
              <div className={`flex items-center ${avgTrend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {avgTrend > 0 ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                <span className="text-xs">{Math.abs(avgTrend).toFixed(1)}%</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Source:</span>
            <span className="text-xs font-medium">{dataset.source}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <Button variant="ghost" size="sm" className="gap-1">
          {getIcon()}
          <span>Preview</span>
        </Button>
        <Button variant="outline" size="sm" onClick={() => onViewDetails?.(dataset)}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
