export async function withRetry(operation, attempts = 3, baseDelay = 1000) {
  let lastError;
  
  for (let i = 0; i < attempts; i++) {
    try {
      return await operation();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed:`, error);
      lastError = error;
      
      // Don't retry on authentication errors
      if (error.message.includes('Authentication failed')) {
        throw error;
      }
      
      if (i < attempts - 1) {
        // Exponential backoff with jitter
        const delay = baseDelay * Math.pow(2, i) * (0.5 + Math.random() * 0.5);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}