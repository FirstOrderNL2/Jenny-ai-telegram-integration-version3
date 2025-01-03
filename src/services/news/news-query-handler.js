import Parser from 'rss-parser';
import { NEWS_FEEDS } from '../../config/news-feeds.js';

export class NewsQueryHandler {
  constructor() {
    this.parser = new Parser();
    this.feeds = NEWS_FEEDS;
  }

  async getLatestNews() {
    try {
      const feeds = [
        this.feeds.BITCOIN,
        this.feeds.MARKET_ANALYSIS,
        this.feeds.TOP_10
      ];

      const articles = [];
      for (const feed of feeds) {
        const feedData = await this.parser.parseURL(feed);
        articles.push(...feedData.items.slice(0, 3));
      }

      // Sort by date and remove duplicates
      const uniqueArticles = Array.from(
        new Map(articles.map(item => [item.title, item])).values()
      ).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

      return this.formatNewsResponse(uniqueArticles.slice(0, 5));
    } catch (error) {
      throw new Error('Failed to fetch latest news');
    }
  }

  formatNewsResponse(articles) {
    const response = ['📰 Latest Crypto News Summary:\n'];
    
    articles.forEach((article, index) => {
      const date = new Date(article.pubDate).toLocaleString();
      response.push(
        `${index + 1}. ${article.title}`,
        `🕒 ${date}`,
        `🔗 ${article.link}\n`
      );
    });

    return response.join('\n');
  }
}