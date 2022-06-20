import cluster from 'cluster';
import { cpus } from 'os';
import { writeJSON } from './modules/writeRead/writeJSON.js';
import { usersDB } from './modules/userDataBase.js';

const numCPUs = cpus().length;
if (cluster.isPrimary) {
  usersDB.data = [];
  writeJSON([]);
  console.log(`Primary is running. Pid: ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    worker.on('message', (msg) => {
      if (!msg.method) {
        console.log(
          `\x1b[32mServer_${i + 1} (pid: \x1b[33m${msg.pid}\x1b[32m) started on port \x1b[33m${
            msg.port
          }\x1b[0m`
        );
      } else if (msg.method) {
        console.log(
          `\x1b[34mServer (pid: \x1b[33m${msg.pid}\x1b[34m):\x1b[0m ${msg.method}\x1b[32m -> \x1b[0m${msg.url}`
        );
      }
    });
  }
  cluster.on('exit', (worker, code) => {
    console.log(
      `\x1b[35mServer died! Pid: \x1b[33m${worker.process.pid}\x1b[35m. Code \x1b[33m${code}\x1b[0`
    );
    if (code === 1) {
      const workerNew = cluster.fork();
      workerNew.on('message', (msg) => {
        if (!msg.method) {
          console.log(
            `\x1b[32mNew server (pid: \x1b[33m${msg.pid}\x1b[32m) started on port \x1b[33m${msg.port}\x1b[0m`
          );
        } else if (msg.method) {
          console.log(
            `\x1b[34mServer (pid: \x1b[33m${msg.pid}\x1b[34m): \x1b[0m${msg.method}\x1b[32m ->\x1b[0m ${msg.url}`
          );
        }
      });
    }
  });
} else if (cluster.isWorker) {
  void (async () => {
    await import('./server.js');
  })();
}
process.on('SIGINT', () => {
  for (const id in cluster.workers) {
    cluster.workers[id]?.disconnect();
  }
});
