import { MessageParser } from '../utils/message-parser.js';
import { formatPrice, formatPriceChange } from '../utils/price-formatter.js';
import { handleError } from '../utils/error-handler.js';

export function setupMessageHandler(bot, cryptoService, openAIService) {
  // Handle /jenny command with a message
  bot.onText(/\/jenny (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const message = match[1];

    try {
      bot.sendChatAction(chatId, 'typing');

      // Check if it's a price query
      if (MessageParser.isPriceQuery(message)) {
        const symbol = await MessageParser.extractCryptoSymbol(message, cryptoService);
        if (symbol) {
          const data = await cryptoService.getPrice(symbol);
          const response = formatPriceResponse(symbol, data);
          bot.sendMessage(chatId, response);
          return;
        }
      }

      // If not a price query, use AI service
      const response = await openAIService.getResponse(message);
      bot.sendMessage(chatId, response);
    } catch (error) {
      console.error('Message handler error:', error);
      handleError(bot, chatId, error);
    }
  });

  // Handle bare /jenny command
  bot.onText(/^\/jenny$/, (msg) => {
    const chatId = msg.chat.id;
    const helpMessage = 
      '请在 /jenny 后面输入你的问题，例如：\n\n' +
      '• /jenny 比特币现在多少钱？\n' +
      '• /jenny 以太坊最近有什么新闻？\n' +
      '• /jenny 介绍一下狗狗币';
    
    bot.sendMessage(chatId, helpMessage);
  });
}

function formatPriceResponse(symbol, data) {
  const changeEmoji = data.change24h >= 0 ? '📈' : '📉';
  return `${changeEmoji} ${symbol} 价格信息：\n\n` +
         `💰 当前价格：$${data.price}\n` +
         `📊 24小时涨跌：${formatPriceChange(data.change24h)}`;
}