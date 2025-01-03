import OpenAI from 'openai';
import { Readable } from 'stream';
import { VOICE_CONFIG } from '../../config/voice-config.js';

export class StreamGenerator {
  constructor(apiKey) {
    this.openai = new OpenAI({ apiKey });
  }

  async *generateChunks(text) {
    const chunkSize = VOICE_CONFIG.CHUNK_SIZE;
    const chunks = [];
    
    // Split text into smaller chunks
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.slice(i, i + chunkSize));
    }

    for (const chunk of chunks) {
      const response = await this.openai.audio.speech.create({
        model: VOICE_CONFIG.MODEL,
        voice: VOICE_CONFIG.VOICE,
        input: chunk,
        response_format: VOICE_CONFIG.FORMAT
      });

      const buffer = Buffer.from(await response.arrayBuffer());
      yield buffer;
    }
  }

  createReadStream(text) {
    const generator = this.generateChunks(text);
    return Readable.from(generator);
  }
}