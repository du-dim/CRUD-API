import { createServer } from 'http';
import { handler } from './modules/handlers/_handler.js';
import { writeJSON } from './modules/writeRead/writeJSON.js';
import { usersDB } from './modules/userDataBase.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;
let pidN: number;
const myServer = createServer();

myServer.listen(PORT, async () => {
  pidN = process.pid;
  if (process.send) {
    process.send({ port: PORT, pid: pidN });
  } else {
    usersDB.data = [];
    await writeJSON([]);
    console.log(`Server started on port ${PORT}. Pid: ${pidN}`);
  }
});
myServer.addListener('request', async (req, res) => await handler(req, res));

process.on('SIGINT', () => {
  myServer.close(() => process.disconnect());
});

process.on('SIGUSR2', () => {
  myServer.close(() => process.exit(1));
});

export { myServer, pidN, PORT };
