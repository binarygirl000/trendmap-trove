
import { toast } from "sonner";

// Sample data structure
export interface DataPoint {
  id: string;
  category: string;
  title: string;
  value: number;
  date: string;
  trend: number; // percentage change
  location?: { state: string; lat?: number; lng?: number };
}

export interface DataSet {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUpdated: string;
  source: string;
  points: DataPoint[];
}

export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

// Mock data for development
const mockEnvironmentalData: DataSet = {
  id: "env-air-quality",
  title: "Air Quality Index",
  category: "environment",
  description: "Average air quality index across major US cities",
  lastUpdated: "2023-12-15",
  source: "EPA",
  points: [
    { id: "aqi-1", category: "environment", title: "New York", value: 58, date: "2023-12-15", trend: -2.3, location: { state: "NY", lat: 40.7128, lng: -74.0060 } },
    { id: "aqi-2", category: "environment", title: "Los Angeles", value: 75, date: "2023-12-15", trend: 5.1, location: { state: "CA", lat: 34.0522, lng: -118.2437 } },
    { id: "aqi-3", category: "environment", title: "Chicago", value: 42, date: "2023-12-15", trend: -1.8, location: { state: "IL", lat: 41.8781, lng: -87.6298 } },
    { id: "aqi-4", category: "environment", title: "Houston", value: 63, date: "2023-12-15", trend: 3.2, location: { state: "TX", lat: 29.7604, lng: -95.3698 } },
    { id: "aqi-5", category: "environment", title: "Phoenix", value: 68, date: "2023-12-15", trend: 7.5, location: { state: "AZ", lat: 33.4484, lng: -112.0740 } },
  ]
};

const mockEducationData: DataSet = {
  id: "edu-graduation-rates",
  title: "High School Graduation Rates",
  category: "education",
  description: "Percentage of students graduating high school by state",
  lastUpdated: "2023-10-30",
  source: "Department of Education",
  points: [
    { id: "grad-1", category: "education", title: "California", value: 84.3, date: "2023-10-30", trend: 1.2, location: { state: "CA" } },
    { id: "grad-2", category: "education", title: "Texas", value: 90.1, date: "2023-10-30", trend: 2.3, location: { state: "TX" } },
    { id: "grad-3", category: "education", title: "Florida", value: 86.4, date: "2023-10-30", trend: 0.9, location: { state: "FL" } },
    { id: "grad-4", category: "education", title: "New York", value: 82.1, date: "2023-10-30", trend: -0.5, location: { state: "NY" } },
    { id: "grad-5", category: "education", title: "Pennsylvania", value: 87.2, date: "2023-10-30", trend: 1.7, location: { state: "PA" } },
  ]
};

const mockEconomicData: DataSet = {
  id: "econ-unemployment",
  title: "Unemployment Rates",
  category: "economy",
  description: "Monthly unemployment rates by state",
  lastUpdated: "2023-11-20",
  source: "Bureau of Labor Statistics",
  points: [
    { id: "unemp-1", category: "economy", title: "California", value: 4.8, date: "2023-11-20", trend: -0.2, location: { state: "CA" } },
    { id: "unemp-2", category: "economy", title: "Texas", value: 3.5, date: "2023-11-20", trend: -0.5, location: { state: "TX" } },
    { id: "unemp-3", category: "economy", title: "Florida", value: 3.9, date: "2023-11-20", trend: 0.1, location: { state: "FL" } },
    { id: "unemp-4", category: "economy", title: "New York", value: 5.2, date: "2023-11-20", trend: 0.3, location: { state: "NY" } },
    { id: "unemp-5", category: "economy", title: "Illinois", value: 4.6, date: "2023-11-20", trend: -0.1, location: { state: "IL" } },
  ]
};

const mockHealthcareData: DataSet = {
  id: "health-insurance",
  title: "Health Insurance Coverage",
  category: "healthcare",
  description: "Percentage of population with health insurance by state",
  lastUpdated: "2023-09-05",
  source: "Census Bureau",
  points: [
    { id: "ins-1", category: "healthcare", title: "Massachusetts", value: 97.2, date: "2023-09-05", trend: 0.3, location: { state: "MA" } },
    { id: "ins-2", category: "healthcare", title: "Texas", value: 82.5, date: "2023-09-05", trend: 1.8, location: { state: "TX" } },
    { id: "ins-3", category: "healthcare", title: "California", value: 92.8, date: "2023-09-05", trend: 0.5, location: { state: "CA" } },
    { id: "ins-4", category: "healthcare", title: "Florida", value: 87.3, date: "2023-09-05", trend: 1.1, location: { state: "FL" } },
    { id: "ins-5", category: "healthcare", title: "New York", value: 94.5, date: "2023-09-05", trend: 0.2, location: { state: "NY" } },
  ]
};

// Mock datasets collection
const mockDataSets: DataSet[] = [
  mockEnvironmentalData,
  mockEducationData,
  mockEconomicData,
  mockHealthcareData
];

// Utility functions to get data
export const fetchAllDataSets = async (): Promise<DataSet[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 600));
  return mockDataSets;
};

export const fetchDataSetById = async (id: string): Promise<DataSet | undefined> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockDataSets.find(dataset => dataset.id === id);
};

export const fetchDataByCategory = async (category: string): Promise<DataSet[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockDataSets.filter(dataset => dataset.category === category);
};

export const fetchDataForMap = async (): Promise<DataPoint[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 700));
  // Combine all datasets and filter points with location data
  const allPoints = mockDataSets.flatMap(dataset => dataset.points);
  return allPoints.filter(point => point.location?.lat && point.location.lng);
};

// Function to connect to real data.gov API (for future implementation)
export const fetchRealData = async (endpoint: string): Promise<any> => {
  try {
    const response = await fetch(`https://api.data.gov/${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    toast.error("Failed to fetch data from data.gov");
    return null;
  }
};

// Function to format data from data.gov API (for future implementation)
export const formatDataGovResponse = (data: any): DataSet => {
  // This would transform the actual API response into our DataSet format
  // Implementation would depend on the specific API's response structure
  return {
    id: "sample-id",
    title: "Sample Title",
    category: "sample-category",
    description: "Sample Description",
    lastUpdated: new Date().toISOString().split('T')[0],
    source: "data.gov",
    points: []
  };
};
