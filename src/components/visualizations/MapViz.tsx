
import { useEffect, useRef, useState } from 'react';
import { Card } from "@/components/ui/card";
import { DataPoint } from '@/services/dataService';
import { Skeleton } from '@/components/ui/skeleton';

interface MapVizProps {
  points: DataPoint[];
  title?: string;
  className?: string;
}

// This component renders a simple map visualization using a placeholder
// In a real application, you would use a mapping library like Mapbox or Leaflet
export default function MapViz({ points, title, className = "" }: MapVizProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // In a real implementation, this would initialize a map with the points
  const renderMap = () => {
    // For now, we'll just render a placeholder for the map
    return (
      <div className="p-4 text-center text-muted-foreground">
        <p>Map would display {points.length} data points</p>
        <div className="h-[240px] bg-accent/30 rounded-md mt-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/BlankMap-USA-states.png/1200px-BlankMap-USA-states.png')] bg-contain bg-no-repeat bg-center opacity-60" />
          {points.map((point, index) => {
            // Random positions for the demo
            const top = 20 + Math.random() * 60;
            const left = 20 + Math.random() * 60;
            
            return (
              <div
                key={point.id}
                className="absolute w-3 h-3 rounded-full bg-dataviz-teal shadow-lg cursor-pointer hover:scale-150 transition-transform"
                style={{
                  top: `${top}%`,
                  left: `${left}%`,
                  zIndex: 10
                }}
                title={`${point.title}: ${point.value}`}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      {title && <div className="p-4 border-b font-medium">{title}</div>}
      <div ref={mapRef} className="w-full h-[300px]">
        {isLoading ? (
          <div className="p-4">
            <Skeleton className="w-full h-[240px] rounded-md" />
          </div>
        ) : (
          renderMap()
        )}
      </div>
    </Card>
  );
}
