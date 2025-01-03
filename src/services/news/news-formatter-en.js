import { formatDate } from '../../utils/date-formatter.js';

export class NewsFormatterEn {
  formatNewsResponse(newsData, hours) {
    const sections = [
      this.#formatHeader(hours),
      this.#formatSummary(newsData.summary),
      this.#formatHeadlines(newsData.articles)
    ];

    return sections.filter(Boolean).join('\n\n');
  }

  #formatHeader(hours) {
    return `📰 Latest Crypto News (${hours}h)`;
  }

  #formatSummary(summary) {
    if (!summary) return null;

    const points = summary.split('\n').filter(Boolean);
    const numberedPoints = points.map((point, index) => 
      `${index + 1}. ${point.trim()}`
    );

    return numberedPoints.join('\n');
  }

  #formatHeadlines(articles) {
    if (!articles?.length) {
      return null;
    }

    const header = '📋 Recent Headlines:';
    const formattedArticles = articles.map((article, index) => (
      `${index + 1}. ${article.title}\n` +
      `⏰ ${formatDate(article.pubDate)}`
    ));

    return [header, ...formattedArticles].join('\n\n');
  }
}