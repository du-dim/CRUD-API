import { createServer } from 'http';
import { choiceHandle } from './handle/choiceHandle.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;
const myServer = createServer();
myServer.listen(PORT, () => {
  if (process.send) process.send({ port: PORT, pid: process.pid });
  else console.log(`Server started on port ${PORT}. Pid: ${process.pid}`);
});
myServer.addListener('request', (req, res) => choiceHandle(req, res));

process.on('SIGINT', () => {
  myServer.close(() => process.disconnect());
});

process.on('SIGUSR2', () => {
  myServer.close(() => process.exit(1));
});
