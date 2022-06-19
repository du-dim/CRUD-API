export const correctUrl = (reqUrl: string | undefined) => {
  if (!reqUrl) return '';
  if (!reqUrl.trim().length) return '';
  const url = reqUrl.trim().split('');
  const len = url.length;
  const lastSymbol = url[len - 1];
  if (lastSymbol === '/') url.pop();
  const result = url.join('');
  return result;
};
