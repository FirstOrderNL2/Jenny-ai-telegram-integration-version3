import OpenAI from 'openai';
import { VOICE_CONFIG } from '../../config/voice-config.js';
import axios from 'axios';

export class VoiceGenerator {
  constructor(apiKey) {
    this.openai = new OpenAI({ 
      apiKey,
      maxRetries: 3,
      timeout: 30000
    });
  }

  async generateVoice(text) {
    if (!text) {
      throw new Error('No text provided');
    }

    try {
      const response = await this.openai.audio.speech.create({
        model: VOICE_CONFIG.MODEL,
        voice: VOICE_CONFIG.VOICE,
        input: text,
        response_format: VOICE_CONFIG.FORMAT
      });

      // Use axios to handle the streaming response with proper timeout
      const audioResponse = await axios.get(response.url, {
        responseType: 'arraybuffer',
        timeout: 30000,
        maxContentLength: 10 * 1024 * 1024 // 10MB max
      });

      return Buffer.from(audioResponse.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.code === 'ECONNABORTED') {
        throw new Error('Request timed out while generating voice');
      }
      throw new Error(`Voice generation failed: ${error.message}`);
    }
  }
}