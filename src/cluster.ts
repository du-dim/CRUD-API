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
  cluster.on('exit', (worker, code) => {
    console.log(`Worker died! Pid: ${worker.process.pid}. Code ${code}`);
    if (code === 1) {
      const workerNew = cluster.fork();
      workerNew.on('message', (msg) =>
        console.log(`new Server started on port ${msg.port}. Pid: ${msg.pid}`)
      );
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
