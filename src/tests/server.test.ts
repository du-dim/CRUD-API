import { myServer } from '../server.js';
import request from 'supertest';
import { it, describe, expect } from 'vitest';

const User1 = {
  username: 'Dima',
  age: 20,
  hobbies: ['running', 'cycling']
};
const User2 = {
  username: 'Petya',
  age: 22,
  hobbies: ['hiking', 'skiing', 'ice skating']
};
const User3 = {
  username: 'Vasya',
  age: 30
};

const UserError1 = {
  username: 'Dima',
  age: '20',
  hobbies: ['running', 'cycling']
};

const UserError2 = {
  username: 123,
  age: 12,
  hobbies: ['running', 'cycling']
};
const UserError3 = {
  username: 'Dima',
  age: 20,
  hobbies: ['running', 300]
};
const UserError4 = {
  username: 'Dima'
};

//  1.Test -> GET api/users is used to get all persons

describe('\x1b[34m1. GET api/users is used to get all persons\x1b[0m', () => {
  it('\x1b[33m01) test_1\x1b[0m', async () => {
    const res = await request(myServer).get('/api/users');
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
  it('\x1b[33m02) test_2\x1b[0m', async () => {
    const res = await request(myServer).get('/api/users/');
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
  it('\x1b[33m03) test_3\x1b[0m', async () => {
    const res = await request(myServer).get('/api/user');
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Resource not found' });
  });
});

//  2.Test -> POST api/users is used to create record about new user and store it in database

describe('\x1b[34m2. POST api/users is used to create record about new user and store it in database\x1b[0m', () => {
  it('\x1b[33m04) test_1\x1b[0m', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(User1))
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('Dima');
    expect(res.body.age).toBe(20);
    expect(res.body.hobbies).toEqual(['running', 'cycling']);
    expect(res.body.id).toMatch(/([a-z0-9]{8})-([a-z0-9]{4}-){3}([a-z0-9]{12})/);
  });

  it('\x1b[33m05) test_2\x1b[0m', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(User2))
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('Petya');
    expect(res.body.age).toBe(22);
    expect(res.body.hobbies).toEqual(['hiking', 'skiing', 'ice skating']);
    expect(res.body.id).toMatch(/([a-z0-9]{8})-([a-z0-9]{4}-){3}([a-z0-9]{12})/);
  });
  it('\x1b[33m06) test_3\x1b[0m', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(User3))
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(201);
    expect(res.body.username).toBe('Vasya');
    expect(res.body.age).toBe(30);
    expect(res.body.hobbies).toEqual([]);
    expect(res.body.id).toMatch(/([a-z0-9]{8})-([a-z0-9]{4}-){3}([a-z0-9]{12})/);
  });

  it('\x1b[33m07) test_4\x1b[0m', async () => {
    const res = await request(myServer)
      .post('/api/user')
      .set('Accept', 'application/json')
      .send(JSON.stringify(User3))
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Resource not found' });
  });
  it('\x1b[33m08) test_5\x1b[0m', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(UserError1))
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error:
        'The body does not contain required valid fields: {username: string, age: number}. hobbies: string[] is not a required field'
    });
  });
  it('\x1b[33m09) test_6\x1b[0m', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(UserError2))
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error:
        'The body does not contain required valid fields: {username: string, age: number}. hobbies: string[] is not a required field'
    });
  });
  it('\x1b[33m10) test_7\x1b[0m', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(UserError3))
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error:
        'The body does not contain required valid fields: {username: string, age: number}. hobbies: string[] is not a required field'
    });
  });
  it('\x1b[33m11) test_8\x1b[0m', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(UserError3))
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error:
        'The body does not contain required valid fields: {username: string, age: number}. hobbies: string[] is not a required field'
    });
  });
  it('\x1b[33m12) test_9\x1b[0m', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send(JSON.stringify(UserError4))
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error:
        'The body does not contain required valid fields: {username: string, age: number}. hobbies: string[] is not a required field'
    });
  });
});

//  1.Test (additional) -> GET api/users is used to get all persons

describe('\x1b[34m1. GET api/users is used to get all persons\x1b[0m', () => {
  it('\x1b[33m13) test_4\x1b[0m', async () => {
    const res = await request(myServer).get('/api/users');
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(3);
  });
});

// GET 3.Test -> GET api/users/${userId}

