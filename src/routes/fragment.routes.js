import express from 'express';
import { addFragment, getFragmentsByStory, editFragment, deleteFragment } from '../controllers/fragment.controller.js';

const router = express();

//router.get("/", getFragments);
router.get("/story/:id", getFragmentsByStory);
router.post("/", addFragment);
router.put("/:id", editFragment);
router.delete("/:id", deleteFragment);

export default router;