import {noteService} from './note-service.js';


export function CreateNewTodo(){
    const formtitle=document.getElementById("formtitle").value
    const formimportance=document.getElementById("formimportance").value
    const formduedate=document.getElementById("formduedate").value
    const formfinished=document.getElementById("formfinished").checked
    const formdescription=document.getElementById("formdescription").value
    const formcreated=new Date().toISOString().slice(0, 10)
    const importancelist=[]
    for (let i = 0; i < formimportance; i++) {
        importancelist.push(1)
        
    }
    noteService.newNote(formtitle,formduedate,formcreated,importancelist,formdescription,formfinished,formimportance);
}

export function fillEditForm(){
    const thetitle = this.getAttribute("data-title")
    for (let i = 0; i < noteService.notes.length; i++) {
        if (noteService.notes[i].title===thetitle) {
            document.getElementById("formtitle").value=noteService.notes[i].title
            document.getElementById("formimportance").value=noteService.notes[i].importance.length
            document.getElementById("formduedate").value=noteService.notes[i].due
            if(noteService.notes[i].finished){
                document.getElementById("formfinished").checked=true
            }else{
                document.getElementById("formfinished").checked=false;
            }
            document.getElementById("formdescription").value=noteService.notes[i].description
        }
        
    }


}

export function saveEdit(){
    const formtitle=document.getElementById("formtitle").value
    const formimportance=document.getElementById("formimportance").value
    const formduedate=document.getElementById("formduedate").value
    const formfinished=document.getElementById("formfinished").checked
    const formdescription=document.getElementById("formdescription").value

    for (let i = 0; i < noteService.notes.length; i++) {
        if (noteService.notes[i].title===formtitle) {
            noteService.notes[i].title=formtitle
            noteService.notes[i].due=formduedate
            const newimportance=[]
            for (let j = 0; j < Number(formimportance); j++) {
                newimportance.push(1)
            }
            noteService.notes[i].importance=newimportance
            noteService.notes[i].description=formdescription
            noteService.notes[i].finished=formfinished
            noteService.notes[i].importanceInt=formimportance
        }
        
    }

}
