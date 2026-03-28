import { useState } from 'react';
import styled from 'styled-components';
import { useMode } from '../../contexts/ModeContext';
import { usePrices } from '../../hooks/usePrices';
import { useHistoricalData } from '../../hooks/useHistoricalData';
import { ModeSelector } from '../../components/mode/ModeSelector';
import { PriceCard } from '../../components/dashboard/PriceCard';
import { Chart } from '../../components/dashboard/Chart';
import { TransactionForm } from '../../components/dashboard/TransactionForm';

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

const LastUpdate = styled.p`
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
`;

const ErrorMessage = styled.div`
  background: var(--danger);
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
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

  const handleAddTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString()
    };
    setTransactions(prev => [...prev, newTransaction]);
    
    // Salvar no localStorage
    const saved = localStorage.getItem('transactions');
    const allTransactions = saved ? JSON.parse(saved) : [];
    localStorage.setItem('transactions', JSON.stringify([...allTransactions, newTransaction]));
  };

  return (
    <Container>
      <Header>
        <div>
          <Title>
            {mode === 'crypto' ? '💰 Cripto Dashboard' : '📊 Finanças Pessoais'}
          </Title>
          {lastUpdate && (
            <LastUpdate>
              Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
            </LastUpdate>
          )}
        </div>
        <ModeSelector />
      </Header>
      
      {error && <ErrorMessage>⚠️ {error}</ErrorMessage>}
      
      {pricesLoading && !prices.length ? (
        <p>Carregando dados...</p>
      ) : (
        <>
          <Grid>
            {prices.map(asset => (
              <PriceCard
                key={asset.symbol}
                symbol={asset.symbol}
                name={asset.name}
                price={asset.price}
                change={asset.change}
              />
            ))}
          </Grid>
          
          <TwoColumns>
            <Chart 
              data={chartData} 
              title={mode === 'crypto' ? 'Histórico Bitcoin (7 dias)' : 'Histórico Dólar (30 dias)'}
              loading={chartLoading}
            />
            <TransactionForm 
              mode={mode}
              onAddTransaction={handleAddTransaction}
            />
          </TwoColumns>
        </>
      )}
    </Container>
  );
}