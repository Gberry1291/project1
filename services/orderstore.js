import Datastore from 'nedb-promises'

export class OrderStore {
    constructor(db) {
        this.db = db || new Datastore({filename: './data/notes.db', autoload: true});
    }

    edit(adic,name) {
        this.db.update({ _id: adic.id }, { $set: { title: adic.title,due:adic.due,importance:adic.importance,description:adic.description,finished:adic.finished,importanceInt:adic.importanceInt } });
        return this.all(name)
    }

    editChecked(adic){
        const sortmethod={}
        sortmethod.finished=adic.finished
        this.db.update({ _id: adic.id },{ $set: sortmethod})
    }

    all(name) {
        const sortmethod={}
        if (name.sortway==="due") {
            sortmethod.finished=1
        }
        sortmethod[name.sortway]=name.highlow
        return this.db.find({user:name.name}).sort(sortmethod);
    }

    findOne(id) {
        return this.db.find({_id:id.id})
    }

    add (note,user) {
        const newnote=note
        newnote.user=user.name
        this.db.insert(newnote);
        return this.all(user)
    }

    deleteNote (noteid,name) {
        this.db.remove({ _id: noteid.id });
        return this.all(name)
    }
}

export const orderStore = new OrderStore();