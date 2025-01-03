export function formatNewsForSpeech(summary) {
  // Limit text length to avoid API limits
  const maxLength = 4096;
  
  if (!summary) {
    return "I don't have any significant crypto news to report at the moment.";
  }

  // Clean up the text for speech
  let text = summary
    .replace(/[•\-]/g, '') // Remove bullets
    .replace(/\n+/g, '. ') // Replace newlines with periods
    .replace(/\s+/g, ' ') // Normalize spaces
    .trim();

  // Truncate if too long
  if (text.length > maxLength) {
    text = text.substring(0, maxLength - 3) + '...';
  }

  return `Here's your crypto news summary for today. ${text}`;
}