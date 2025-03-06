import express from 'express';
import { getStories, getStoryById, editStory, addStory, deleteStory } from '../controllers/story.controller.js';

const router = express();

router.get("/", getStories);
router.get("/:id", getStoryById);
router.post("/", addStory);
router.put("/:id", editStory);
router.delete("/:id", getStories);
// GET /stories/user/:userId

export default router;