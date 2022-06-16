import { createServer } from 'http';
import { choiceHandle } from './handle/choiceHandle.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;
const myServer = createServer();

myServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
myServer.addListener('request', (req, res) => choiceHandle(req, res));
