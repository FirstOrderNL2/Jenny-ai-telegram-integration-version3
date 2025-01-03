import OpenAI from 'openai';

export class NewsSummarizer {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateSummary(articles) {
    if (!articles?.length) {
      return null;
    }

    try {
      const content = articles
        .map(article => `${article.title}\n${article.summary || ''}`)
        .join('\n\n');

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: "You are a crypto market analyst. Create a brief summary of these headlines focusing on key market movements and developments."
        }, {
          role: "user",
          content
        }],
        temperature: 0.7,
        max_tokens: 300
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Summary generation error:', error);
      return null;
    }
  }
}