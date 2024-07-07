import express from 'express';

import noteController from '../controller/note-controller.js';

const router = express.Router();

router.get("/", noteController.showIndex);
router.post("/newnote", noteController.createNote);
router.post("/loadnote", noteController.loadNote);
router.post("/editnote", noteController.editNote);
router.post("/deletenote", noteController.deleteNote);
router.post("/sortnote", noteController.sortNote);
router.post("/findone", noteController.findNote);
router.post("/changedark", noteController.changeDark);
router.post("/filter", noteController.filterCompleted);
router.post("/editchecked", noteController.editChecked);

router.post("/login", noteController.login);
router.post("/logout", noteController.logout);

const noteRoutes = router;
export default noteRoutes