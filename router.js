import {Router} from 'express';
import * as Posts from './controllers/post_controller';

const router = Router();

router.get('/api', (res) => {
  res.json({ message: 'hi there!'});
});

router.route('/api/posts')
  .post(Posts.createPost(req, res))
  .get( Posts.getPosts(req, res));

router.route('/api/posts/:id')
  .post(Posts.updatePost(req, res))
  .get(Posts.getPost(req, res))
  .delete(posts.deletePost(req, res))