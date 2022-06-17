import { ServerResponse } from 'http';
import { correctUrl } from '../module/correctUrl.js';
import { usersDB } from '../module/inMemoryDB.js';
import { validate } from 'uuid';
import { resolve } from 'path';

export const handleRead = async (reqUrl: string | undefined, res: ServerResponse) => {
  try {
    const baseUrl = '/api/users';
    const url = correctUrl(reqUrl);

    res.setHeader('Content-Type', 'application/json');
    if (url.search(baseUrl) !== 0) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Resource not found' }));
      return;
    }
    const userID = url.slice(baseUrl.length).slice(1);
    if (!userID.length) {
      res.writeHead(200);
      res.end(JSON.stringify(usersDB.data));
      return;
    }
    if (!validate(userID)) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid userId' }));
      return;
    }

    if (usersDB.read(userID)) {
      res.writeHead(200);
      res.end(JSON.stringify(usersDB.read(userID)));
      return;
    }
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'User not found' }));
    const promis = new Promise((resolve) => res.on('close', () => resolve(true)));
    await promis;
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Errors on the server side' }));
  }
};
