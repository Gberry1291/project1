import express from 'express';

import {noteController} from '../controller/note-controller.js';

const router = express.Router();

router.get("/", noteController.showIndex);
router.post("/newnote", noteController.createNote);
router.post("/loadnote", noteController.loadNote);
router.post("/editnote", noteController.editNote);

export const noteRoutes = router;