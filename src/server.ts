/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { createServer } from 'http';
import { handler } from './modules/handlers/_handler.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
let pidN: number;
const myServer = createServer();

myServer.listen(PORT, () => {
  pidN = process.pid;
  if (process.send) process.send({ port: PORT, pid: pidN });
  else console.log(`Server started on port ${PORT}. Pid: ${pidN}`);
});
myServer.addListener('request', async (req, res) => await handler(req, res));

process.on('SIGINT', () => {
  myServer.close(() => process.disconnect());
});

process.on('SIGUSR2', () => {
  myServer.close(() => process.exit(1));
});

export { myServer, pidN, PORT };
