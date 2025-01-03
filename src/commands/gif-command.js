import { GIPHY_CONFIG } from '../config/giphy-config.js';

export function setupGifCommand(bot, giphyService) {
  // Handle /gif command with search term
  bot.onText(/\/gif (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const searchTerm = match[1];

    try {
      await bot.sendChatAction(chatId, 'upload_photo');
      const gifUrl = await giphyService.getRandomGif(searchTerm);
      
      if (gifUrl) {
        await bot.sendAnimation(chatId, gifUrl);
      } else {
        await bot.sendMessage(chatId, "Sorry, I couldn't find a relevant GIF. Try a different search term!");
      }
    } catch (error) {
      console.error('GIF command error:', error);
      await bot.sendMessage(chatId, "Sorry, I had trouble fetching a GIF. Please try again!");
    }
  });

  // Handle bare /gif command
  bot.onText(/^\/gif$/, async (msg) => {
    const chatId = msg.chat.id;
    const randomTag = getRandomTag();
    
    try {
      await bot.sendChatAction(chatId, 'upload_photo');
      const gifUrl = await giphyService.getRandomGif(randomTag);
      
      if (gifUrl) {
        await bot.sendAnimation(chatId, gifUrl);
      }
    } catch (error) {
      console.error('Random GIF error:', error);
      await bot.sendMessage(chatId, "Sorry, I had trouble fetching a GIF. Please try again!");
    }
  });
}

function getRandomTag() {
  const categories = Object.values(GIPHY_CONFIG.TAGS);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  return randomCategory[Math.floor(Math.random() * randomCategory.length)];
}