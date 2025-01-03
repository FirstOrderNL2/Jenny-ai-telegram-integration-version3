export async function handlePriceQuery(bot, chatId, question, services) {
  try {
    const symbol = extractCryptoSymbol(question);
    if (!symbol) {
      await bot.sendMessage(chatId, "I'm not sure which cryptocurrency you're asking about. Could you please specify?");
      return;
    }

    const priceData = await services.cryptoService.getPrice(symbol);
    const message = formatPriceResponse(priceData);
    await bot.sendMessage(chatId, message);

    // Send relevant GIF based on price movement
    try {
      const gifTag = priceData.change24h >= 0 ? 'crypto to the moon' : 'crypto dip';
      const gif = await services.giphyService.getRandomGif(gifTag);
      if (gif) {
        await bot.sendAnimation(chatId, gif);
      }
    } catch (error) {
      console.error('GIF fetch error:', error);
    }
  } catch (error) {
    throw new Error(`Couldn't fetch price for ${symbol}`);
  }
}

function extractCryptoSymbol(question) {
  const cryptoAliases = {
    'bitcoin': 'BTC',
    'btc': 'BTC',
    'ethereum': 'ETH',
    'eth': 'ETH',
    'dogecoin': 'DOGE',
    'doge': 'DOGE'
  };

  const words = question.toLowerCase().split(/\s+/);
  for (const word of words) {
    if (cryptoAliases[word]) {
      return cryptoAliases[word];
    }
  }
  return null;
}

function formatPriceResponse(data) {
  const changeEmoji = data.change24h >= 0 ? '📈' : '📉';
  return `${changeEmoji} ${data.name} (${data.symbol})\n\n` +
         `💰 Price: $${formatPrice(data.price)}\n` +
         `📊 24h Change: ${formatPriceChange(data.change24h)}\n` +
         `💎 Market Cap: $${formatLargeNumber(data.marketCap)}`;
}

function formatPrice(price) {
  return price >= 1 
    ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : price.toLocaleString('en-US', { minimumFractionDigits: 8, maximumFractionDigits: 8 });
}

function formatPriceChange(change) {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}

function formatLargeNumber(num) {
  if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  return num.toLocaleString('en-US');
}