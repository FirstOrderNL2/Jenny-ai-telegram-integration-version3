import { formatPrice, formatPriceChange } from './price-formatter.js';
import { formatLargeNumber } from './number-formatter.js';

export function formatPriceMessage(data) {
  const changeEmoji = Number(data.change24h) >= 0 ? '📈' : '📉';
  
  return `${changeEmoji} ${data.name} (${data.symbol}) #${data.rank}\n\n` +
         `💰 Price: $${formatPrice(data.price)}\n` +
         `📊 24h Change: ${formatPriceChange(data.change24h)}\n\n` +
         `📈 Market Cap: $${formatLargeNumber(data.marketCap)}\n` +
         `💹 Volume (24h): $${formatLargeNumber(data.volume24h)}\n` +
         `📊 Vol/Mkt Cap: ${((data.volume24h / data.marketCap) * 100).toFixed(2)}%\n\n` +
         `💎 FDV: $${formatLargeNumber(data.fullyDilutedValue)}\n` +
         `⚖️ Circulating Supply: ${formatNumber(data.circulatingSupply)} ${data.symbol}\n` +
         `📦 Max Supply: ${data.maxSupply ? formatNumber(data.maxSupply) : '∞'} ${data.symbol}\n\n` +
         `🕒 Last Updated: ${new Date().toLocaleString()}`;
}

function formatNumber(value) {
  if (!value) return '0';
  return value.toLocaleString('en-US');
}