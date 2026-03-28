import { createContext, useContext, useState } from 'react';

const ModeContext = createContext();

export function ModeProvider({ children }) {
  const [mode, setMode] = useState('crypto'); // 'crypto' ou 'tradicional'

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export const useMode = () => useContext(ModeContext);