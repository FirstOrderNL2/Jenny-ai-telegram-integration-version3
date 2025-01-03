import { NEWS_FEEDS, NEWS_CATEGORIES } from '../../data/news-sources.js';

export class FeedManager {
  constructor() {
    this.feeds = NEWS_FEEDS;
    this.categories = NEWS_CATEGORIES;
  }

  getFeedsForCategory(category) {
    const categoryFeeds = this.categories[category] || [];
    return categoryFeeds.map(feed => this.feeds.CHINESE[feed]).filter(Boolean);
  }

  getAllChineseFeeds() {
    return Object.values(this.feeds.CHINESE);
  }

  getBackupFeed() {
    return this.feeds.ENGLISH.COINTELEGRAPH;
  }
}