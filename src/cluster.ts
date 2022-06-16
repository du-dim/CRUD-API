import cluster from 'cluster';
import { cpus } from 'os';

const numCPUs = cpus().length;
if (cluster.isPrimary) {
  console.log(`Primary is running. Pid: ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    worker.on('message', (msg) =>
      console.log(`Server_${i + 1} started on port ${msg.port}. Pid: ${msg.pid}`)
    );
  }
} else if (cluster.isWorker) {
  import('./server.js');
}
