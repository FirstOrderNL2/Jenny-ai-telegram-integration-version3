import fs from 'fs';
import path from 'path';

export class AudioFileManager {
  constructor(baseDir = 'temp') {
    this.baseDir = path.resolve(process.cwd(), baseDir);
    this.ensureDirectoryExists();
  }

  ensureDirectoryExists() {
    if (!fs.existsSync(this.baseDir)) {
      fs.mkdirSync(this.baseDir, { recursive: true });
    }
  }

  async saveAudioStream(audioStream) {
    const filePath = this.generateFilePath();
    
    try {
      // Convert audio stream to buffer and write synchronously
      const buffer = Buffer.from(await audioStream.arrayBuffer());
      fs.writeFileSync(filePath, buffer);
      
      // Verify file was written successfully
      if (!fs.existsSync(filePath)) {
        throw new Error('File was not written successfully');
      }
      
      return filePath;
    } catch (error) {
      console.error('Error saving audio file:', error);
      throw new Error('Failed to save audio file');
    }
  }

  generateFilePath() {
    return path.join(this.baseDir, `news-${Date.now()}.mp3`);
  }

  cleanup(filePath) {
    if (filePath && fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error('Error cleaning up file:', error);
      }
    }
  }
}