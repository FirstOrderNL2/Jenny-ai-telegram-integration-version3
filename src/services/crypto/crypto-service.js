// Update the getTop10 method in CryptoService
async getTop10() {
  try {
    const response = await axios.get(`${this.baseUrl}/cryptocurrency/listings/latest`, {
      headers: this.getHeaders(),
      params: {
        limit: 10,
        convert: 'USD'
      }
    });

    return response.data.data.map(coin => ({
      name: coin.name,
      symbol: coin.symbol,
      price: this.formatter.formatPrice(coin.quote.USD.price),
      change24h: this.formatter.formatChange(coin.quote.USD.percent_change_24h)
    }));
  } catch (error) {
    console.error('Failed to fetch top 10:', error);
    throw new Error('Could not fetch top 10 cryptocurrencies');
  }
}