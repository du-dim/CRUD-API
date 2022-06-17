import { IncomingMessage, ServerResponse } from 'http';
import { handleCreate } from './handleCreate.js';
import { handleRead } from './handleRead.js';
import { handleUpdate } from './handleUpdate.js';
import { handleDelete } from './handleDelete.js';

export const choiceHandle = (req: IncomingMessage, res: ServerResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        handleRead(req.url, res);
        break;
      case 'POST':
        handleCreate(req, res);
        break;
      case 'PATCH':
        handleRead(req.url, res);
        break;
      case 'DELETE':
        handleRead(req.url, res);
        break;
      default:
        break;
    }
  } catch (error) {
    console.log('error');
  }
};
