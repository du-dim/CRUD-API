export const getJSON = (data: string) => {
  try {
    return JSON.parse(`${data}`);
  } catch (error) {
    console.log('\x1b[35mError Invalid JSON\x1b[0m');
    return undefined;
  }
};
