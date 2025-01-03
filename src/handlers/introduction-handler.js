import { ResponseTemplates } from '../config/responses.js';

export async function handleIntroduction(bot, chatId, username) {
  const introduction = ResponseTemplates.introduction(username);
  await bot.sendMessage(chatId, introduction);
}