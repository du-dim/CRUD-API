import { IncomingMessage, ServerResponse } from 'http';
import { correctUrl } from '../module/correctUrl.js';
import { usersDB } from '../module/usersdb.js';
import { IUsers } from '../types/type.js';
import { validate } from 'uuid';

export const handleCreate = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const baseUrl = '/api/users';
    req.on('data', (data) => {
      const user: IUsers = JSON.parse(`${data}`);
      console.log(user);
      usersDB.write(user);
    });

    res.writeHead(200);
    res.end(JSON.stringify({ error: 'Errors on the server side' }));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Errors on the server side' }));
  }
};
