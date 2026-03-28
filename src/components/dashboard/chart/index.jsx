import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import styled from 'styled-components';
import { useTheme } from '../../../contexts/ThemeContext';

const ChartContainer = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  height: 400px;
  position: relative;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  color: var(--text-primary);
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  color: white;
`;

export function Chart({ data, title, dataKey = 'value', loading = false }) {
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
  
  if (loading) {
    return (
      <ChartContainer>
        <Title>{title}</Title>
        <LoadingOverlay>Carregando gráfico...</LoadingOverlay>
      </ChartContainer>
    );
  }
  
  return (
    <ChartContainer>
      <Title>{title}</Title>
      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
          <XAxis 
            dataKey="date" 
            stroke={colors.text}
            tick={{ fill: colors.text, fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            stroke={colors.text}
            tick={{ fill: colors.text, fontSize: 12 }}
            tickFormatter={(value) => 
              value > 1000 ? `R$ ${(value / 1000).toFixed(0)}k` : `R$ ${value.toFixed(2)}`
            }
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'var(--card-bg)',
              border: `1px solid var(--border)`,
              color: 'var(--text-primary)'
            }}
            formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Preço']}
          />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={colors.stroke} 
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}