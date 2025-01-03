export class ArticleProcessor {
  constructor(translator) {
    this.translator = translator;
  }

  async processArticles(articles) {
    const processed = [];
    
    for (const article of articles) {
      try {
        const title = this.isEnglishContent(article.title)
          ? await this.translator.translateToSimplifiedChinese(article.title)
          : article.title;

        processed.push({
          ...article,
          title: title.trim()
        });
      } catch (error) {
        console.error('Article processing error:', error);
        processed.push(article);
      }
    }
    
    return processed;
  }

  isEnglishContent(text) {
    return /^[\x00-\x7F]+$/.test(text) && !/[\u4e00-\u9fff]/.test(text);
  }
}