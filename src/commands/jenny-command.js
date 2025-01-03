import { classifyQuery } from '../utils/query-classifier.js';
import { handleGeneralQuery } from '../handlers/general-handler.js';
import { handlePriceQuery } from '../handlers/price-handler.js';
import { handleNewsQuery } from '../handlers/news-handler.js';
import { handleGifQuery } from '../handlers/gif-handler.js';

export function setupJennyCommand(bot, services) {
  bot.onText(/\/jenny (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const username = msg.from.first_name || 'there';
    const question = match[1];

    try {
      await bot.sendChatAction(chatId, 'typing');

      const queryType = classifyQuery(question);
      
      switch (queryType) {
        case 'gif':
          const searchTerm = question.replace(/^gif\s*/i, '').trim();
          await handleGifQuery(bot, chatId, searchTerm, services.giphyService);
          break;
        case 'price':
          await handlePriceQuery(bot, chatId, question, services);
          break;
        case 'news':
          await handleNewsQuery(bot, chatId, username, services);
          break;
        default:
          await handleGeneralQuery(bot, chatId, username, question, services);
      }
    } catch (error) {
      console.error('Jenny command error:', error);
      const errorMessage = "I need to process that differently. Could you rephrase your question?";
      await bot.sendMessage(chatId, errorMessage);
    }
  });

  // Handle bare /jenny command
  bot.onText(/^\/jenny$/, async (msg) => {
    const chatId = msg.chat.id;
    const username = msg.from.first_name || 'there';
    await bot.sendMessage(chatId, 
      `Hello ${username}! I'm Jenny, your on-chain reporter and crypto analyst. How can I help you today?`
    );
  });
}