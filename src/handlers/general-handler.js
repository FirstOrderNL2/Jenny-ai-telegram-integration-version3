export async function handleGeneralQuery(bot, chatId, username, question, services) {
  if (!services?.openAIService) {
    throw new Error('OpenAI service not initialized');
  }

  try {
    await bot.sendChatAction(chatId, 'typing');

    // Add context based on question type
    const topic = determineTopicContext(question);
    const context = services.openAIService.characterService.getResponseContext(username, topic);
    
    const contextualizedQuestion = `${context}\n\nUser Question: ${question}`;
    const response = await services.openAIService.getResponse(contextualizedQuestion);
    
    if (!response) {
      throw new Error('No response generated');
    }

    await bot.sendMessage(chatId, response);
  } catch (error) {
    console.error('General query error:', error);
    await handleQueryError(bot, chatId, error);
  }
}

function determineTopicContext(question) {
  const q = question.toLowerCase();
  if (q.includes('market') || q.includes('price') || q.includes('trend')) return 'market';
  if (q.includes('blockchain') || q.includes('protocol') || q.includes('technology')) return 'technical';
  if (q.includes('news') || q.includes('announcement') || q.includes('update')) return 'news';
  return 'general';
}

async function handleQueryError(bot, chatId, error) {
  const errorMessage = error.message.includes('API key') 
    ? "I'm currently experiencing connection issues. Please try again shortly."
    : "I need a moment to gather the latest data. Could you rephrase your question?";
  
  await bot.sendMessage(chatId, errorMessage);
}