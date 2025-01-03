import { formatPrice, formatPriceChange } from '../utils/formatters/price-formatter.js';
import { formatLargeNumber } from '../utils/formatters/number-formatter.js';

export function setupPriceCommand(bot, services) {
  bot.onText(/\/price (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const query = match[1].toLowerCase();

    try {
      await bot.sendChatAction(chatId, 'typing');
      
      const data = await services.cryptoService.getPrice(query);
      const message = formatPriceResponse(data);
      await bot.sendMessage(chatId, message);

      // Send relevant GIF based on price movement
      try {
        const gifTag = data.change24h >= 0 ? 'crypto to the moon' : 'crypto dip';
        const gif = await services.giphyService.getRandomGif(gifTag);
        if (gif) {
          await bot.sendAnimation(chatId, gif);
        }
      } catch (error) {
        console.error('GIF fetch error:', error);
      }
    } catch (error) {
      console.error('Price command error:', error);
      await bot.sendMessage(chatId, `Sorry, I couldn't fetch the price for "${query}". Please check the name or symbol and try again.`);
    }
  });
}

function formatPriceResponse(data) {
  const changeEmoji = data.change24h >= 0 ? '📈' : '📉';
  return `${changeEmoji} ${data.name} (${data.symbol}) #${data.rank}\n\n` +
         `💰 Price: $${formatPrice(data.price)}\n` +
         `📊 24h Change: ${formatPriceChange(data.change24h)}\n\n` +
         `📈 Market Cap: $${formatLargeNumber(data.marketCap)}\n` +
         `💹 Volume (24h): $${formatLargeNumber(data.volume24h)}\n` +
         `📊 Vol/Mkt Cap: ${((data.volume24h / data.marketCap) * 100).toFixed(2)}%\n\n` +
         `💎 FDV: $${formatLargeNumber(data.fullyDilutedValue)}\n` +
         `⚖️ Circulating Supply: ${formatNumber(data.circulatingSupply)} ${data.symbol}\n` +
         `📦 Max Supply: ${data.maxSupply ? formatNumber(data.maxSupply) : '∞'} ${data.symbol}`;
}

function formatNumber(value) {
  if (!value) return '0';
  return value.toLocaleString('en-US');
}