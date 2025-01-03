import { NewsFormatter } from './news/news-formatter.js';
import { NewsFetcher } from './news/news-fetcher.js';
import { GiphyService } from './giphy-service.js';

export class JennyHandler {
  constructor(openAiKey, cryptoKey, giphyKey) {
    this.newsFetcher = new NewsFetcher();
    this.newsFormatter = new NewsFormatter();
    this.giphyService = new GiphyService(giphyKey);
  }

  async handleNewsQuery() {
    try {
      // Fetch latest news
      const articles = await this.newsFetcher.fetchNews(6); // Last 6 hours
      
      // Format the news message
      const message = this.newsFormatter.formatNewsResponse(articles);
      
      // Get a relevant GIF
      const gif = await this.giphyService.getRandomGif('crypto news');
      
      return { message, gif };
    } catch (error) {
      console.error('News handling error:', error);
      throw new Error('Failed to fetch news updates');
    }
  }
}