
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { DataSet, fetchAllDataSets, ChartData } from "@/services/dataService";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataCard from "@/components/DataCard";
import BarChartViz from "@/components/visualizations/BarChartViz";
import LineChartViz from "@/components/visualizations/LineChartViz";
import PieChartViz from "@/components/visualizations/PieChartViz";
import MapViz from "@/components/visualizations/MapViz";
import { LayoutDashboard, CalendarDays, Filter, BarChart3, PieChart, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [datasets, setDatasets] = useState<DataSet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDataset, setSelectedDataset] = useState<DataSet | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchAllDataSets();
        setDatasets(data);
        setSelectedDataset(data[0]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Convert the first dataset to chart data
  const getBarChartData = (): ChartData[] => {
    if (!selectedDataset) return [];
    return selectedDataset.points.map(point => ({
      name: point.title,
      value: point.value
    }));
  };

  // Get mock data for line chart
  const getLineChartData = (): ChartData[] => {
    if (!datasets || datasets.length < 2) return [];
    
    // Create time-series data
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    return months.map(month => {
      return {
        name: month,
        value: Math.floor(Math.random() * 50) + 50
      };
    });
  };

  // Get pie chart data from a dataset
  const getPieChartData = (): ChartData[] => {
    if (!datasets || datasets.length < 2) return [];
    
    const dataset = datasets[1];
    return dataset.points.map(point => ({
      name: point.title,
      value: point.value
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar isOpen={isSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 md:p-6 overflow-auto transition-all duration-300" style={{
          marginLeft: isSidebarOpen && !isMobile ? "16rem" : isMobile ? "0" : "4rem"
        }}>
          <div className="container max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Public Data Explorer</h1>
                <p className="text-muted-foreground mt-1">
                  Interactive visualizations of public datasets
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="hidden md:flex gap-1">
                  <CalendarDays className="h-4 w-4" />
                  <span>Latest Data</span>
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5" />
                <span>Featured Visualizations</span>
              </h2>
              
              <Tabs defaultValue="charts">
                <TabsList className="mb-4">
                  <TabsTrigger value="charts" className="gap-1">
                    <BarChart3 className="h-4 w-4" />
                    <span>Charts</span>
                  </TabsTrigger>
                  <TabsTrigger value="maps" className="gap-1">
                    <Map className="h-4 w-4" />
                    <span>Maps</span>
                  </TabsTrigger>
                  <TabsTrigger value="demographics" className="gap-1">
                    <PieChart className="h-4 w-4" />
                    <span>Demographics</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="charts" className="space-y-4">
                  {isLoading ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Skeleton className="h-[350px] w-full rounded-lg" />
                      <Skeleton className="h-[350px] w-full rounded-lg" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in">
                      <div className="data-card">
                        <div className="data-card-header">
                          {selectedDataset?.title || "Bar Chart"}
                        </div>
                        <div className="data-card-content">
                          <BarChartViz 
                            data={getBarChartData()} 
                            height={300} 
                          />
                        </div>
                      </div>
                      
                      <div className="data-card">
                        <div className="data-card-header">
                          Monthly Trend
                        </div>
                        <div className="data-card-content">
                          <LineChartViz 
                            data={getLineChartData()} 
                            height={300} 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="maps">
                  {isLoading ? (
                    <Skeleton className="h-[400px] w-full rounded-lg" />
                  ) : (
                    <MapViz 
                      points={datasets[0].points}
                      title="Geographic Distribution"
                      className="animate-fade-in"
                    />
                  )}
                </TabsContent>
                
                <TabsContent value="demographics">
                  {isLoading ? (
                    <Skeleton className="h-[400px] w-full rounded-lg" />
                  ) : (
                    <div className="data-card animate-fade-in">
                      <div className="data-card-header">
                        Demographic Breakdown
                      </div>
                      <div className="data-card-content">
                        <PieChartViz 
                          data={getPieChartData()} 
                          height={300} 
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Available Datasets</h2>
              
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {datasets.map((dataset) => (
                    <DataCard 
                      key={dataset.id} 
                      dataset={dataset} 
                      onViewDetails={() => setSelectedDataset(dataset)}
                      className="animate-fade-in"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
