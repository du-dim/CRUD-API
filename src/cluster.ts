import cluster from 'cluster';
import { cpus } from 'os';

const numCPUs = cpus().length;
if (cluster.isPrimary) {
  console.log(`Primary is running. Pid: ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    worker.on('message', (msg) => {
      if (!msg.method) {
        console.log(`Server_${i + 1} (pid: ${msg.pid}) started on port ${msg.port}.`);
      } else if (msg.method) {
        console.log(`Server (pid: ${msg.pid}): ${msg.method} -> ${msg.url}`);
      }
    });
  }
  cluster.on('exit', (worker, code) => {
    console.log(`Server died! Pid: ${worker.process.pid}. Code ${code}`);
    if (code === 1) {
      const workerNew = cluster.fork();
      workerNew.on('message', (msg) => {
        if (!msg.method) {
          console.log(`New server (pid: ${msg.pid}) started on port ${msg.port}.`);
        } else if (msg.method) {
          console.log(`New server (pid: ${msg.pid}): ${msg.method} -> ${msg.url}`);
        }
      });
    }
  });
} else if (cluster.isWorker) {
  import('./server.js');
}
process.on('SIGINT', () => {
  for (const id in cluster.workers) {
    cluster.workers[id]?.disconnect();
  }
});
