const totalLikes = blogs => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0);
};

const favoriteBlog = blogs => {
  return blogs.reduce((acc, cur) => (acc.likes > cur.likes ? acc : cur));
};

const mostBlogs = blogs => {
  let obj = {
    author: '',
    blogs: 0
  };
  blogs.reduce((acc, cur) => {
    if (acc.blogs > cur.blogs) {
      obj.author = acc.author;
      obj.blogs = acc.blogs;
    } else {
      obj.author = cur.author;
      obj.blogs = cur.blogs;
    }
  });
  return obj;
};

const mostLikes = blogs => {
  let obj = {
    author: '',
    likes: 0
  };
  blogs.reduce((acc, cur) => {
    if (acc.likes > cur.likes) {
      obj.author = acc.author;
      obj.likes = acc.likes;
    } else {
      obj.author = cur.author;
      obj.likes = cur.likes;
    }
  });
  return obj;
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
