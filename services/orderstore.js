import Datastore from 'nedb-promises'

export class OrderStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    edit(adic) {
        this.db.update({ _id: adic.id }, { $set: { title: adic.title,due:adic.due,importance:adic.importance,description:adic.description,finished:adic.finished,importanceInt:adic.importanceInt } });
    }

    async all(name) {
        return this.db.find({user:name});
    }

    add (note,username) {
        Object.defineProperty(note, "user", {value:username})
        return this.db.insert(note);
    }

    deleteNote (noteid) {
        this.db.remove({ _id: noteid.id });
    }
}

export const orderStore = new OrderStore();