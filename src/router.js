import { Router } from 'express';
import * as Posts from './controllers/post_controller';
import * as UserController from './controllers/user_controller';
import signS3 from './services/s3';
import { requireAuth, requireSignin } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.post('/signin', requireSignin, UserController.signin);

router.post('/signup', UserController.signup);

router.route('/posts')
  .post(requireAuth, Posts.createPost)
  .get(Posts.getPosts);

router.route('/posts/:id')
  .put(requireAuth, Posts.updatePost)
  .get(Posts.getPost)
  .delete(requireAuth, Posts.deletePost);

router.get('/sign-s3', signS3);

export default router;
