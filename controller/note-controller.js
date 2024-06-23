import {orderStore} from '../services/orderstore.js';
import {userStore} from '../services/userstore.js';
import {SecurityUtil} from "../utils/security.js";

export class NoteController {

    showIndex(req, res){
        if (SecurityUtil.isLoggedIn(req)) {
            res.render("index",{"loggedin":true})
        }else{
            res.render("index",{"loggedin":false})
        }
    };

    login = async (req, res) => {
        if (!SecurityUtil.isLoggedIn(req)) {
            const username = req.body.username.toLowerCase();
            const password = req.body.password;

            let valid = await userStore.authenticate(username, password);

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
    logout = (req, res) => {
        if (SecurityUtil.isLoggedIn(req)) {
            SecurityUtil.logout(req);
            res.redirect("/");
        }
    };

    createNote = async (req, res)=>{
        res.json(await orderStore.add(req.body,req.session.user.name))
    };
    loadNote = async (req, res) => {
        res.json(await orderStore.all(req.session.user.name))
    };
    editNote = (req, res) => {
        orderStore.edit(req.body)
        res.end()
    };
    deleteNote = (req, res) => {
        orderStore.deleteNote(req.body)
        res.end()
    };

}

export const noteController = new NoteController();