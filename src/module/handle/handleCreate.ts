import { IncomingMessage, ServerResponse } from 'http';
import { correctUrl } from '../correctUrl.js';
import { usersDB } from '../userDataBase.js';
import { getJSON } from '../getJSON.js';
import { TUser } from '../types/type.js';
import { v4 as uuidv4 } from 'uuid';

export const handleCreate = async (req: IncomingMessage, res: ServerResponse) => {
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
  let user: TUser | undefined;

  req.on('data', (data) => {
    user = getJSON(data);
  });
  if (!user) throw Error();
  req.on('end', async () => {
    const id = { id: uuidv4() };
    const addUser = { ...id, ...userStart, ...user };
    if (
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
};
