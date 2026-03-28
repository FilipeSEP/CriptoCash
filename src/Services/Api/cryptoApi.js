import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

// Lista das principais criptos que vamos acompanhar
const CRYPTO_IDS = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  solana: 'SOL',
  cardano: 'ADA',
  ripple: 'XRP'
};

export const cryptoApi = {
  // Buscar cotações atuais em BRL
  async getCurrentPrices() {
    try {
      const ids = Object.keys(CRYPTO_IDS).join(',');
      const response = await axios.get(`${BASE_URL}/simple/price`, {
        params: {
          ids: ids,
          vs_currencies: 'brl',
          include_24hr_change: true,
          include_last_updated_at: true
        }
      });
      
      // Formatar os dados
      const formattedData = Object.entries(response.data).map(([id, data]) => ({
        symbol: CRYPTO_IDS[id],
        name: id.charAt(0).toUpperCase() + id.slice(1),
        price: data.brl,
        change: data.brl_24h_change?.toFixed(2),
        lastUpdated: data.last_updated_at
      }));
      
      return formattedData;
    } catch (error) {
      console.error('Erro ao buscar cotações:', error);
      // Retorna dados mockados em caso de erro
      return getMockCryptoPrices();
    }
  },

  // Buscar histórico dos últimos 7 dias
  async getHistoricalData(coinId = 'bitcoin', days = 7) {
    try {
      const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
        params: {
          vs_currency: 'brl',
          days: days,
          interval: days === 1 ? 'hourly' : 'daily'
        }
      });
      
      // Formatar dados para o gráfico
      const formattedData = response.data.prices.map(([timestamp, price]) => ({
        date: new Date(timestamp).toLocaleDateString('pt-BR', { 
          day: '2-digit', 
          month: '2-digit' 
        }),
        value: price,
        timestamp: timestamp
      }));
      
      return formattedData;
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
      return getMockHistoricalData();
    }
  }
};

// Dados mockados para fallback
function getMockCryptoPrices() {
  return [
    { symbol: 'BTC', name: 'Bitcoin', price: 245000, change: 2.5 },
    { symbol: 'ETH', name: 'Ethereum', price: 12500, change: -1.2 },
    { symbol: 'SOL', name: 'Solana', price: 450, change: 5.3 },
    { symbol: 'ADA', name: 'Cardano', price: 3.2, change: -0.8 }
  ];
}

function getMockHistoricalData() {
  return [
    { date: '01/03', value: 240000 },
    { date: '02/03', value: 242000 },
    { date: '03/03', value: 241000 },
    { date: '04/03', value: 243000 },
    { date: '05/03', value: 245000 },
    { date: '06/03', value: 244000 },
    { date: '07/03', value: 246000 }
  ];
}