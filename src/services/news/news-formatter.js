export class NewsFormatter {
  formatNewsResponse(newsData) {
    if (!newsData?.articles?.length) {
      return "I couldn't fetch any recent news. Please try again later!";
    }

    let response = "🌟 Latest Cryptocurrency News & Updates\n\n";
    
    if (newsData.summary) {
      response += `📊 Market Overview:\n${newsData.summary}\n\n`;
    }
    
    response += "📰 Recent Headlines:\n\n";
    
    newsData.articles.forEach((article, index) => {
      response += `${index + 1}. ${article.title}\n`;
      if (article.summary) {
        response += `   ${article.summary}\n`;
      }
      response += `   ⏰ ${new Date(article.pubDate).toLocaleString('en-US')}\n\n`;
    });

    response += "💡 Want more details about any of these stories? Just ask!";
    return response;
  }
}