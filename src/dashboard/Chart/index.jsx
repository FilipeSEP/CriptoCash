import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import styled from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext';

const ChartContainer = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  height: 400px;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

export function Chart({ data, title, dataKey = 'value' }) {
  const { theme } = useTheme();
  
  const chartColors = {
    light: {
      stroke: '#3b82f6',
      grid: '#e5e7eb',
      text: '#6b7280'
    },
    dark: {
      stroke: '#60a5fa',
      grid: '#374151',
      text: '#9ca3af'
    }
  };
  
  const colors = chartColors[theme];
  
  return (
    <ChartContainer>
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis 
            dataKey="date" 
            stroke={colors.text}
            tick={{ fill: colors.text }}
          />
          <YAxis 
            stroke={colors.text}
            tick={{ fill: colors.text }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--card-bg)',
              border: `1px solid var(--border)`,
              color: 'var(--text-primary)'
            }}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={colors.stroke} 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}