import { formatMarketData } from '../utils/formatters/market-formatter.js';

export function setupMarketCommand(bot, cryptoService) {
  bot.onText(/\/market/, async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      await bot.sendChatAction(chatId, 'typing');
      const data = await cryptoService.getMarketOverview();
      const message = formatMarketData(data);
      await bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    } catch (error) {
      console.error('Market command error:', error);
      bot.sendMessage(chatId, "Sorry, I couldn't fetch the market overview. Please try again later.");
    }
  });
}