export const ResponseTemplates = {
  introduction: (username) => `
Hello ${username}. I'm Jenny, your On-Chain reporter and crypto analyst.

I provide real-time insights and strategic analysis for the crypto markets. My expertise covers market trends, blockchain technology, and DeFi developments.

How can I assist you with your crypto inquiries today?
  `.trim(),
  
  error: (username) => `
I apologize ${username}, but I encountered an issue processing your request. Please try again.
  `.trim(),
  
  news: (username) => `
Let me analyze the latest developments for you, ${username}.
  `.trim()
};