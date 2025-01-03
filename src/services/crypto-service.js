import axios from 'axios';
import { CRYPTO_ALIASES } from '../data/crypto-symbols.js';

export class CryptoService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://pro-api.coinmarketcap.com/v1';
  }

  async getMarketOverview() {
    try {
      const response = await axios.get(`${this.baseUrl}/global-metrics/quotes/latest`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey
        }
      });

      const data = response.data.data;
      return {
        totalMarketCap: data.quote.USD.total_market_cap,
        totalVolume24h: data.quote.USD.total_volume_24h,
        marketCapChange24h: data.quote.USD.total_market_cap_yesterday_percentage_change,
        volumeChange24h: data.quote.USD.volume_24h_percentage_change,
        btcDominance: data.btc_dominance,
        ethDominance: data.eth_dominance,
        dominance: {
          BTC: data.btc_dominance,
          ETH: data.eth_dominance,
          USDT: data.usdt_dominance || 0,
          BNB: data.bnb_dominance || 0,
          SOL: data.sol_dominance || 0
        },
        activeMarkets: data.active_market_pairs,
        activeCryptos: data.active_cryptocurrencies,
        lastUpdated: data.last_updated
      };
    } catch (error) {
      console.error('Failed to fetch market overview:', error);
      throw new Error('Could not fetch market overview');
    }
  }

  async getTop10() {
    try {
      const response = await axios.get(`${this.baseUrl}/cryptocurrency/listings/latest`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey
        },
        params: {
          limit: 10,
          convert: 'USD'
        }
      });

      return response.data.data.map(coin => ({
        rank: coin.cmc_rank,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.quote.USD.price,
        change24h: coin.quote.USD.percent_change_24h,
        marketCap: coin.quote.USD.market_cap,
        volume24h: coin.quote.USD.volume_24h,
        circulatingSupply: coin.circulating_supply,
        maxSupply: coin.max_supply
      }));
    } catch (error) {
      console.error('Failed to fetch top 10:', error);
      throw new Error('Could not fetch top 10 cryptocurrencies');
    }
  }

  async getPrice(query) {
    try {
      const symbol = CRYPTO_ALIASES[query.toLowerCase()] || query.toUpperCase();
      const response = await axios.get(`${this.baseUrl}/cryptocurrency/quotes/latest`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey
        },
        params: {
          symbol: symbol,
          convert: 'USD'
        }
      });

      const data = response.data.data[symbol];
      return {
        name: data.name,
        symbol: data.symbol,
        rank: data.cmc_rank,
        price: data.quote.USD.price,
        change24h: data.quote.USD.percent_change_24h,
        marketCap: data.quote.USD.market_cap,
        volume24h: data.quote.USD.volume_24h,
        circulatingSupply: data.circulating_supply,
        maxSupply: data.max_supply,
        fullyDilutedValue: data.quote.USD.fully_diluted_market_cap
      };
    } catch (error) {
      console.error('Failed to fetch price:', error);
      throw new Error(`Could not fetch price for ${query}`);
    }
  }
}