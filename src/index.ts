import { createServer } from 'http';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;

const createMyServer = createServer((_, res) => {
  res.end('Request accepted');
});

createMyServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
