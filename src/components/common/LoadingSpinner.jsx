import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1.5rem;
`;

const CoinsContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Coin = styled.div`
  font-size: 3rem;
  animation: ${rotate} ${props => props.speed || '3s'} linear infinite;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5));
  
  &:hover {
    animation-duration: 1s;
  }
`;

const MoneySymbol = styled.div`
  font-size: 2.5rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
  color: var(--success);
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: var(--text-secondary);
  font-weight: 500;
`;

export function LoadingSpinner() {
  return (
    <Container>
      <CoinsContainer>
        <Coin speed="2s">₿</Coin>
        <Coin speed="2.5s">Ξ</Coin>
        <Coin speed="1.8s">$</Coin>
        <Coin speed="3s">R$</Coin>
        <Coin speed="2.2s">◎</Coin>
      </CoinsContainer>
      <Text>Carregando dados do mercado...</Text>
      <MoneySymbol>💰</MoneySymbol>
    </Container>
  );
}