import { formatLargeNumber } from './number-formatter.js';
import { formatPriceChange } from './price-formatter.js';

export function formatMarketData(data) {
  const mcapChangeEmoji = data.marketCapChange24h >= 0 ? '📈' : '📉';
  const volumeChangeEmoji = data.volumeChange24h >= 0 ? '📈' : '📉';

  return `🌍 Global Crypto Market Overview\n\n` +
         `💰 Market Cap: $${formatLargeNumber(data.totalMarketCap)}\n` +
         `${mcapChangeEmoji} 24h Change: ${formatPriceChange(data.marketCapChange24h)}\n\n` +
         `📊 24h Volume: $${formatLargeNumber(data.totalVolume24h)}\n` +
         `${volumeChangeEmoji} Volume Change: ${formatPriceChange(data.volumeChange24h)}\n\n` +
         `🏆 Market Dominance:\n` +
         `₿ BTC: ${data.dominance.BTC.toFixed(2)}%\n` +
         `⟠ ETH: ${data.dominance.ETH.toFixed(2)}%\n` +
         `🟡 BNB: ${data.dominance.BNB.toFixed(2)}%\n` +
         `◎ SOL: ${data.dominance.SOL.toFixed(2)}%\n` +
         `💵 USDT: ${data.dominance.USDT.toFixed(2)}%\n\n` +
         `📈 Market Stats:\n` +
         `• Active Cryptocurrencies: ${data.activeCryptos.toLocaleString()}\n` +
         `• Active Markets: ${data.activeMarkets.toLocaleString()}\n\n` +
         `🕒 Last Updated: ${new Date(data.lastUpdated).toLocaleString()}`;
}