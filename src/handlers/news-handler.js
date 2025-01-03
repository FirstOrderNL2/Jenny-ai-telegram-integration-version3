export async function handleNewsQuery(bot, chatId, username, services) {
  try {
    // Send initial response
    await bot.sendMessage(chatId, 
      `Hi ${username}! Let me gather the latest crypto market updates for you...`
    );
    
    // Get news data
    const newsData = await services.newsService.getLatestNews();
    
    // Format and send the main news response
    const message = formatNewsResponse(newsData);
    await bot.sendMessage(chatId, message);
    
    // Add a relevant GIF if available
    try {
      const gif = await services.giphyService.getRandomGif('crypto news');
      if (gif) {
        await bot.sendAnimation(chatId, gif);
      }
    } catch (error) {
      console.error('GIF fetch error:', error);
    }
  } catch (error) {
    console.error('News handling error:', error);
    await bot.sendMessage(chatId, 
      "I'm having trouble accessing the latest news right now. Please try again in a moment!"
    );
  }
}

function formatNewsResponse(newsData) {
  if (!newsData?.articles?.length) {
    return "I'm currently unable to fetch the latest news. Please try again shortly!";
  }

  let response = "🌟 Here's the latest in crypto:\n\n";
  
  newsData.articles.forEach((article, index) => {
    response += `${index + 1}. 📰 ${article.title}\n`;
    if (article.summary) {
      response += `📝 ${article.summary}\n`;
    }
    response += `⏰ ${new Date(article.pubDate).toLocaleString('en-US')}\n\n`;
  });

  response += "Would you like me to elaborate on any of these stories? Just ask! 💡";
  return response;
}