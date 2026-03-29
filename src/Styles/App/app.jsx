import { ThemeProvider } from './contexts/ThemeContext';
import { ModeProvider } from './contexts/ModeContext';
import { Dashboard } from './pages/Dashboard';
import { Header } from './components/layout/Header';
import styled from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
  position: relative;
`;

function App() {
  return (
    <ThemeProvider>
      <ModeProvider>
        <AppContainer>
          <Header />
          <Dashboard />
        </AppContainer>
      </ModeProvider>
    </ThemeProvider>
  );
}

export default App;