export const utils = {
  getErrorString: (error: any) => {
    let textError = '';
    const arr = Object.values(error.data).flat();
    for (let i = 0; i < arr.length; i += 1) {
      textError += `${arr[i]}\n`;
    }
    return textError;
  },
};
