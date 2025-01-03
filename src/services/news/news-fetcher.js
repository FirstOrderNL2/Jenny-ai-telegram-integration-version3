import axios from 'axios';

export class NewsFetcher {
  async fetchNews(hours = 6) {
    try {
      // Enhanced mock news with more detailed content
      const mockNews = [
        {
          title: "Bitcoin Surges Past $45,000 as Market Sentiment Improves",
          summary: "Bitcoin has broken through the crucial $45,000 resistance level, marking a 5% increase in the last 24 hours. Analysts attribute this surge to improving market sentiment and increased institutional interest.",
          pubDate: new Date(),
          category: "Market"
        },
        {
          title: "Ethereum Layer 2 Solutions See Record Transaction Volume",
          summary: "Ethereum's Layer 2 networks have recorded unprecedented growth, with daily transactions exceeding 10 million. Arbitrum and Optimism lead the scaling race with significant adoption metrics.",
          pubDate: new Date(Date.now() - 1000 * 60 * 30),
          category: "Technology"
        },
        {
          title: "Major Banks Launch Crypto Custody Services",
          summary: "Several leading financial institutions have announced plans to offer crypto custody services, signaling growing mainstream adoption of digital assets. This move could potentially bring billions in institutional investment.",
          pubDate: new Date(Date.now() - 1000 * 60 * 60),
          category: "Adoption"
        },
        {
          title: "New Crypto Regulations Proposed in Key Markets",
          summary: "Regulatory bodies in major markets have proposed new frameworks for cryptocurrency oversight, aiming to provide clarity while ensuring investor protection. The proposals focus on stablecoin regulation and DeFi protocols.",
          pubDate: new Date(Date.now() - 1000 * 60 * 90),
          category: "Regulation"
        }
      ];

      return mockNews;
    } catch (error) {
      console.error('Failed to fetch news:', error);
      throw new Error('News service temporarily unavailable');
    }
  }
}