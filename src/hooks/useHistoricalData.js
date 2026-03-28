import { useState, useEffect, useCallback } from 'react';
import { cryptoApi } from '../services/api/cryptoApi';
import { bcApi } from '../services/api/bcApi';

export function useHistoricalData(mode, days = 7) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistorical = useCallback(async () => {
    setLoading(true);
    
    try {
      let historicalData;
      if (mode === 'crypto') {
        historicalData = await cryptoApi.getHistoricalData('bitcoin', days);
      } else {
        historicalData = await bcApi.getDollarHistory(days);
      }
      setData(historicalData);
    } catch (error) {
      console.error('Erro ao buscar dados históricos:', error);
    } finally {
      setLoading(false);
    }
  }, [mode, days]);

  useEffect(() => {
    fetchHistorical();
  }, [fetchHistorical]);

  return { data, loading, refetch: fetchHistorical };
}