import { Router } from 'express';
import {
  loginController,
  logoutController,
  meController,
  refreshController,
  signupController,
  checkUsernameController,
  setUsernameController,
  googleCallbackController
} from '../controllers/authController.js';
import passportInstance from '../config/passport.js';
import { requireAuth } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { loginSchema, signupSchema } from '../validations/authValidation.js';
import env from '../config/env.js';

const router = Router();

router.post('/signup', validateRequest(signupSchema), signupController);
router.post('/login', validateRequest(loginSchema), loginController);
router.post('/refresh', refreshController);
router.post('/logout', requireAuth, logoutController);
router.get('/me', requireAuth, meController);
router.get('/username/check', requireAuth, checkUsernameController);
router.patch('/username', requireAuth, setUsernameController);

// Google OAuth (only registered when credentials are present)
if (env.google.clientId && env.google.clientSecret) {
  router.get(
    '/google',
    passportInstance.authenticate('google', { scope: ['profile', 'email'] })
  );
  router.get(
    '/google/callback',
    passportInstance.authenticate('google', {
      failureRedirect: `${env.clientUrl}/login?error=google`
    }),
    googleCallbackController
  );
}

export default router;

