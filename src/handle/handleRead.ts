import { ServerResponse } from 'http';
import { correctUrl } from '../module/correctUrl.js';
import { usersDB } from '../module/usersdb.js';
import { validate } from 'uuid';

export const handleRead = (reqUrl: string | undefined, res: ServerResponse) => {
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
      res.end(JSON.stringify(usersDB));
      return;
    }
    if (!validate(userID)) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Invalid userId' }));
      return;
    }
    usersDB.forEach((obj) => {
      if (userID === obj.id) {
        res.writeHead(200);
        res.end(JSON.stringify(obj));
        return;
      }
    });
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'User not found' }));
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Errors on the server side' }));
  }
};
