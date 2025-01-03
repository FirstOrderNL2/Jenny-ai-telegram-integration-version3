import OpenAI from 'openai';
import { formatNewsForSpeech } from '../../utils/formatters/news-formatter.js';

export class VoiceNewsGenerator {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateNewsVoice(newsService) {
    const { summary } = await newsService.getDailySummary();
    if (!summary) {
      throw new Error('No news available');
    }

    const speechText = formatNewsForSpeech(summary);
    const mp3 = await this.generateSpeech(speechText);

    return mp3;
  }

  async generateSpeech(text) {
    try {
      return await this.openai.audio.speech.create({
        model: 'tts-1',
        voice: 'nova',
        input: text,
        response_format: 'mp3'
      });
    } catch (error) {
      console.error('Speech generation error:', error);
      throw new Error('Failed to generate voice');
    }
  }
}