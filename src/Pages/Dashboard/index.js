import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useMode } from '../../Contexts/ModeContext';
import { usePrices } from '../../hooks/usePrices';
import { useHistoricalData } from '../../hooks/useHistoricalData';
import { PriceCard } from '../../components/dashboard/PriceCard';
import { Chart } from '../../components/dashboard/Chart';
import { TransactionForm } from '../../components/dashboard/TransactionForm';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { AnimatedBackground } from '../../components/Layout/AnimatedBackground';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(59,130,246,0.1), rgba(168,85,247,0.1));
  border-radius: 2rem;
  backdrop-filter: blur(10px);
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
  
  span {
    background: linear-gradient(135deg, #3b82f6, #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

const LastUpdate = styled.p`
  text-align: center;
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 2rem;
  padding: 1rem;
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--danger);
  color: var(--danger);
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export function Dashboard() {
  const { mode } = useMode();
  const [transactions, setTransactions] = useState([]);
  
  const { 
    prices, 
    loading: pricesLoading, 
    error, 
    lastUpdate 
  } = usePrices(mode);
  
  const { 
    data: chartData, 
    loading: chartLoading 
  } = useHistoricalData(mode, 7);

  // Carregar transações salvas
  useEffect(() => {
    const saved = localStorage.getItem('transactions');
    if (saved) {
      setTransactions(JSON.parse(saved));
    }
  }, []);

  const handleAddTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString()
    };
    const updated = [...transactions, newTransaction];
    setTransactions(updated);
    localStorage.setItem('transactions', JSON.stringify(updated));
  };

  return (
    <>
      <Chart /><AnimatedBackground />
      <Container>
        <Hero>
          <HeroTitle>
            <span>{mode === 'crypto' ? '💰 Cripto' : '📊 Finanças'}</span> Dashboard
          </HeroTitle>
          <HeroSubtitle>
            {mode === 'crypto' 
              ? 'Acompanhe suas criptomoedas favoritas em tempo real' 
              : 'Controle suas finanças e acompanhe os indicadores econômicos'}
          </HeroSubtitle>
        </Hero>

        {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}

        {pricesLoading && !prices.length ? (
          <LoadingSpinner />
        ) : (
          <>
            <StatsGrid>
              {prices.map(asset => (
                <PriceCard
                  key={asset.symbol}
                  symbol={asset.symbol}
                  name={asset.name}
                  price={asset.price}
                  change={asset.change}
                />
              ))}
            </StatsGrid>

            <TwoColumns>
              <Chart 
                data={chartData} 
                title={mode === 'crypto' ? '📈 Histórico Bitcoin (7 dias)' : '💵 Histórico Dólar (30 dias)'}
                loading={chartLoading}
              />
              <TransactionForm 
                mode={mode}
                onAddTransaction={handleAddTransaction}
              />
            </TwoColumns>

            {lastUpdate && (
              <LastUpdate>
                🔄 Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
              </LastUpdate>
            )}
          </>
        )}
      </Container>
    </>
  );
}
export default Dashboard;