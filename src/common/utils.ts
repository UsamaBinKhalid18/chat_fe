export const utils = {
  getErrorString: (error: any) => {
    let textError = '';
    const arr = Object.values(error.data).flat();
    for (let i = 0; i < arr.length; i += 1) {
      textError += `${arr[i]}\n`;
    }
    return textError;
  },
  getDateString: (date: string) => {
    const d = new Date(date);
    return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}, ${d.getFullYear()}`;
  },
  stringToColor(str: string) {
    function hashCode(s: string) {
      return s.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
    }

    let hash = hashCode(str);
    let hue = Math.abs(hash) % 360; // Ensure hue is within 0-360
    let saturation = 80 + (Math.abs(hash) % 20); // Keep saturation high (60-100)
    let lightness = 40 + (Math.abs(hash) % 30); // Keep lightness moderate (40-70)

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  },
  truncateString(str: string, maxLength: number = 20) {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
  },
};
