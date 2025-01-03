import OpenAI from 'openai';
import { AudioConfig } from '../../config/audio-config.js';

export class VoiceGenerator {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async generateVoiceStream(text) {
    if (!text) {
      throw new Error('No text provided for voice generation');
    }

    try {
      const response = await this.openai.audio.speech.create({
        model: AudioConfig.MODEL,
        voice: AudioConfig.VOICE,
        input: text,
        response_format: AudioConfig.FORMAT
      });

      if (!response) {
        throw new Error('No response from OpenAI API');
      }

      return response;
    } catch (error) {
      console.error('Voice generation error:', error);
      throw new Error('Failed to generate voice audio');
    }
  }
}