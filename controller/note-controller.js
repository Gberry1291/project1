import {orderStore} from '../services/orderstore.js';
import {userStore} from '../services/userstore.js';
import SecurityUtil from "../utils/security.js";

export default class NoteController {

    static showIndex(req, res){
        if (SecurityUtil.isLoggedIn(req)) {
            res.render("index",{"loggedin":true})
        }else{
            res.render("index",{"loggedin":false})
        }
    };

    static async login(req, res){
        if (!SecurityUtil.isLoggedIn(req)) {
            const username = req.body.username.toLowerCase();

            const valid = await userStore.authenticate(username, req.body.password);

            if (valid) {
                SecurityUtil.login(req, valid.username,valid.sortway,valid.sorthighlow,valid.darkmode,valid.filter);
                res.json({logged:"true"})
            } else {
                res.json({logged:"false"})
            }
        } else {
            res.redirect("/");
        }
    };

    static logout(req, res){
        if (SecurityUtil.isLoggedIn(req)) {
            SecurityUtil.logout(req);
            res.redirect("/");
        }
    };

    static async createNote(req, res){
        res.json(await orderStore.add(req.body,req.session.user))
    };

    static async loadNote(req, res){
        const notelist=await orderStore.all(req.session.user)
        const isdark=req.session.user.darkmode
        const sortselect=req.session.user.sortway
        const filterway=req.session.user.filter
        res.json({notes:notelist,darkmode:isdark,sortid:sortselect,filter:filterway})
    };

    static async editNote(req, res){
        res.json(await orderStore.edit(req.body,req.session.user))
    };

    static editChecked(req, res){
        orderStore.editChecked(req.body)
        res.json({"pass":"pass"})
    }

    static async deleteNote(req, res){
        res.json(await orderStore.deleteNote(req.body,req.session.user))
    };

    static async sortNote(req, res){
        await userStore.changeuserinfo(req.session.user.name,req.body)
        req.session.user.sortway=req.body.sortway
        req.session.user.highlow=req.body.sorthighlow
        res.json(await orderStore.all(req.session.user))
    };

    static changeDark(req,res){
        userStore.changeuserinfo(req.session.user.name,req.body)
        req.session.user.darkmode=req.body.darkmode
        res.json({"changed":"changed"})
    }

    static filterCompleted(req,res){
        userStore.changeuserinfo(req.session.user.name,req.body)
        req.session.user.filter=req.body.filter
        res.json({"changed":"changed"})
    }

    static async findNote(req, res){
        res.json(await orderStore.findOne(req.body))
    };

}
