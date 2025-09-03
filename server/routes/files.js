import express from 'express';
import { uploadFile, getFiles, deleteFile, processFile } from '../controllers/fileController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// Routes
router.post('/upload', upload.single('file'), uploadFile);
router.get('/list', getFiles);
router.delete('/delete/:id', deleteFile);
router.post('/process/:id', processFile);

export default router;