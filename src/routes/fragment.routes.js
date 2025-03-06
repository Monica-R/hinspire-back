import express from 'express';
import { addFragment, getFragments, editFragment, deleteFragment } from '../controllers/fragment.controller.js';

const router = express();

router.get("/", getFragments);
router.post("/", addFragment);
router.put("/:id", editFragment);
router.delete("/:id", deleteFragment);

export default router;