import Datastore from 'nedb-promises'

export class OrderStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    edit(adic) {
        this.db.update({ _id: adic.id }, { $set: { title: adic.title,due:adic.due,importance:adic.importance,description:adic.description,finished:adic.finished,importanceInt:adic.importanceInt } });
    }

    async all() {
        return this.db.find({});
    }

    add (note) {
        this.db.insert(note);
    }
}

export const orderStore = new OrderStore();