import { ThemeProvider } from './contexts/ThemeContext';
import { ModeProvider } from './contexts/ModeContext';
import { Dashboard } from './pages/Dashboard';
import { ThemeToggle } from './components/layout/ThemeToggle';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 2rem;
  border-bottom: 1px solid var(--border);
`;

function App() {
  return (
    <ThemeProvider>
      <ModeProvider>
        <AppContainer>
          <HeaderBar>
            <ThemeToggle />
          </HeaderBar>
          <Dashboard />
        </AppContainer>
      </ModeProvider>
    </ThemeProvider>
  );
}

export default App;