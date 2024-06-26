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

    async findOne(id) {
        return this.db.find({_id:id.id})
    }

    async add (note,username) {
        const newnote=note
        newnote.user=username
        this.db.insert(newnote);
        return this.db.find({user:username});
    }

    deleteNote (noteid) {
        this.db.remove({ _id: noteid.id });
    }

    sort(name,sortmethod){
        return this.db.find({user:name}).sort(sortmethod);
    }
}

export const orderStore = new OrderStore();