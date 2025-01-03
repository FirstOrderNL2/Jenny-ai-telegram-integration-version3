import { RSSFetcher } from './rss-fetcher.js';

export class NewsAggregator {
  constructor() {
    this.rssFetcher = new RSSFetcher();
  }

  async getLatestNews() {
    try {
      return await this.rssFetcher.fetchLatestNews();
    } catch (error) {
      console.error('News aggregation error:', error);
      throw new Error('Failed to aggregate news');
    }
  }
}