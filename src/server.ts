import { createServer } from 'http';
import { choiceHandle } from './handle/choiceHandle.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;
const myServer = createServer();
let pidN: number;
myServer.listen(PORT, () => {
  pidN = process.pid;
  if (process.send) process.send({ port: PORT, pid: pidN });
  else console.log(`Server started on port ${PORT}. Pid: ${pidN}`);
});
myServer.addListener('request', async (req, res) => await choiceHandle(req, res));

process.on('SIGINT', () => {
  myServer.close(() => process.disconnect());
});

process.on('SIGUSR2', () => {
  myServer.close(() => process.exit(1));
});

export { pidN, PORT };
