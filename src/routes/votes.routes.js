import express from 'express';
import { addVote, deleteVote } from '../controllers/vote.controller';
import { isAuthenticated } from '../middlewares/jwt.middleware.js';

const router = express();

router.post("/vote/:fragmentId", isAuthenticated, addVote);
router.delete("vote/:fragmentId", isAuthenticated, deleteVote);

export default router;