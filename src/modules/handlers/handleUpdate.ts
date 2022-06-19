import { IncomingMessage, ServerResponse } from 'http';
import { correctUrl } from '../correctUrl.js';
import { usersDB } from '../userDataBase.js';
import { getJSON } from '../getJSON.js';
import { TUser } from '../types/type.js';
import { validate } from 'uuid';

export const handleUpdate = async (req: IncomingMessage, res: ServerResponse) => {
  const baseUrl = '/api/users';
  const url = correctUrl(req.url);

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
    let user: TUser | undefined;
    req.on('data', async (data) => {
      user = await getJSON(data);
    });
    req.on('end', async () => {
      const addUser = { ...usersDB.read(userID), ...user };
      if (
        user &&
        user.username &&
        user.age &&
        typeof addUser.username === 'string' &&
        typeof addUser.age === 'number' &&
        addUser.age >= 0 &&
        Array.isArray(addUser.hobbies) &&
        !addUser.hobbies.filter((e) => typeof e !== 'string').length
      ) {
        usersDB.update(addUser);
        res.writeHead(200);
        res.end(JSON.stringify(addUser));
        return;
      } else if (user) {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            error:
              'The body does not contain required valid fields: {username: string, age: number}. hobbies: string[] is not a required field'
          })
        );
      } else {
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Errors on the server side' }));
      }
    });
    return;
  }
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'User not found' }));
  const promis = new Promise((resolve) => res.on('close', () => resolve(true)));
  await promis;
};
