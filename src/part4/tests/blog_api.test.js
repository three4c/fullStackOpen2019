const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are five blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(4);
});

test('the first blogs is about HTTP methods', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body[0].content).toBe('HTML is easy');
});

afterAll(() => {
  mongoose.connection.close();
});
