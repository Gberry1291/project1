import Note from './Note.js';
import {showNotes,noteController} from '../controllers/note-controller.js';

export class NoteService {
    constructor(){
        this.notes=[]
    }

    loadData = async () =>{
        if (this.notes.length===0) {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            const myInit = {
            method: 'POST',
            headers: myHeaders,
            cache: 'default',
            };
            const myRequest = new Request('/loadnote', myInit);
            const response = await fetch(myRequest);
            const movies = await response.json();
            movies.forEach(element => {
                this.newNote(element["title"],element["due"],element["created"],element["importance"],element["description"],element["finished"],element["importanceInt"],element["_id"])
            });
            showNotes()
            noteController.initEventHandlers();
        }
    }


    newNote(title,due,created,importance,description,finished,importanceInt,id){
        this.notes.push(new Note(title,due,created,importance,description,finished,importanceInt,id));
    }


}



export const noteService = new NoteService();