import axios from 'axios';

export class GiphyService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.giphy.com/v1/gifs';
  }

  async getGif(query, rating = 'g') {
    try {
      const response = await axios.get(`${this.baseUrl}/search`, {
        params: {
          api_key: this.apiKey,
          q: query,
          limit: 1,
          rating: rating,
          lang: 'en'
        }
      });

      if (response.data.data.length > 0) {
        return response.data.data[0].images.original.url;
      }
      return null;
    } catch (error) {
      console.error('Giphy API Error:', error);
      return null;
    }
  }

  async getRandomGif(tag) {
    try {
      const response = await axios.get(`${this.baseUrl}/random`, {
        params: {
          api_key: this.apiKey,
          tag: tag,
          rating: 'g'
        }
      });

      return response.data.data.images.original.url;
    } catch (error) {
      console.error('Giphy API Error:', error);
      return null;
    }
  }
}