export function formatPrice(value) {
  if (!value) return '0.00';
  
  // For values >= 1, use comma separators and 2 decimal places
  if (value >= 1) {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    });
  }
  
  // For small values (< 1), show more decimal places
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 8,
    maximumFractionDigits: 8
  });
}

export function formatPriceChange(change) {
  if (!change) return '0.00%';
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
}