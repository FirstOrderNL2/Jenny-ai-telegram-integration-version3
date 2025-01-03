import { GIPHY_CONFIG } from '../config/giphy-config.js';

export async function handleGifQuery(bot, chatId, searchTerm, giphyService) {
  try {
    await bot.sendChatAction(chatId, 'upload_photo');
    
    const gifUrl = searchTerm 
      ? await giphyService.getRandomGif(searchTerm)
      : await giphyService.getRandomGif(getRandomTag());
    
    if (gifUrl) {
      await bot.sendAnimation(chatId, gifUrl);
    } else {
      await bot.sendMessage(chatId, "I couldn't find a relevant GIF. Try a different search term!");
    }
  } catch (error) {
    console.error('GIF handling error:', error);
    await bot.sendMessage(chatId, "I had trouble fetching a GIF. Please try again!");
  }
}

function getRandomTag() {
  const categories = Object.values(GIPHY_CONFIG.TAGS);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  return randomCategory[Math.floor(Math.random() * randomCategory.length)];
}