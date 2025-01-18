export const utils = {
  getInitials(name: string) {
    return `${name.split(' ')[0][0].toUpperCase()}${(name.split(' ').at(-1) ??
      '')[0].toUpperCase()}`;
  },
};
