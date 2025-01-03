import OpenAI from 'openai';

export class OpenAITranslator {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async translateToSimplifiedChinese(text) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "你是一位专业的加密货币新闻翻译。请将英文新闻准确翻译成简体中文，保持专业性和可读性。"
          },
          {
            role: "user",
            content: `请将以下内容翻译成中文：${text}`
          }
        ]
      });
      return completion.choices[0].message.content;
    } catch (error) {
      console.error('翻译失败:', error);
      throw new Error('翻译服务暂时不可用');
    }
  }
}