import { IncomingMessage, ServerResponse } from 'http';
import { correctUrl } from '../module/correctUrl.js';
import { usersDB } from '../module/inMemoryDB.js';
import { TUser } from '../types/type.js';
import { validate, v4 as uuidv4 } from 'uuid';

export const handleCreate = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const baseUrl = '/api/users';
    const url = correctUrl(req.url);
    res.setHeader('Content-Type', 'application/json');
    if (url !== baseUrl) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'Resource not found' }));
      return;
    }
    const userStart = {
      username: '',
      age: -1,
      hobbies: []
    };
    let user: TUser;
    req.on('data', (data) => {
      user = JSON.parse(`${data}`);
    });
    req.on('end', async () => {
      const id = { id: uuidv4() };
      const addUser = { ...id, ...userStart, ...user };
      if (
        !user.id &&
        addUser.username &&
        addUser.age &&
        typeof addUser.username === 'string' &&
        typeof addUser.age === 'number' &&
        addUser.age >= 0 &&
        Array.isArray(addUser.hobbies) &&
        !addUser.hobbies.filter((e) => typeof e !== 'string').length
      ) {
        usersDB.create(addUser);
        res.writeHead(201);
        res.end(JSON.stringify(addUser));
        return;
      } else {
        res.writeHead(400);
        res.end(
          JSON.stringify({
            error:
              'The body does not contain required valid fields: {username: string, age: number}. hobbies: string[] is not a required field'
          })
        );
      }
    });
    const promis = new Promise((resolve) => res.on('close', () => resolve(true)));
    await promis;
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: 'Errors on the server side' }));
  }
};
