import OpenAI from 'openai';

export class NewsSummarizerEn {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateSummary(articles, hours = 6) {
    if (!articles?.length) {
      return `No significant crypto news in the past ${hours} hours.`;
    }

    try {
      const content = articles
        .map(a => `${a.title}\n${a.contentSnippet || ''}`)
        .join('\n\n');

      const completion = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: this.#getSystemPrompt(hours)
        }, {
          role: "user",
          content
        }]
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Summary generation failed:', error);
      return `Sorry, summary generation failed. You can view the recent headlines below.`;
    }
  }

  #getSystemPrompt(hours) {
    return `You are a professional crypto news analyst. Summarize the key developments from the past ${hours} hours following these guidelines:

1. Market Trends:
   - Price movements and key levels
   - Volume changes
   - Market cap changes
   - Major coin performance

2. Significant Events:
   - Regulatory developments
   - Project updates
   - Industry partnerships/M&A
   - Technical breakthroughs

3. Impact Analysis:
   - Short-term market impact
   - Potential long-term implications
   - Investor sentiment

Provide 3 key points, each as a single clear sentence. Focus on the 2-3 most important developments.`;
  }
}