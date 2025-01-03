import { formatPrice, formatPriceChange } from './price-formatter.js';
import { formatLargeNumber } from './number-formatter.js';

export function formatTop10Message(coins) {
  const header = '🏆 Top 10 Cryptocurrencies by Market Cap\n\n';
  
  const formattedCoins = coins.map(coin => {
    const changeEmoji = coin.change24h >= 0 ? '📈' : '📉';
    return `#${coin.rank}. ${coin.name} (${coin.symbol})\n` +
           `💰 Price: $${formatPrice(coin.price)}\n` +
           `${changeEmoji} 24h Change: ${formatPriceChange(coin.change24h)}\n` +
           `📊 Market Cap: $${formatLargeNumber(coin.marketCap)}\n` +
           `📈 24h Volume: $${formatLargeNumber(coin.volume24h)}`;
  }).join('\n\n');
  
  return header + formattedCoins;
}