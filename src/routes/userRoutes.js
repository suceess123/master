// routes/upload.js
import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import * as userscontrollers from '../controllers/users.controllers.js';
const router = express.Router();


// multer setup
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage });

// POST /upload route
router.post('/register', userscontrollers.createUser);

router.post('/login', userscontrollers.login);

export default router;
