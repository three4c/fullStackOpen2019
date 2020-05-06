const mongoose = require('mongoose');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const api = supertest(app);

describe('最初にいくつかのブログが保存されている時', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  test('ブログはjsonとして返される', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('全てのブログが返される', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(helper.initialBlogs.length);
  });

  test('特定のブログは返されたブログ内にある', async () => {
    const response = await api.get('/api/blogs');
    const title = response.body.map((r) => r.title);
    expect(title).toContain('hogehoge');
  });

  test('返されたブログの識別フィールドの名前がidであることを確認', async () => {
    const response = await api.get('/api/blogs');
    const id = response.body.map((r) => r.id);
    expect(id).toBeDefined();
  });
});

describe('新しいブログの追加', () => {
  test('データの追加に成功する', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((n) => n.title);
    expect(titles).toContain('async/await simplifies making async calls');
  });

  test('データが無効な場合、ステータスコード400で有効な失敗する', async () => {
    const newBlog = {
      url: 'https://piyo.com',
    };

    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);
  });
});

describe('データベースに最初のユーザが存在する場合', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekret', 10);
    const user = new User({ username: 'root', passwordHash });

    await user.save();
  });

  test('新しいユーザの作成に成功した場合', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'hoge',
      name: 'hogehoge',
      password: 'hogehogehoge',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
