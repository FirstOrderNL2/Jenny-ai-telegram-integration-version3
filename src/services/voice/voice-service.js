import { VoiceGenerator } from './voice-generator.js';
import { FileManager } from './file-manager.js';
import { NewsFormatter } from '../formatters/news-formatter.js';
import { StreamGenerator } from './stream-generator.js';
import { VOICE_CONFIG } from '../../config/voice-config.js';
import { withRetry } from '../../utils/retry.js';

export class VoiceService {
  constructor(apiKey) {
    this.generator = new VoiceGenerator(apiKey);
    this.streamGenerator = new StreamGenerator(apiKey);
    this.fileManager = new FileManager();
    this.formatter = new NewsFormatter();
  }

  async generateVoice(text, timeout = 30000) {
    if (!text) {
      throw new Error('No text provided');
    }

    let filePath = null;
    try {
      // Format and chunk the text
      const formattedText = this.formatter.formatForSpeech(text);
      if (!formattedText) {
        throw new Error('Text formatting failed');
      }

      // Use retry mechanism with timeout
      const generateWithRetry = async () => {
        const buffer = await this.generator.generateVoice(formattedText);
        return await this.fileManager.saveVoiceFile(buffer);
      };

      filePath = await Promise.race([
        withRetry(generateWithRetry, 3),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Voice generation timed out')), timeout)
        )
      ]);

      return filePath;
    } catch (error) {
      if (filePath) {
        await this.cleanup(filePath).catch(console.error);
      }
      throw error;
    }
  }

  async cleanup(filePath) {
    if (!filePath) return;
    await this.fileManager.cleanup(filePath);
  }
}