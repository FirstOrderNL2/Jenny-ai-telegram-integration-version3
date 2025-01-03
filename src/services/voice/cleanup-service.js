import fs from 'fs/promises';
import path from 'path';
import { VOICE_CONFIG } from '../../config/voice-config.js';

export class CleanupService {
  constructor() {
    this.tempDir = path.join(process.cwd(), VOICE_CONFIG.TEMP_DIR);
  }

  async cleanupOldFiles() {
    try {
      const files = await fs.readdir(this.tempDir);
      const now = Date.now();
      let cleanedCount = 0;

      await Promise.all(files.map(async (file) => {
        if (!file.endsWith('.mp3')) return;
        
        const filePath = path.join(this.tempDir, file);
        try {
          const stats = await fs.stat(filePath);
          if (now - stats.mtimeMs > VOICE_CONFIG.FILE_CLEANUP_AGE) {
            await fs.unlink(filePath);
            cleanedCount++;
          }
        } catch (error) {
          console.error(`Failed to process ${file}:`, error);
        }
      }));

      console.log(`Cleaned up ${cleanedCount} old files`);
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }

  async scheduleCleanup(interval = 1800000) { // 30 minutes
    setInterval(() => this.cleanupOldFiles(), interval);
  }
}