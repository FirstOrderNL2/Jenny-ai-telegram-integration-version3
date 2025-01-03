import dotenv from 'dotenv';
import { setupBot } from './src/setup/bot-setup.js';
import { setupHandlers } from './src/setup/handlers-setup.js';
import { initializeServices } from './src/setup/services-setup.js';

// Load environment variables
dotenv.config();

async function startBot() {
  try {
    console.log('Initializing Jenny AI Telegram Bot...');
    
    // Initialize services
    const services = await initializeServices();
    
    // Initialize bot
    const bot = setupBot(process.env.TELEGRAM_BOT_TOKEN);
    
    // Setup handlers and commands
    setupHandlers(bot, services);

    console.log('Jenny AI Bot is running...');
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