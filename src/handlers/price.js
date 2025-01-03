import { formatPriceMessage } from '../utils/formatters/price-message-formatter.js';

export function setupPriceCommand(bot, cryptoService, giphyService) {
  bot.onText(/\/price (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1].toLowerCase();
    
    try {
      await bot.sendChatAction(chatId, 'typing');
      const data = await cryptoService.getPrice(query);
      const message = formatPriceMessage(data);
      await bot.sendMessage(chatId, message);

      // Send relevant GIF based on price movement
      const gifTag = Number(data.change24h) >= 0 ? 'crypto to the moon' : 'crypto dip';
      const gifUrl = await giphyService.getRandomGif(gifTag);
      if (gifUrl) {
        await bot.sendAnimation(chatId, gifUrl);
      }
    } catch (error) {
      console.error('Price command error:', error);
      bot.sendMessage(chatId, `Sorry, I couldn't fetch the price for "${query}". Please check the name or symbol and try again.`);
    }
  });
}