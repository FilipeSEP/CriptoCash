import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
  100% { transform: translateY(0px) rotate(360deg); }
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`;

const MoneySymbol = styled.div`
  position: absolute;
  font-size: ${props => props.size || '2rem'};
  opacity: ${props => props.opacity || 0.03};
  animation: ${float} ${props => props.duration || '20s'} linear infinite;
  left: ${props => props.left || '0%'};
  top: ${props => props.top || '0%'};
  animation-delay: ${props => props.delay || '0s'};
  color: var(--text-primary);
`;

export function AnimatedBackground() {
  const symbols = ['₿', '$', 'R$', '€', '£', '¥', '◎', 'Ξ', '📈', '💰', '💎', '🚀'];
  
  return (
    <BackgroundContainer>
      {symbols.map((symbol, index) => (
        <MoneySymbol
          key={index}
          size={`${Math.random() * 3 + 1}rem`}
          opacity={Math.random() * 0.05 + 0.02}
          duration={`${Math.random() * 30 + 15}s`}
          delay={`${Math.random() * 10}s`}
          left={`${Math.random() * 100}%`}
          top={`${Math.random() * 100}%`}
        >
          {symbol}
        </MoneySymbol>
      ))}
    </BackgroundContainer>
  );
}