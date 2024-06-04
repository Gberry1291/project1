import Note from './Note.js';

export class NoteService {
    constructor(){
        this.notes=[]
    }

    loadData() {
        if (this.notes.length === 0) { // initial data seed
            this.notes.push(new Note("a test","2024-06-07","2024-05-30", [1,1,1],"some new descrip",true,3));
            this.notes.push(new Note("c test","2024-08-15","2024-05-3", [1,1,1,1,1],"blalskd",true,5));
            this.notes.push(new Note("z test","2025-05-30","2024-05-10", [1],"ggggg",false,1));
        }
    }

    newNote(title,due,created,importance,description,finished){
        this.notes.push(new Note(title,due,created,importance,description,finished));
    }


}



export const noteService = new NoteService();