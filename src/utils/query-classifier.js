export function classifyQuery(question) {
  const normalizedQuestion = question.toLowerCase();
  
  // GIF-related queries
  if (isGifQuery(normalizedQuestion)) {
    return 'gif';
  }
  
  // Price-related queries
  if (isPriceQuery(normalizedQuestion)) {
    return 'price';
  }
  
  // News-related queries
  if (isNewsQuery(normalizedQuestion)) {
    return 'news';
  }
  
  // Market analysis queries
  if (isMarketQuery(normalizedQuestion)) {
    return 'market';
  }
  
  // Default to general for all other queries
  return 'general';
}

function isGifQuery(question) {
  return question.startsWith('gif');
}

function isPriceQuery(question) {
  const pricePatterns = [
    'price',
    'worth',
    'value',
    'cost',
    'how much',
    'current price',
    'price of'
  ];
  return pricePatterns.some(pattern => question.includes(pattern));
}

function isNewsQuery(question) {
  const newsPatterns = [
    'news',
    'latest',
    'update',
    'happening',
    'recent',
    'development'
  ];
  return newsPatterns.some(pattern => question.includes(pattern));
}

function isMarketQuery(question) {
  const marketPatterns = [
    'market',
    'trend',
    'analysis',
    'prediction',
    'forecast',
    'outlook'
  ];
  return marketPatterns.some(pattern => question.includes(pattern));
}