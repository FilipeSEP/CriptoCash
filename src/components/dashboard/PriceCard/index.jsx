import styled, { keyframes } from 'styled-components';
import { formatCurrency, formatCrypto } from '../../../utils/formatters';

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.2); }
  50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
  100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.2); }
`;

const Card = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-4px);
    animation: ${glow} 2s infinite;
    
    &::before {
      left: 100%;
    }
  }
`;

const SymbolIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
`;

const Price = styled.p`
  font-size: 1.875rem;
  font-weight: bold;
  color: var(--text-primary);
`;

const Change = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  background: ${props => props.positive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.positive ? 'var(--success)' : 'var(--danger)'};
`;

const getSymbolIcon = (symbol) => {
  const icons = {
    BTC: '₿',
    ETH: 'Ξ',
    SOL: '◎',
    USD: '💵',
    SELIC: '📈',
    IPCA: '📊',
    ADA: '🔷',
    default: '💰'
  };
  return icons[symbol] || icons.default;
};

export function PriceCard({ symbol, name, price, change }) {
  const isCrypto = symbol === 'BTC' || symbol === 'ETH' || symbol === 'SOL' || symbol === 'ADA';
  const positive = change >= 0;
  
  return (
    <Card>
      <SymbolIcon>{getSymbolIcon(symbol)}</SymbolIcon>
      <Title>{name} ({symbol})</Title>
      <Price>
        {isCrypto ? formatCrypto(price) : formatCurrency(price)}
      </Price>
      {change !== undefined && (
        <Change positive={positive}>
          {positive ? '▲' : '▼'} {Math.abs(change)}%
        </Change>
      )}
    </Card>
  );
}