export function setupJennyCommand(bot, services) {
  bot.onText(/\/jenny (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const question = match[1];

    try {
      await bot.sendChatAction(chatId, 'typing');

      if (question.toLowerCase().includes('news')) {
        try {
          const { message, gif } = await services.jennyHandler.handleNewsQuery();
          
          // Send personalized greeting first
          const username = msg.from.first_name || 'there';
          await bot.sendMessage(chatId, `Hi ${username}! Let me fetch the latest crypto news for you...`);
          
          // Short delay for natural conversation flow
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Send the detailed news message
          await bot.sendMessage(chatId, message);
          
          // Send the GIF if available
          if (gif) {
            await bot.sendAnimation(chatId, gif);
          }
        } catch (error) {
          console.error('News fetch error:', error);
          await bot.sendMessage(chatId, "I apologize, but I'm having trouble accessing the latest news right now. Please try again in a few moments!");
        }
      } else {
        const response = await services.openAIService.getResponse(question);
        await bot.sendMessage(chatId, response);
      }
    } catch (error) {
      console.error('Jenny command error:', error);
      await bot.sendMessage(chatId, "I apologize, but I couldn't process your question. Please try again!");
    }
  });
}