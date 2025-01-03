import TelegramBot from 'node-telegram-bot-api';

export function setupBot(token) {
  if (!token) {
    throw new Error('TELEGRAM_BOT_TOKEN is required');
  }
  
  const bot = new TelegramBot(token, { polling: true });
  
  // Basic error handling
  bot.on('polling_error', (error) => {
    console.error('Polling error:', error);
  });
  
  return bot;
}