import { formatTop10Message } from '../utils/formatters/top10-formatter.js';

export function setupTop10Command(bot, cryptoService) {
  bot.onText(/\/top10/, async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      await bot.sendChatAction(chatId, 'typing');
      const data = await cryptoService.getTop10();
      const message = formatTop10Message(data);
      await bot.sendMessage(chatId, message);
    } catch (error) {
      console.error('Top 10 command error:', error);
      bot.sendMessage(chatId, "Sorry, I couldn't fetch the top 10 list. Please try again later.");
    }
  });
}