export function setupCommands(bot) {
  // Start command
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      `你好！我是Jenny，你的链上记者。以下是我的命令：

/jenny [问题] - 询问加密货币价格或新闻
/top10 - 查看前10大加密货币
/market - 获取全球市场概览
/news - 最新加密货币新闻
/help - 显示此帮助信息

例如：/jenny 比特币现在多少钱？`
    );
  });

  // Help command
  bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(
      chatId,
      `以下是使用指南：

主要命令：
• /jenny [问题] - 询问任何加密货币相关问题
• /top10 - 查看前10大加密货币
• /market - 查看全球市场概览
• /news - 最新加密货币新闻

示例：
• /jenny 比特币价格是多少？
• /jenny 告诉我关于以太坊的信息
• /jenny 狗狗币值多少钱？

现在就试试这些命令吧！`
    );
  });
}