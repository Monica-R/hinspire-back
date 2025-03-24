import express from 'express';
import { emotionAnalyzer } from '../controllers/gemini.controller.js';
import { isAuthenticated } from '../middlewares/jwt.middleware.js';

const router = express.Router();

router.post("/analyze-emotion",isAuthenticated, emotionAnalyzer);

export default router;