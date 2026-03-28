import { useMode } from '../../contexts/ModeContext';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  background: var(--bg-secondary);
  padding: 0.25rem;
  border-radius: 2rem;
`;

const ModeButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 1.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  background: ${props => props.active ? 'var(--accent)' : 'transparent'};
  color: ${props => props.active ? 'white' : 'var(--text-secondary)'};
  
  &:hover {
    background: ${props => props.active ? 'var(--accent)' : 'var(--border)'};
  }
`;

export function ModeSelector() {
  const { mode, setMode } = useMode();
  
  return (
    <SelectorContainer>
      <ModeButton 
        active={mode === 'crypto'} 
        onClick={() => setMode('crypto')}
      >
        💰 Cripto
      </ModeButton>
      <ModeButton 
        active={mode === 'tradicional'} 
        onClick={() => setMode('tradicional')}
      >
        📊 Finanças
      </ModeButton>
    </SelectorContainer>
  );
}