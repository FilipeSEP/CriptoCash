import styled from 'styled-components';
import { formatCurrency, formatCrypto } from '../../../utils/formatters';

const Card = styled.div`
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
  }
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
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.positive ? 'var(--success)' : 'var(--danger)'};
`;

export function PriceCard({ symbol, name, price, change }) {
  const isCrypto = symbol.includes('BTC') || symbol.includes('ETH');
  
  return (
    <Card>
      <Title>{name} ({symbol})</Title>
      <Price>
        {isCrypto ? formatCrypto(price) : formatCurrency(price)}
      </Price>
      {change !== undefined && (
        <Change positive={change >= 0}>
          {change >= 0 ? '▲' : '▼'} {Math.abs(change)}%
        </Change>
      )}
    </Card>
  );
}