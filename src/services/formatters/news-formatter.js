export class NewsFormatter {
  formatForSpeech(text) {
    if (!text) {
      return "No significant crypto news available at the moment.";
    }

    // Clean and format text
    const cleaned = this.cleanText(text);
    const truncated = this.truncateText(cleaned);
    
    return `Here's your crypto news summary. ${truncated}`;
  }

  cleanText(text) {
    return text
      // Remove bullets and dashes
      .replace(/[•\-]/g, '')
      // Convert newlines to periods
      .replace(/\n+/g, '. ')
      // Normalize spaces
      .replace(/\s+/g, ' ')
      // Format numbers and currencies
      .replace(/\$\d+(?:\.\d+)?[BMK]/g, match => 
        match.replace('$', ' dollars ')
          .replace('B', ' billion')
          .replace('M', ' million')
          .replace('K', ' thousand')
      )
      .trim();
  }

  truncateText(text, maxLength = 4000) {
    if (text.length <= maxLength) {
      return text;
    }
    
    // Find the last complete sentence within limit
    const truncated = text.substring(0, maxLength);
    const lastPeriod = truncated.lastIndexOf('.');
    
    return lastPeriod > 0 
      ? truncated.substring(0, lastPeriod + 1)
      : truncated.substring(0, maxLength - 3) + '...';
  }
}