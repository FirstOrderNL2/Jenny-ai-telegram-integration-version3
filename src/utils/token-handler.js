import { TOKEN_INFO } from '../data/token-info.js';

export function isJennyTokenQuery(message) {
  const keywords = ['jenai', 'jenny ai token', 'buy jenny', 'jenny token'];
  return keywords.some(keyword => 
    message.toLowerCase().includes(keyword)
  );
}

export function getJennyTokenResponse() {
  return `🚀 Jenny AI 代币 (JENAI)\n\n` +
         `查看 JENAI 代币信息：\n` +
         `${TOKEN_INFO.JENAI.url}`;
}