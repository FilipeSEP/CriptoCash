import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { ModeSelector } from '../mode/ModeSelector';
import { useState, useEffect } from 'react';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(10px);
  background: ${props => props.scrolled 
    ? 'rgba(var(--bg-primary-rgb), 0.95)' 
    : 'rgba(var(--bg-primary-rgb), 0.8)'};
  border-bottom: 1px solid var(--border);
  transition: all 0.3s ease;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, var(--accent), #a855f7);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const FloatingCoins = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 1.2rem;
  
  span {
    animation: float 3s ease-in-out infinite;
    animation-delay: ${props => props.delay || '0s'};
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-5px); }
  }
`;

const RightSection = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderContent>
        <Logo>
          <FloatingCoins>
            <span>₿</span>
            <span style={{ animationDelay: '0.5s' }}>$</span>
            <span style={{ animationDelay: '1s' }}>R$</span>
          </FloatingCoins>
          <h1>DualFinance</h1>
        </Logo>
        <RightSection>
          <ModeSelector />
          <ThemeToggle />
        </RightSection>
      </HeaderContent>
    </HeaderContainer>
  );
}