import OpenAI from 'openai';

export class NewsTranslationService {
  constructor(openAiKey) {
    this.openai = new OpenAI({ apiKey: openAiKey });
  }

  async translateToSimplifiedChinese(text) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "你是一位专业的新闻翻译。请将英文加密货币新闻翻译成简体中文，保持专业性和可读性。"
          },
          {
            role: "user",
            content: `Translate to Simplified Chinese: ${text}`
          }
        ]
      });
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Return original text if translation fails
    }
  }

  async generateChineseSummary(articles) {
    if (articles.length === 0) {
      return "过去24小时内没有重要的加密货币新闻。";
    }

    try {
      const content = articles
        .map(a => `${a.title}\n${a.contentSnippet || ''}`)
        .join('\n\n');

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "你是一位加密货币新闻分析师。请用2-3句话总结这些新闻文章的主要趋势。使用简体中文。"
        }, {
          role: "user",
          content: content
        }]
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Summary generation error:', error);
      return "新闻摘要生成失败。";
    }
  }
}