/* eslint-disable no-unused-vars */
import Post from '../models/post_model';

/**
 * Creates a post.
 * @param {*} req
 * @param {*} res
 */
export const createPost = (req, res) => {
  const post = new Post();
  console.log(req.user);
  post.author = req.user;
  post.title = req.body.title;
  post.content = req.body.content;
  post.tags = req.body.tags;
  post.cover_url = req.body.cover_url;
  post.save().then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

/**
 * Returns all posts.
 * @param {*} req
 * @param {*} res
 */
export const getPosts = (req, res) => {
  Post.find().populate('author').then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

/**
 * Returns a post.
 * @param {*} req
 * @param {*} res
 */
export const getPost = (req, res) => {
  console.log(req.params.id);
  Post.findById(req.params.id).populate('author').then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(404).json({ error });
  });
};

/**
 * Deletes a post.
 * @param {*} req
 * @param {*} res
 */
export const deletePost = (req, res) => {
  Post.remove({ _id: req.params.id }).then((result) => {
    res.json(result);
  }).catch((error) => {
    res.status(500).json({ error });
  });
};

/**
 * Updates a post.
 * @param {*} req
 * @param {*} res
 */
export const updatePost = (req, res) => {
  console.log(req.params.id);
  Post.findById(req.params.id).then((post) => {
    post.title = (req.body.title === null ? post.title : req.body.title);
    post.content = (req.body.content === null ? post.content : req.body.content);
    post.tags = (req.body.tags === null ? post.tags : req.body.tags);
    post.cover_url = (req.body.cover_url === null ? post.cover_url : req.body.cover_url);
    console.log(post.content);
    post.save().then(() => {
      Post.findById(req.params.id).populate('author').then((result) => {
        res.json(result);
      }).catch((error) => {
        res.status(500).json({ error });
      });
    });
  }).catch((error) => {
    console.log('ERROR HERE');
    res.status(404).json({ error });
  });
};
