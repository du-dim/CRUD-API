import { ServerResponse } from 'http';
import { correctUrl } from '../correctUrl.js';
import { usersDB } from '../userDataBase.js';
import { validate } from 'uuid';

export const handleDelete = async (reqUrl: string | undefined, res: ServerResponse) => {
  const baseUrl = '/api/users';
  const url = correctUrl(reqUrl);

  res.setHeader('Content-Type', 'application/json');
  if (url.search(baseUrl) !== 0) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Resource not found' }));
    return;
  }
  const userID = url.slice(baseUrl.length).slice(1);

  if (!validate(userID)) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: 'Invalid userId' }));
    return;
  }
  if (usersDB.read(userID)) {
    usersDB.delete(userID);
    res.writeHead(204);
    res.end(JSON.stringify({ message: 'The user has been deleted' }));
    return;
  }
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'User not found' }));
  const promis = new Promise((resolve) => res.on('close', () => resolve(true)));
  await promis;
};
