export class MessageParser {
  static isPriceQuery(message) {
    const priceKeywords = ['price', 'worth', 'value', 'cost', 'how much'];
    return priceKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  static isNewsQuery(message) {
    const newsKeywords = ['news', 'latest', 'update', 'happening', 'recent'];
    return newsKeywords.some(keyword => message.toLowerCase().includes(keyword));
  }

  static extractCryptoSymbol(message) {
    const cryptoAliases = {
      'bitcoin': 'BTC',
      'btc': 'BTC',
      'ethereum': 'ETH',
      'eth': 'ETH',
      'dogecoin': 'DOGE',
      'doge': 'DOGE'
    };

    const words = message.toLowerCase().split(/\s+/);
    for (const word of words) {
      if (cryptoAliases[word]) {
        return cryptoAliases[word];
      }
    }
    return null;
  }
}