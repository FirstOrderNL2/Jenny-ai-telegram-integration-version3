export class CryptoCache {
  constructor() {
    this.cache = new Map();
    this.aliases = new Map([
      // Major cryptocurrencies
      ['btc', 'BTC'],
      ['bitcoin', 'BTC'],
      ['eth', 'ETH'],
      ['ethereum', 'ETH'],
      ['sol', 'SOL'],
      ['solana', 'SOL'],
      ['doge', 'DOGE'],
      ['dogecoin', 'DOGE'],
      ['bnb', 'BNB'],
      ['binance', 'BNB'],
      ['ada', 'ADA'],
      ['cardano', 'ADA'],
      ['xrp', 'XRP'],
      ['ripple', 'XRP'],
      ['dot', 'DOT'],
      ['polkadot', 'DOT'],
      ['matic', 'MATIC'],
      ['polygon', 'MATIC']
    ]);
  }

  set(key, value) {
    this.cache.set(key.toLowerCase(), value);
  }

  get(key) {
    const searchKey = key.toLowerCase();
    
    // Check aliases first
    if (this.aliases.has(searchKey)) {
      const symbol = this.aliases.get(searchKey);
      return this.cache.get(symbol.toLowerCase()) || { symbol };
    }
    
    // Then check main cache
    return this.cache.get(searchKey);
  }

  size() {
    return this.cache.size;
  }

  clear() {
    this.cache.clear();
  }
}