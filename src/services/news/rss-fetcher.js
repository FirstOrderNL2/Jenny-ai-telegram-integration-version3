import Parser from 'rss-parser';
import { NEWS_FEEDS } from '../../config/news-feeds.js';

export class RSSFetcher {
  constructor() {
    this.parser = new Parser();
    this.feeds = NEWS_FEEDS;
  }

  async fetchLatestNews() {
    try {
      const feedPromises = [
        this.fetchFeed(this.feeds.MARKET_ANALYSIS),
        this.fetchFeed(this.feeds.BITCOIN),
        this.fetchFeed(this.feeds.TOP_10)
      ];

      const results = await Promise.all(feedPromises);
      const allArticles = results.flat();

      // Remove duplicates and sort by date
      return Array.from(new Map(
        allArticles.map(item => [item.title, item])
      ).values())
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
      .slice(0, 5)
      .map(item => ({
        title: item.title,
        summary: item.contentSnippet?.slice(0, 150) + '...',
        pubDate: new Date(item.pubDate),
        link: item.link
      }));
    } catch (error) {
      console.error('RSS fetch error:', error);
      throw new Error('Failed to fetch news feeds');
    }
  }

  async fetchFeed(feedUrl) {
    try {
      const feed = await this.parser.parseURL(feedUrl);
      return feed.items;
    } catch (error) {
      console.error(`Error fetching feed ${feedUrl}:`, error);
      return [];
    }
  }
}