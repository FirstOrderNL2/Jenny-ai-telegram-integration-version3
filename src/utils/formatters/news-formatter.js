const MAX_LENGTH = 4000; // OpenAI TTS limit

export function formatNewsForSpeech(text) {
  if (!text) {
    return "No significant crypto news available at the moment.";
  }

  // Clean up text for speech synthesis
  let cleaned = text
    .replace(/[•\-]/g, '')
    .replace(/\n+/g, '. ')
    .replace(/\s+/g, ' ')
    .replace(/\$\d+(?:\.\d+)?[BMK]/g, match => 
      match.replace('$', ' dollars ')
    )
    .trim();

  // Truncate if too long
  if (cleaned.length > MAX_LENGTH) {
    cleaned = cleaned.substring(0, MAX_LENGTH - 3) + '...';
  }

  return `Here's your crypto news summary for today. ${cleaned}`;
}