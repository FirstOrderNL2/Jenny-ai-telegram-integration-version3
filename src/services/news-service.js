import { NewsAggregator } from './news/news-aggregator.js';
import { NewsSummarizer } from './news/news-summarizer.js';
import { NewsFormatter } from './news/news-formatter.js';
import { withRetry } from '../utils/retry.js';

export class NewsService {
  constructor(openAiKey) {
    if (!openAiKey) {
      throw new Error('OpenAI API key is required');
    }
    this.aggregator = new NewsAggregator();
    this.summarizer = new NewsSummarizer(openAiKey);
    this.formatter = new NewsFormatter();
  }

  async getLatestNews(hours = 6) {
    const fetchNews = async () => {
      try {
        const articles = await this.aggregator.getLatestNews();
        const summary = await this.summarizer.generateSummary(articles);
        
        return {
          articles,
          summary
        };
      } catch (error) {
        console.error('News fetch error:', error);
        throw new Error('Failed to fetch news');
      }
    };

    // Use retry mechanism
    return await withRetry(fetchNews, 3, 1000);
  }
}