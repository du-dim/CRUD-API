import path from 'path';
import { createRequire } from 'module';
import { TUser } from '../types/type';

const __dirname = path.resolve();
const linkJSON = path.join(__dirname, 'src', '_data.json');
const require = createRequire(import.meta.url);
export const readJSON = require(linkJSON) as TUser[];
