export class NewsResponseFormatter {
  static format(news, summary) {
    const parts = [
      '🌟 Latest Crypto News & Market Update 🌟\n',
      this.formatSummary(summary),
      this.formatHeadlines(news)
    ];
    
    return parts.filter(Boolean).join('\n');
  }

  static formatSummary(summary) {
    if (!summary) return null;
    return `📊 Market Overview:\n${summary}\n`;
  }

  static formatHeadlines(news) {
    if (!news?.length) return null;
    
    const headlines = news.map((article, index) => {
      const date = new Date(article.pubDate).toLocaleString();
      return `${index + 1}. ${article.title}\n   ⏰ ${date}`;
    });

    return '📰 Breaking Headlines:\n\n' + headlines.join('\n\n');
  }
}