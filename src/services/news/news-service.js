import { NewsFetcher } from './news-fetcher.js';
import { ArticleProcessor } from './article-processor.js';
import { OpenAITranslator } from '../translation/openai-translator.js';
import { NewsSummarizer } from './news-summarizer.js';
import { NewsFormatter } from './news-formatter.js';

export class NewsService {
  constructor(openAiKey) {
    this.translator = new OpenAITranslator(openAiKey);
    this.fetcher = new NewsFetcher();
    this.processor = new ArticleProcessor(this.translator);
    this.summarizer = new NewsSummarizer(openAiKey);
    this.formatter = new NewsFormatter();
  }

  async getLatestNews(hours = 6) {
    try {
      const articles = await this.fetcher.fetchNews(hours);
      const processedArticles = await this.processor.processArticles(articles);
      const summary = await this.summarizer.generateSummary(processedArticles, hours);

      return {
        articles: processedArticles.slice(0, 5),
        summary
      };
    } catch (error) {
      console.error('News service error:', error);
      throw new Error('获取新闻失败，请稍后再试');
    }
  }
}