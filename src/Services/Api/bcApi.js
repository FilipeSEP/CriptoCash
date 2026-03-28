import axios from 'axios';

export const bcApi = {
  // Buscar cotação do dólar
  async getDollarRate() {
    try {
      const today = new Date();
      const formattedDate = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
      
      // API do Banco Central para câmbio
      const response = await axios.get(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@data)?@data='${formattedDate}'&$top=1&$orderby=dataHoraCotacao%20desc&$format=json`
      );
      
      if (response.data.value && response.data.value.length > 0) {
        const cotacao = response.data.value[0];
        return {
          symbol: 'USD',
          name: 'Dólar Americano',
          price: cotacao.cotacaoCompra,
          change: null, // API do BC não tem variação direta
          lastUpdated: cotacao.dataHoraCotacao
        };
      }
      throw new Error('Dados não encontrados');
    } catch (error) {
      console.error('Erro ao buscar dólar:', error);
      return getMockTraditionalData()[0];
    }
  },

  // Buscar taxa SELIC
  async getSelicRate() {
    try {
      const response = await axios.get(
        'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados/ultimos/1?formato=json'
      );
      
      if (response.data && response.data.length > 0) {
        return {
          symbol: 'SELIC',
          name: 'Taxa SELIC',
          price: parseFloat(response.data[0].valor),
          change: null,
          lastUpdated: response.data[0].data
        };
      }
      throw new Error('Dados não encontrados');
    } catch (error) {
      console.error('Erro ao buscar SELIC:', error);
      return getMockTraditionalData()[1];
    }
  },

  // Buscar IPCA (inflação)
  async getIpcaRate() {
    try {
      const response = await axios.get(
        'https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/12?formato=json'
      );
      
      if (response.data && response.data.length > 0) {
        const last12Months = response.data.slice(-12);
        const average = last12Months.reduce((sum, item) => sum + parseFloat(item.valor), 0) / 12;
        
        return {
          symbol: 'IPCA',
          name: 'IPCA (12 meses)',
          price: average,
          change: null,
          lastUpdated: new Date().toLocaleDateString()
        };
      }
      throw new Error('Dados não encontrados');
    } catch (error) {
      console.error('Erro ao buscar IPCA:', error);
      return getMockTraditionalData()[2];
    }
  },

  // Buscar todos os dados tradicionais de uma vez
  async getAllTraditionalData() {
    try {
      const [dollar, selic, ipca] = await Promise.all([
        this.getDollarRate(),
        this.getSelicRate(),
        this.getIpcaRate()
      ]);
      return [dollar, selic, ipca];
    } catch (error) {
      console.error('Erro ao buscar dados tradicionais:', error);
      return getMockTraditionalData();
    }
  },

  // Buscar histórico do dólar
  async getDollarHistory(days = 30) {
    try {
      const response = await axios.get(
        `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@dataInicial='${getDateString(days)}'&@dataFinalCotacao='${getDateString(0)}'&$top=100&$orderby=dataHoraCotacao&$format=json`
      );
      
      if (response.data.value) {
        // Agrupar por dia (pegar a última cotação de cada dia)
        const dailyRates = {};
        response.data.value.forEach(item => {
          const date = item.dataHoraCotacao.split(' ')[0];
          dailyRates[date] = item.cotacaoCompra;
        });
        
        return Object.entries(dailyRates).map(([date, value]) => ({
          date: new Date(date).toLocaleDateString('pt-BR'),
          value: value
        }));
      }
      throw new Error('Dados não encontrados');
    } catch (error) {
      console.error('Erro ao buscar histórico do dólar:', error);
      return getMockHistoricalTraditional();
    }
  }
};

function getDateString(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;
}

function getMockTraditionalData() {
  return [
    { symbol: 'USD', name: 'Dólar Americano', price: 5.73, change: 0.3 },
    { symbol: 'SELIC', name: 'Taxa SELIC', price: 13.25, change: 0 },
    { symbol: 'IPCA', name: 'IPCA (12 meses)', price: 4.85, change: -0.1 }
  ];
}

function getMockHistoricalTraditional() {
  const data = [];
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('pt-BR'),
      value: 5.70 + Math.random() * 0.2
    });
  }
  return data;
}