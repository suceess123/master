import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { validate } from '../middlewares/validateMiddleware.js';
import validation from '../validations/joi_validation.js';
import * as usersControllers from '../controllers/users.controllers.js';

const router = express.Router();

// ✅ Correct version
router.post(
  '/register',
  upload.single('profilePic'),
  validate(validation.signUp),
  usersControllers.createUser
);

router.post(
    '/login',
    validate(validation.login),
    usersControllers.loginUser
  );
  
  export default router;
