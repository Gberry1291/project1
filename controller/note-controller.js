import {orderStore} from '../services/orderstore.js';
import {userStore} from '../services/userstore.js';
import {SecurityUtil} from "../utils/security.js";

/* eslint class-methods-use-this: ["error", { "exceptMethods": [
showIndex,login,logout,createNote,loadNote,editNote,deleteNote,sortNote,findNote
] }] */

export class NoteController {

    showIndex(req, res){
        if (SecurityUtil.isLoggedIn(req)) {
            res.render("index",{"loggedin":true})
        }else{
            res.render("index",{"loggedin":false})
        }
    };

    async login(req, res){
        if (!SecurityUtil.isLoggedIn(req)) {
            const username = req.body.username.toLowerCase();

            const valid = await userStore.authenticate(username, req.body.password);

            if (valid) {
                SecurityUtil.login(req, username);
                res.json({logged:"true"})
            } else {
                res.json({logged:"false"})
            }
        } else {
            res.redirect("/");
        }
    };

    logout(req, res){
        if (SecurityUtil.isLoggedIn(req)) {
            SecurityUtil.logout(req);
            res.redirect("/");
        }
    };

    async createNote(req, res){
        res.json(await orderStore.add(req.body,req.session.user.name))
    };

    async loadNote(req, res){
        res.json(await orderStore.all(req.session.user.name))
    };

    async editNote(req, res){
        await orderStore.edit(req.body,req.session.user.name)
        res.json(await orderStore.all(req.session.user.name))
    };

    async deleteNote(req, res){
        await orderStore.deleteNote(req.body)
        res.json(await orderStore.all(req.session.user.name))
    };

    async sortNote(req, res){
        res.json(await orderStore.sort(req.session.user.name,req.body))
    };

    async findNote(req, res){
        res.json(await orderStore.findOne(req.body))
    };

}

export const noteController = new NoteController();