import { handleError } from '../utils/error-handler.js';
import { VoiceService } from '../services/voice/voice-service.js';

export function setupVoiceNewsCommand(bot, newsService, openAiKey) {
  const voiceService = new VoiceService(openAiKey);

  bot.onText(/\/voice[_\s]?news/, async (msg) => {
    const chatId = msg.chat.id;
    let filePath = null;

    try {
      await bot.sendMessage(chatId, "Generating news summary...");
      
      const { summary } = await newsService.getDailySummary();
      if (!summary) {
        throw new Error('No news available');
      }

      await bot.sendChatAction(chatId, 'upload_voice');

      // Generate voice with 30s timeout
      filePath = await Promise.race([
        voiceService.generateVoice(summary),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Voice generation timed out')), 30000)
        )
      ]);

      // Send voice message
      await bot.sendVoice(chatId, filePath);

    } catch (error) {
      console.error('Voice news error:', error);
      handleError(bot, chatId, error);
    } finally {
      // Always cleanup the file
      if (filePath) {
        await voiceService.cleanup(filePath).catch(console.error);
      }
    }
  });
}