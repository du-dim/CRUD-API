import { ServerResponse } from 'http';
import { correctUrl } from '../module/correctUrl.js';
import { usersDB } from '../module/usersdb.js';

export const handleRead = (reqUrl: string | undefined, res: ServerResponse) => {
  try {
    const url = correctUrl(reqUrl);
    res.setHeader('Content-Type', 'application/json');
    switch (url) {
      case '/api/users':
        res.writeHead(200);
        res.end(JSON.stringify(usersDB.sort((a, b) => a.id - b.id)));
        break;
      default:
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Resource not found' }));
        break;
    }
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Errors on the server side' }));
  }
};
