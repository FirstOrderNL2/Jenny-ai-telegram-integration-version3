import { NEWS_FEEDS, NEWS_CATEGORIES } from '../../data/news-sources.js';

export class FeedSelector {
  getPrimaryFeeds() {
    return [
      NEWS_FEEDS.CHINESE.MARKET_ANALYSIS,
      NEWS_FEEDS.CHINESE.BITCOIN,
      NEWS_FEEDS.CHINESE.ETHEREUM,
      NEWS_FEEDS.CHINESE.REGULATION
    ];
  }

  getBackupFeeds() {
    return [
      NEWS_FEEDS.CHINESE.ALTCOIN,
      NEWS_FEEDS.CHINESE.BLOCKCHAIN,
      NEWS_FEEDS.CHINESE.ANALYSIS
    ];
  }

  getFallbackFeed() {
    return NEWS_FEEDS.ENGLISH.COINTELEGRAPH;
  }
}