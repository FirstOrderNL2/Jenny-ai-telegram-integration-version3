import { CryptoService } from '../services/crypto-service.js';
import { OpenAIService } from '../services/openai-service.js';
import { NewsService } from '../services/news-service.js';
import { GiphyService } from '../services/giphy-service.js';
import { MarketService } from '../services/market-service.js';

export async function initializeServices() {
  const services = {
    cryptoService: new CryptoService(process.env.COINMARKETCAP_API_KEY),
    openAIService: new OpenAIService(process.env.OPENAI_API_KEY),
    newsService: new NewsService(process.env.OPENAI_API_KEY),
    giphyService: new GiphyService(process.env.GIPHY_API_KEY),
    marketService: new MarketService(process.env.COINMARKETCAP_API_KEY)
  };

  return services;
}