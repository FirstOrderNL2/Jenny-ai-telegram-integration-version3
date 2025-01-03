export const VOICE_CONFIG = {
  MODEL: 'tts-1',
  VOICE: 'nova',
  FORMAT: 'mp3',
  MAX_TEXT_LENGTH: 4000,
  TEMP_DIR: 'temp',
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
  CHUNK_SIZE: 2000, // Split long text into smaller chunks
  FILE_CLEANUP_AGE: 3600000 // 1 hour in milliseconds
};