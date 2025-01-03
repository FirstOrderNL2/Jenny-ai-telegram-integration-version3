export function setupNewsCommand(bot, newsService, giphyService) {
  bot.onText(/\/news/, async (msg) => {
    const chatId = msg.chat.id;
    
    try {
      await bot.sendChatAction(chatId, 'typing');
      
      const { summary, articles } = await newsService.getDailySummary();
      const message = formatNewsMessage(summary, articles);
      await bot.sendMessage(chatId, message);

      // Send news-related GIF
      const gifUrl = await giphyService.getRandomGif('crypto news');
      if (gifUrl) {
        await bot.sendAnimation(chatId, gifUrl);
      }
    } catch (error) {
      console.error('News command error:', error);
      bot.sendMessage(chatId, "Sorry, I couldn't fetch the latest news. Please try again later.");
    }
  });
}

function formatNewsMessage(summary, articles) {
  let message = '📰 24-Hour Crypto News Summary\n\n';
  
  if (summary) {
    message += `${summary}\n\n`;
  }
  
  if (articles?.length) {
    message += '📋 Recent Headlines:\n\n';
    message += articles.map((item, index) => 
      `${index + 1}. ${item.title}\n` +
      `   🕒 ${item.pubDate}`
    ).join('\n\n');
  }
  
  return message;
}