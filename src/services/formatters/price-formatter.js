export class PriceFormatter {
  formatPrice(price) {
    if (typeof price !== 'number') {
      return '0.00';
    }

    if (price >= 1.0) {
      return price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else if (price >= 0.01) {
      return price.toLocaleString('en-US', {
        minimumFractionDigits: 4,
        maximumFractionDigits: 4
      });
    } else {
      return price.toLocaleString('en-US', {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8
      });
    }
  }

  formatChange(change) {
    if (typeof change !== 'number') {
      return '0.00';
    }
    return change.toFixed(2);
  }

  formatMarketCap(value) {
    if (typeof value !== 'number') {
      return '0';
    }

    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)}M`;
    } else {
      return `${(value / 1e3).toFixed(2)}K`;
    }
  }

  formatVolume(volume) {
    return this.formatMarketCap(volume);
  }

  formatRatio(ratio) {
    if (typeof ratio !== 'number') {
      return '0.00';
    }
    return ratio.toFixed(2);
  }

  formatSupply(supply) {
    if (typeof supply !== 'number') {
      return '0';
    }
    return Math.floor(supply).toLocaleString('en-US');
  }
}