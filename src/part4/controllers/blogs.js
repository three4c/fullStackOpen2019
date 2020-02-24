const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (_, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(blog => {
      if (blog) {
        response.json(blog.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

blogsRouter.post('/', (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then(result => {
    response.status(200).json(result);
  });
});

module.exports = blogsRouter;
