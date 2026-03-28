import { useState, useEffect, useCallback } from 'react';
import { cryptoApi } from '../Services/Api/cryptoApi';
import { bcApi } from '../Services/Api/bcApi';

export function usePrices(mode) {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let data;
      if (mode === 'crypto') {
        data = await cryptoApi.getCurrentPrices();
      } else {
        data = await bcApi.getAllTraditionalData();
      }
      setPrices(data);
      setLastUpdate(new Date());
    } catch (err) {
      setError('Erro ao carregar os preços. Usando dados mockados.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [mode]);

  useEffect(() => {
    fetchPrices();
    
    // Atualizar a cada 60 segundos
    const interval = setInterval(fetchPrices, 60000);
    
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return { prices, loading, error, lastUpdate, refetch: fetchPrices };
}