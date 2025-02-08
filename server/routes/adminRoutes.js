// adminRoutes.js
import express from 'express';
import multer from 'multer';
import { createChildProfile } from '../controller/childProfileController.js';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Change path if needed

// Routes
router.post('/childProfile', upload.single('photo'), createChildProfile);
export default router;
