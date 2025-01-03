export class NewsGifSelector {
  static getSearchTerm(summary = '') {
    const summary_lower = summary.toLowerCase();
    
    if (summary_lower.includes('bull') || summary_lower.includes('surge') || summary_lower.includes('rise')) {
      return 'crypto to the moon';
    }
    if (summary_lower.includes('bear') || summary_lower.includes('drop') || summary_lower.includes('fall')) {
      return 'crypto bear market';
    }
    
    return 'crypto breaking news';
  }
}