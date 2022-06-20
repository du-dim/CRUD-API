import fs from 'fs';
import path from 'path';
import { TUser } from '../types/type.js';

const __dirname = path.resolve();
const linkJSON = path.join(__dirname, 'src', '_data.json');

export const writeJSON = async (data: TUser[]) => {
  fs.writeFile(linkJSON, JSON.stringify(data, null, 4), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File has been created');
    return 'clear';
  });
};
