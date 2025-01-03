import dotenv from 'dotenv';
import { initializeBot } from './telegram/bot-setup.js';
import { setupCommands } from './telegram/commands.js';
import { setupMessageHandler } from './telegram/message-handler.js';
import { setupMarketCommands } from './telegram/market-commands.js';
import { CryptoService } from './services/crypto-service.js';
import { OpenAIService } from './services/openai-service.js';
import { MarketService } from './services/market-service.js';
import { NewsService } from './services/news-service.js';

// Load environment variables
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['TELEGRAM_BOT_TOKEN', 'OPENAI_API_KEY', 'COINMARKETCAP_API_KEY'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: ${envVar} is required but not set in environment variables`);
    process.exit(1);
  }
}

async function startBot() {
  try {
    console.log('Initializing Jenny AI Telegram Bot...');
    
    // Initialize bot and services
    const bot = initializeBot(process.env.TELEGRAM_BOT_TOKEN);
    const cryptoService = new CryptoService(process.env.COINMARKETCAP_API_KEY);
    const openAIService = new OpenAIService(process.env.OPENAI_API_KEY);
    const marketService = new MarketService(process.env.COINMARKETCAP_API_KEY);
    const newsService = new NewsService(process.env.OPENAI_API_KEY);

    // Initialize cryptocurrency data
    console.log('Initializing cryptocurrency data...');
    await cryptoService.initializeSymbolCache();

    // Setup bot functionality
    setupCommands(bot);
    setupMessageHandler(bot, cryptoService, openAIService);
    setupMarketCommands(bot, marketService, newsService);

    console.log('Jenny AI Telegram Bot is running...');
  } catch (error) {
    console.error('Failed to start bot:', error);
    process.exit(1);
  }
}

// Start the bot with error handling
startBot().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Bot shutting down...');
  process.exit(0);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});