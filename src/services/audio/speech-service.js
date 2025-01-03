import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class SpeechService {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
    this.tempDir = path.resolve(process.cwd(), 'temp');
    
    // Ensure temp directory exists
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }

  async createSpeech(text) {
    if (!text || typeof text !== 'string') {
      throw new Error('Invalid text input');
    }

    const filePath = path.join(this.tempDir, `news-${Date.now()}.mp3`);

    try {
      const mp3 = await this.openai.audio.speech.create({
        model: "tts-1",
        voice: "nova",
        input: text,
        response_format: "mp3"
      });

      // Write file synchronously to ensure it exists before streaming
      const buffer = Buffer.from(await mp3.arrayBuffer());
      fs.writeFileSync(filePath, buffer);

      return filePath;
    } catch (error) {
      console.error('Speech generation error:', error);
      throw new Error('Failed to generate speech');
    }
  }
}