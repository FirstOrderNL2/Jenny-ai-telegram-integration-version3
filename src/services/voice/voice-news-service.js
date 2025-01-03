import { VoiceGenerator } from './voice-generator.js';
import { FileManager } from './file-manager.js';
import { NewsFormatter } from '../formatters/news-formatter.js';

export class VoiceNewsService {
  constructor(apiKey) {
    this.generator = new VoiceGenerator(apiKey);
    this.fileManager = new FileManager();
    this.formatter = new NewsFormatter();
  }

  async generateNewsVoice(summary) {
    if (!summary) {
      throw new Error('No news data available');
    }

    try {
      // Format news for speech
      const text = this.formatter.formatForSpeech(summary);
      
      // Generate voice buffer
      const buffer = await this.generator.generateVoice(text);
      
      // Save to temp file and return path
      return await this.fileManager.saveVoiceFile(buffer);
    } catch (error) {
      console.error('Voice generation error:', error);
      throw new Error('Failed to generate voice audio');
    }
  }
}