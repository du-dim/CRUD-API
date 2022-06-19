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

describe('1. GET api/users is used to get all persons', () => {
  it('01) test_1', async () => {
    const res = await request(myServer).get('/api/users');
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
  it('02) test_2', async () => {
    const res = await request(myServer).get('/api/users/');
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });
  it('03) test_3', async () => {
    const res = await request(myServer).get('/api/user');
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Resource not found' });
  });
});

//  2.Test -> POST api/users is used to create record about new user and store it in database

describe('2. POST api/users is used to create record about new user and store it in database', () => {
  it('04) test_1', async () => {
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

  it('05) test_2', async () => {
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
  it('06) test_3', async () => {
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

  it('07) test_4', async () => {
    const res = await request(myServer)
      .post('/api/user')
      .set('Accept', 'application/json')
      .send(JSON.stringify(User3))
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Resource not found' });
  });
  it('08) test_5', async () => {
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
  it('09) test_6', async () => {
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
  it('10) test_7', async () => {
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
  it('11) test_8', async () => {
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
  it('12) test_9', async () => {
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

describe('1. GET api/users is used to get all persons', () => {
  it('13) test_4', async () => {
    const res = await request(myServer).get('/api/users');
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toEqual(3);
  });
});

// GET 3.Test -> GET api/users/${userId}

describe('3. GET api/users/${userId}', () => {
  it('14) test_1', async () => {
    const res = await request(myServer).get('/api/users');
    const id = res.body[0].id;
    const res1 = await request(myServer).get('/api/users/' + id);
    expect(res1.type).toBe('application/json');
    expect(res1.statusCode).toBe(200);
    expect(res1.body).toEqual({ ...{ id }, ...User1 });
  });

  it('15) test_2', async () => {
    const res = await request(myServer).get('/api/users');
    const id = res.body[1].id;
    const res2 = await request(myServer).get('/api/users/' + id);
    expect(res2.type).toBe('application/json');
    expect(res2.statusCode).toBe(200);
    expect(res2.body).toEqual({ ...{ id }, ...User2 });
  });

  it('16) test_3', async () => {
    const id = '00000000-0000-0000-0000-000000000000';
    const res = await request(myServer).get('/api/users/' + id);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });
  it('17) test_4', async () => {
    const id = '0000000-0000-0000-0000-000000000000';
    const res = await request(myServer).get('/api/users/' + id);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid userId' });
  });
});

// PUT 4.Test -> PUT api/users/{userId} is used to update existing user

describe('4. PUT api/users/{userId} is used to update existing user', () => {
  it('18) test_1', async () => {
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

  it('19) test_2', async () => {
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

  it('20) test_3', async () => {
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

  it('21) test_4', async () => {
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

  it('22) test_5', async () => {
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

// DELETE 5.Test -> DELETE api/users/${userId} is used to delete existing user from database

describe('5. DELETE api/users/${userId} is used to delete existing user from database', () => {
  it('23) test_1', async () => {
    const res = await request(myServer).get('/api/users');
    const len = res.body.length;
    const id = res.body[1].id;
    const res1 = await request(myServer).delete('/api/users/' + id);
    expect(res1.type).toBe('application/json');
    expect(res1.statusCode).toBe(204);
    const res3 = await request(myServer).get('/api/users/' + id);
    expect(res3.body).toEqual({ error: 'User not found' });
    const res4 = await request(myServer).get('/api/users');
    expect(res4.statusCode).toBe(200);
    expect(res4.body.length).toBe(len - 1);
  });

  it('24) test_2', async () => {
    const id = '0000000-0000-0000-0000-000000000000';
    const res = await request(myServer).delete('/api/users/' + id);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Invalid userId' });
  });

  it('25) test_3', async () => {
    const id = '00000000-0000-0000-0000-000000000000';
    const res = await request(myServer).delete('/api/users/' + id);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(404);
    expect(res.body).toEqual({ error: 'User not found' });
  });
});

//6.Test -> StatusCode 500

describe('6.Test -> StatusCode 500 (Invalid JSON)', () => {
  it('26) test_1', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send('username: "Dima"; age: 20')
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Errors on the server side' });
  });
  it('27) test_2', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send('username: "Dima", age: 20, hobbies: ["running"; "cycling"]')
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Errors on the server side' });
  });

  it('28) test_3', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send('username: "Dima", age: 20,')
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Errors on the server side' });
  });

  it('29) test_4', async () => {
    const res = await request(myServer)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send()
      .expect('Content-Type', /json/);
    expect(res.type).toBe('application/json');
    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Errors on the server side' });
  });
});
