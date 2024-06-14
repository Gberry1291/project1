import {orderStore} from '../services/orderstore.js';
import express from 'express';
import Datastore from 'nedb-promises'


export class NoteController {

    showIndex(req, res){
        res.render("index");
    };
    createNote(req, res){
        orderStore.add(req.body)
        res.end()
    };
    loadNote = async (req, res) => {
        res.json(await orderStore.all())
    };
    editNote = (req, res) => {
        orderStore.edit(req.body)
        res.end()
    };

}

export const noteController = new NoteController();