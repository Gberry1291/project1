import express from 'express';

import {noteController} from '../controller/note-controller.js';

const router = express.Router();

router.get("/", noteController.showIndex);
router.post("/newnote", noteController.createNote);
router.post("/loadnote", noteController.loadNote);
router.post("/editnote", noteController.editNote);
router.post("/deletenote", noteController.deleteNote);
router.post("/sortnote", noteController.sortNote);
router.post("/findone", noteController.findNote);

router.post("/login", noteController.login);
router.post("/logout", noteController.logout);

export const noteRoutes = router;