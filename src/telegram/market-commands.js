import { formatPrice, formatPriceChange } from '../utils/formatters/price-formatter.js';
import { formatLargeNumber } from '../utils/formatters/number-formatter.js';

export function setupMarketCommands(bot, marketService, newsService) {
  // Top 10 cryptocurrencies command
  bot.onText(/\/top10/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendChatAction(chatId, 'typing');
      const top10 = await marketService.getTop10();
      const response = formatTop10Response(top10);
      await bot.sendMessage(chatId, response);
    } catch (error) {
      console.error('Top 10 command error:', error);
      await bot.sendMessage(chatId, "Sorry, I couldn't fetch the top 10 list. Please try again later.");
    }
  });

  // Market overview command
  bot.onText(/\/market/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendChatAction(chatId, 'typing');
      const metrics = await marketService.getGlobalMetrics();
      const response = formatMarketResponse(metrics);
      await bot.sendMessage(chatId, response);
    } catch (error) {
      console.error('Market command error:', error);
      await bot.sendMessage(chatId, "Sorry, I couldn't fetch the market overview. Please try again later.");
    }
  });

  // News command
  bot.onText(/\/news/, async (msg) => {
    const chatId = msg.chat.id;
    try {
      await bot.sendChatAction(chatId, 'typing');
      const newsData = await newsService.getLatestNews();
      
      // Format the response using the formatter from the NewsService class
      const response = newsService.formatter.formatNewsResponse(newsData);
      await bot.sendMessage(chatId, response);
    } catch (error) {
      console.error('News command error:', error);
      await bot.sendMessage(chatId, "Sorry, I couldn't fetch the latest news. Please try again later.");
    }
  });
}

function formatTop10Response(top10) {
  const header = '📊 Top 10 Cryptocurrencies by Market Cap\n\n';
  
  const coins = top10.map((coin, index) => {
    const changeEmoji = coin.change24h >= 0 ? '📈' : '📉';
    return `${index + 1}. ${coin.name} (${coin.symbol})\n` +
           `   💰 Price: $${formatPrice(coin.price)}\n` +
           `   ${changeEmoji} 24h Change: ${formatPriceChange(coin.change24h)}`;
  }).join('\n\n');
  
  return header + coins;
}

function formatMarketResponse(metrics) {
  return `🌍 Global Cryptocurrency Market Overview\n\n` +
         `📊 Total Market Cap: $${formatLargeNumber(metrics.totalMarketCap)}\n` +
         `📈 24h Trading Volume: $${formatLargeNumber(metrics.totalVolume24h)}\n` +
         `🔶 Bitcoin Dominance: ${metrics.btcDominance}%\n` +
         `💠 Ethereum Dominance: ${metrics.ethDominance}%\n\n` +
         `Data updated: ${new Date().toLocaleString('en-US')}`;
}