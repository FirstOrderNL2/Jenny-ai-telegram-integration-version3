export function setupStartCommand(bot) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const message = 
      `Hi! I'm Jenny, your On-Chain reporter. Here are my commands:

/price [crypto] - Get cryptocurrency prices
/top10 - View top 10 cryptocurrencies
/market - Get global market overview
/news - Latest crypto news
/help - Show this help message

Example: /price bitcoin`;
    
    bot.sendMessage(chatId, message);
  });
}