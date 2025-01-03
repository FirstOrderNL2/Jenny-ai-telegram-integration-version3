import OpenAI from 'openai';
import { CharacterService } from './character-service.js';
import { withRetry } from '../utils/retry.js';

export class OpenAIService {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }
    
    // Clean the API key and validate format
    const cleanApiKey = this.validateAndCleanApiKey(apiKey);
    
    this.openai = new OpenAI({ 
      apiKey: cleanApiKey,
      maxRetries: 3,
      timeout: 30000
    });
    
    this.characterService = new CharacterService();
  }

  validateAndCleanApiKey(apiKey) {
    const cleaned = apiKey.trim();
    if (!cleaned.startsWith('sk-')) {
      throw new Error('Invalid OpenAI API key format');
    }
    return cleaned;
  }

  async getResponse(message) {
    const generateResponse = async () => {
      try {
        const completion = await this.openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: this.characterService.getSystemPrompt()
            },
            {
              role: "user",
              content: message
            }
          ],
          temperature: 0.7,
          max_tokens: 800,
          top_p: 0.9,
          frequency_penalty: 0.3,
          presence_penalty: 0.3
        });

        if (!completion.choices[0]?.message?.content) {
          throw new Error('Invalid response from OpenAI');
        }

        return completion.choices[0].message.content;
      } catch (error) {
        if (error.status === 401) {
          throw new Error('Authentication failed. Please check the API key configuration.');
        } else if (error.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        } else if (error.status === 500) {
          throw new Error('OpenAI service is temporarily unavailable.');
        }
        
        throw error;
      }
    };

    try {
      // Use retry mechanism for resilience
      return await withRetry(generateResponse, 3, 1000);
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Unable to generate response. Please try again.');
    }
  }
}