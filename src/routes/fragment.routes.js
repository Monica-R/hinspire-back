import express from 'express';
import { addFragment, getFragmentsByStory, editFragment, deleteFragment } from '../controllers/fragment.controller.js';
import { isAuthenticated } from '../middlewares/jwt.middleware.js';

const router = express();

//router.get("/", getFragments);
router.get("/story/:id", getFragmentsByStory);
router.post("/:id", isAuthenticated, addFragment);
router.put("/:id", isAuthenticated, editFragment);
router.delete("/:id", isAuthenticated, deleteFragment);

export default router;