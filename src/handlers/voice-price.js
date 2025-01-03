import { handleError } from '../utils/error-handler.js';
import { VoiceService } from '../services/voice/voice-service.js';
import { formatPriceForSpeech } from '../utils/formatters/price-formatter.js';

export function setupVoicePriceCommand(bot, cryptoService, openAiKey) {
  const voiceService = new VoiceService(openAiKey);

  bot.onText(/\/voice[_\s]?price (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const crypto = match[1].toLowerCase();
    let filePath = null;

    try {
      await bot.sendMessage(chatId, "Generating voice message...");
      await bot.sendChatAction(chatId, 'upload_voice');
      
      const data = await cryptoService.getPrice(crypto);
      const speechText = formatPriceForSpeech(crypto, data);

      filePath = await voiceService.generateVoice(speechText);
      await bot.sendVoice(chatId, filePath);
    } catch (error) {
      console.error('Voice price error:', error);
      handleError(bot, chatId, error);
    } finally {
      if (filePath) {
        await voiceService.cleanup(filePath).catch(console.error);
      }
    }
  });
}