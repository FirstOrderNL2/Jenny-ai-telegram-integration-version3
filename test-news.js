import dotenv from 'dotenv';
import { NewsService } from './src/services/news/news-service.js';

// Load environment variables
dotenv.config();

async function getNewsUpdate() {
  try {
    const newsService = new NewsService(process.env.OPENAI_API_KEY);
    const newsData = await newsService.getLatestNews(24); // Get last 24 hours of news
    
    // Format and display the news
    console.log('📰 近24小时加密货币要闻\n');
    
    if (newsData.summary) {
      console.log('📊 市场综述：');
      console.log(newsData.summary);
      console.log();
    }
    
    if (newsData.articles?.length > 0) {
      console.log('📋 最新头条：');
      newsData.articles.forEach((article, index) => {
        console.log(`\n${index + 1}. ${article.title}`);
        console.log(`⏰ ${new Date(article.pubDate).toLocaleString('zh-CN')}`);
      });
    }
  } catch (error) {
    console.error('获取新闻失败:', error.message);
  }
}

// Run the news update
getNewsUpdate();