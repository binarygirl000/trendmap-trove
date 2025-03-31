
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChartData } from '@/services/dataService';
import { useTheme } from '@/hooks/useTheme';

interface LineChartVizProps {
  data: ChartData[];
  title?: string;
  xAxisKey?: string;
  lineKey?: string;
  height?: number;
  showLegend?: boolean;
  className?: string;
}

export default function LineChartViz({ 
  data, 
  title, 
  xAxisKey = "name", 
  lineKey = "value", 
  height = 300,
  showLegend = true,
  className = "" 
}: LineChartVizProps) {
  const { isDark } = useTheme();

  const chartColors = {
    line: isDark ? "#5BC0EB" : "#0A2463",
    text: isDark ? "#ffffff" : "#333333",
    background: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"
  };

  return (
    <div className={`w-full p-4 ${className}`}>
      {title && <h3 className="text-center font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"} />
          <XAxis 
            dataKey={xAxisKey} 
            tick={{ fill: chartColors.text, fontSize: 12 }}
            tickLine={{ stroke: chartColors.text }}
            axisLine={{ stroke: chartColors.text }}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis 
            tick={{ fill: chartColors.text, fontSize: 12 }}
            tickLine={{ stroke: chartColors.text }}
            axisLine={{ stroke: chartColors.text }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? "#222" : "#fff", 
              border: `1px solid ${isDark ? "#444" : "#ddd"}`,
              color: chartColors.text,
              borderRadius: "4px"
            }}
          />
          {showLegend && <Legend wrapperStyle={{ paddingTop: 10 }} />}
          <Line 
            type="monotone" 
            dataKey={lineKey} 
            stroke={chartColors.line}
            strokeWidth={2}
            activeDot={{ r: 6 }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
