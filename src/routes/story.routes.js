import express from 'express';
import { getStories, getStoryById, editStory, addStory, deleteStory, getStoriesByUser, finishStory } from '../controllers/story.controller.js';
import { isAuthenticated } from '../middlewares/jwt.middleware.js';

const router = express();

router.get("/", getStories);
router.get("/:id", getStoryById);
router.post("/", isAuthenticated, addStory);
router.put("/:id", isAuthenticated, editStory);
router.delete("/:id", isAuthenticated, deleteStory);
// Endpoint para las historias por el usuario autenticado - GET /stories/user/:userId
router.get("/user/:userId", isAuthenticated, getStoriesByUser);
// Endpoint para el botón de "historia completada"
router.put("/:id/complete", isAuthenticated, finishStory);

export default router;