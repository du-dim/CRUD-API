import { IncomingMessage, ServerResponse } from 'http';
import { handleCreate } from './handleCreate.js';
import { handleRead } from './handleRead.js';
import { handleUpdate } from './handleUpdate.js';
import { handleDelete } from './handleDelete.js';
import { handleChange } from './handleChange.js';
import { pidN, PORT } from '../../server.js';

export const choiceHandle = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (process.send) process.send({ port: PORT, pid: pidN, method: req.method, url: req.url });
    switch (req.method) {
      case 'GET':
        await handleRead(req.url, res);
        break;
      case 'POST':
        await handleCreate(req, res);
        break;
      case 'PUT':
        await handleUpdate(req, res);
        break;
      case 'DELETE':
        await handleDelete(req.url, res);
        break;
      case 'PATCH':
        await handleChange(req, res);
        break;
      default:
        throw Error();
    }
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Errors on the server side' }));
  }
};
