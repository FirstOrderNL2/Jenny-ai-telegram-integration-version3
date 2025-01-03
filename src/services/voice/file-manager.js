import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import path from 'path';
import { finished } from 'stream/promises';
import { VOICE_CONFIG } from '../../config/voice-config.js';

export class FileManager {
  constructor() {
    this.tempDir = path.join(process.cwd(), VOICE_CONFIG.TEMP_DIR);
    this.init();
  }

  async init() {
    await this.ensureDirectory();
    await this.cleanupOldFiles();
    this.startCleanupSchedule();
  }

  async ensureDirectory() {
    await fs.mkdir(this.tempDir, { recursive: true });
  }

  async saveVoiceFile(buffer) {
    const filePath = this.generateFilePath();
    await fs.writeFile(filePath, buffer);
    return filePath;
  }

  async saveVoiceStream(stream) {
    const filePath = this.generateFilePath();
    const writeStream = createWriteStream(filePath);
    
    try {
      await finished(stream.pipe(writeStream));
      return filePath;
    } catch (error) {
      await this.cleanup(filePath);
      throw error;
    }
  }

  generateFilePath() {
    const fileName = `news-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.mp3`;
    return path.join(this.tempDir, fileName);
  }

  async cleanup(filePath) {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }

  async cleanupOldFiles() {
    try {
      const files = await fs.readdir(this.tempDir);
      const now = Date.now();

      await Promise.all(files.map(async (file) => {
        const filePath = path.join(this.tempDir, file);
        const stats = await fs.stat(filePath);
        
        if (now - stats.mtimeMs > VOICE_CONFIG.FILE_CLEANUP_AGE) {
          await this.cleanup(filePath);
        }
      }));
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }

  startCleanupSchedule() {
    setInterval(() => this.cleanupOldFiles(), 300000); // Clean every 5 minutes
  }
}