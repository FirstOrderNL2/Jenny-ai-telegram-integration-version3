import Parser from 'rss-parser';

export class RSSService {
  constructor() {
    this.parser = new Parser();
    this.feeds = {
      bitcoin: 'https://cointelegraph.com/rss/tag/bitcoin',
      market: 'https://cointelegraph.com/rss/category/market-analysis',
      general: 'https://cointelegraph.com/rss'
    };
  }

  async fetchNews(category = 'general', limit = 3) {
    try {
      const feed = await this.parser.parseURL(this.feeds[category]);
      return feed.items.slice(0, limit);
    } catch (error) {
      console.error(`RSS feed error for ${category}:`, error);
      return [];
    }
  }

  async fetchAllNews() {
    try {
      const results = await Promise.all([
        this.fetchNews('bitcoin'),
        this.fetchNews('market'),
        this.fetchNews('general')
      ]);

      return Array.from(new Set(results.flat()))
        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        .slice(0, 5);
    } catch (error) {
      console.error('Failed to fetch news:', error);
      return [];
    }
  }
}