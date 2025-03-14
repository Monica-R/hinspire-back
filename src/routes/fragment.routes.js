import express from 'express';
import { addFragment, getFragmentsByStory, editFragment, deleteFragment, acceptFragment } from '../controllers/fragment.controller.js';
import { isAuthenticated } from '../middlewares/jwt.middleware.js';

const router = express();

//router.get("/", getFragments);
router.put("/:storyId/confirm/:fragmentId", isAuthenticated, acceptFragment);
router.get("/story/:id", getFragmentsByStory);
router.post("/:id", isAuthenticated, addFragment);
router.put("/:id", isAuthenticated, editFragment);
router.delete("/:id", isAuthenticated, deleteFragment);

export default router;