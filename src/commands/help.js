export function setupHelpCommand(bot) {
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    const message = 
      `Here's how to use my commands:

Main Commands:
• /jenny [question] - Ask me anything about crypto
• /market - Check global market overview
• /top10 - View top 10 cryptocurrencies
• /news - Latest crypto news

Special Features:
• /jenny gif [search] - Get a crypto-related GIF
• /jenny price [crypto] - Check cryptocurrency price

Examples:
• /jenny What is blockchain?
• /jenny gif crypto moon
• /jenny price bitcoin

Try these commands now!`;
    
    bot.sendMessage(chatId, message);
  });
}