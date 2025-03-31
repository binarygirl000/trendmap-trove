
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartData } from '@/services/dataService';
import { useTheme } from '@/hooks/useTheme';

interface PieChartVizProps {
  data: ChartData[];
  title?: string;
  dataKey?: string;
  nameKey?: string;
  height?: number;
  showLegend?: boolean;
  className?: string;
}

export default function PieChartViz({
  data,
  title,
  dataKey = "value",
  nameKey = "name",
  height = 300,
  showLegend = true,
  className = ""
}: PieChartVizProps) {
  const { isDark } = useTheme();
  
  const COLORS = ['#0A2463', '#3E92CC', '#5BC0EB', '#8C95AA', '#D8DBE2', '#373F51'];
  const DARK_COLORS = ['#5BC0EB', '#3E92CC', '#7FBDE0', '#A0D2EC', '#C5E5F5', '#8C95AA'];

  const colors = isDark ? DARK_COLORS : COLORS;

  return (
    <div className={`w-full p-4 ${className}`}>
      {title && <h3 className="text-center font-semibold mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            innerRadius={30}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
            animationDuration={1000}
            animationBegin={200}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill || colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}`, `${name}`]}
            contentStyle={{
              backgroundColor: isDark ? "#222" : "#fff",
              border: `1px solid ${isDark ? "#444" : "#ddd"}`,
              color: isDark ? "#ffffff" : "#333333",
              borderRadius: "4px"
            }}
          />
          {showLegend && <Legend wrapperStyle={{ paddingTop: 20 }} />}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
