import { TUser } from './types/type.js';

export const getJSON = async (data: string) => {
  try {
    return (await JSON.parse(`${data}`)) as TUser;
  } catch (error) {
    console.log('\x1b[35mError Invalid JSON\x1b[0m');
    return undefined;
  }
};
