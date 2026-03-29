import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMode } from '../../contexts/ModeContext';
import { ModeSelector } from '../../components/mode/ModeSelector';
import { PriceCard } from '../../components/dashboard/PriceCard';
import { Chart } from '../../components/dashboard/Chart';
import { TransactionForm } from '../../components/dashboard/TransactionForm';
import Chart from '../../components/dashboard/Chart';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const TwoColumns = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export function Dashboard() {
  const { mode } = useMode();
  const [prices, setPrices] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Dados mockados pra visualização inicial
  useEffect(() => {
    if (mode === 'crypto') {
      setPrices([
        { symbol: 'BTC', name: 'Bitcoin', price: 245000, change: 2.5 },
        { symbol: 'ETH', name: 'Ethereum', price: 12500, change: -1.2 }
      ]);
      setChartData([
        { date: 'Seg', value: 240000 },
        { date: 'Ter', value: 242000 },
        { date: 'Qua', value: 241000 },
        { date: 'Qui', value: 245000 },
        { date: 'Sex', value: 244000 }
      ]);
    } else {
      setPrices([
        { symbol: 'USD', name: 'Dólar', price: 5.73, change: 0.3 },
        { symbol: 'SELIC', name: 'Taxa SELIC', price: 13.25, change: 0 }
      ]);
      setChartData([
        { date: 'Jan', value: 5.50 },
        { date: 'Fev', value: 5.60 },
        { date: 'Mar', value: 5.65 },
        { date: 'Abr', value: 5.73 },
        { date: 'Mai', value: 5.70 }
      ]);
    }
    setLoading(false);
  }, [mode]);
  
  return (
    <><Chart /><Container>
      <Header>
        <Title>
          {mode === 'crypto' ? '💰 Cripto Dashboard' : '📊 Finanças Pessoais'}
        </Title>
        <ModeSelector />
      </Header>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <>
          <Grid>
            {prices.map(asset => (
              <PriceCard
                key={asset.symbol}
                symbol={asset.symbol}
                name={asset.name}
                price={asset.price}
                change={asset.change} />
            ))}
          </Grid>

          <TwoColumns>
            <Chart
              data={chartData}
              title={mode === 'crypto' ? 'Preço (R$)' : 'Cotação Histórica'} />
            <TransactionForm
              mode={mode}
              onAddTransaction={(tx) => setTransactions([...transactions, tx])} />
          </TwoColumns>
        </>
      )}
    </Container></>
  );
}