describe('\x1b[34m3. GET api/users/${userId}\x1b[0m', () => {
  it('\x1b[33m14) test_1\x1b[0m', async () => {
    const res = await request(myServer).get('/api/users');
    const id = res.body[0].id;
    const res1 = await request(myServer).get('/api/users/' + id);
    expect(res1.type).toBe('application/json');
    expect(res1.statusCode).toBe(200);
    expect(res1.body).toEqual({ ...{ id }, ...User1 });
  });

  it('\x1b[33m15) test_2\x1b[0m', async () => {
    const res = await request(myServer).get('/api/users');
    const id = res.body[1].id;
    const res2 = await request(myServer).get('/api/users/' + id);
    expect(res2.type).toBe('application/json');
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toEqual({ ...{ id }, ...User2 });
  });

  it('\x1b[33m16) test_3\x1b[0m', async () => {
    const id = '00000000-0000-0000-0000-000000000000';
    const res = await request(myServer).get('/api/users/' + id);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });
  it('\x1b[33m17) test_4\x1b[0m', async () => {
    const id = '0000000-0000-0000-0000-000000000000';
    const res = await request(myServer).get('/api/users/' + id);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid userId' });
  });
});

// PUT 4.Test -> PUT api/users/{userId} is used to update existing user

describe('\x1b[34m4. PUT api/users/{userId} is used to update existing user', () => {
  it('\x1b[33m18) test_1\x1b[0m', async () => {
    const res = await request(myServer).get('/api/users');
    const id = res.body[0].id;
    const res1 = await request(myServer)
      .put('/api/users/' + id)
      .set('Accept', 'application/json')
      .send(JSON.stringify(User2))
      .expect('Content-Type', /json/);
    expect(res1.type).toBe('application/json');
    expect(res1.statusCode).toBe(200);
    expect(res1.body).toEqual({ ...{ id }, ...User2 });
  });

  it('\x1b[33m19) test_2\x1b[0m', async () => {
    const res = await request(myServer).get('/api/users');
    const id = res.body[1].id;
    const res1 = await request(myServer)
      .put('/api/users/' + id)
      .set('Accept', 'application/json')
      .send(JSON.stringify({ age: 13 }))
      .expect('Content-Type', /json/);
    expect(res1.type).toBe('application/json');
    expect(res1.statusCode).toBe(400);
    expect(res1.body).toEqual({
      error:
        'The body does not contain required valid fields: {username: string, age: number}. hobbies: string[] is not a required field'
    });
    const res2 = await request(myServer).get('/api/users/' + id);
    expect(res2.type).toBe('application/json');
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toEqual({ ...{ id }, ...User2 });
  });

  it('\x1b[33m20) test_3\x1b[0m', async () => {
    const res = await request(myServer).get('/api/users');
    const id = res.body[0].id;
    const res1 = await request(myServer)
      .put('/api/users/' + id)
      .set('Accept', 'application/json')
      .send(JSON.stringify(UserError1))
      .expect('Content-Type', /json/);
    expect(res1.type).toBe('application/json');
    expect(res1.statusCode).toBe(400);
    expect(res1.body).toEqual({
      error:
        'The body does not contain required valid fields: {username: string, age: number}. hobbies: string[] is not a required field'
    });
    const res2 = await request(myServer).get('/api/users/' + id);
    expect(res2.type).toBe('application/json');
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toEqual({ ...{ id }, ...User2 });
  });

  it('\x1b[33m21) test_4\x1b[0m', async () => {
    const id = '00000000-0000-0000-0000-000000000000';
    const res = await request(myServer)
      .put('/api/users/' + id)
      .set('Accept', 'application/json')
      .send(JSON.stringify(User2))
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });

  it('\x1b[33m22) test_5\x1b[0m', async () => {
    const id = '0000000-0000-0000-0000-000000000000';
    const res = await request(myServer)
      .put('/api/users/' + id)
      .set('Accept', 'application/json')
      .send(JSON.stringify(User2))
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid userId' });
  });
});

// GET 5.Test -> DELETE api/users/${userId} is used to delete existing user from database

describe('\x1b[34m5. DELETE api/users/${userId} is used to delete existing user from database', () => {
  it('\x1b[33m23) test_1\x1b[0m', async () => {
    const res = await request(myServer).get('/api/users');
    const len = res.body.length;
    const id = res.body[1].id;
    const res1 = await request(myServer).delete('/api/users/' + id);
    expect(res1.type).toBe('application/json');
    expect(res1.statusCode).toBe(204);
    //expect(res1.body.message).toEqual('The user has been deleted');
    const res3 = await request(myServer).get('/api/users/' + id);
    expect(res3.body).toEqual({ error: 'User not found' });
    const res4 = await request(myServer).get('/api/users');
    expect(res4.statusCode).toBe(200);
    expect(res4.body.length).toBe(len - 1);
  });

  it('\x1b[33m24) test_2\x1b[0m', async () => {
    const id = '0000000-0000-0000-0000-000000000000';
    const res = await request(myServer).delete('/api/users/' + id);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid userId' });
  });

  it('\x1b[33m25) test_3\x1b[0m', async () => {
    const id = '00000000-0000-0000-0000-000000000000';
    const res = await request(myServer).delete('/api/users/' + id);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });
});
