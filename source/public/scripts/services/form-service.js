import {noteService} from './note-service.js';


export async function CreateNewTodo(){
    const formtitle=document.getElementById("formtitle")
    const formimportance=document.getElementById("formimportance")
    const formduedate=document.getElementById("formduedate")
    const formfinished=document.getElementById("formfinished").checked
    const formdescription=document.getElementById("formdescription").value
    const formcreated=new Date().toISOString().slice(0, 10)
    const importancelist=[]
    for (let i = 0; i < formimportance.value; i++) {
        importancelist.push(1)   
    }
    let formcheck=true
    const checklist=[formtitle,formimportance,formduedate]
    checklist.forEach(element => {
        if (!element.validity.valid) {
            formcheck=false
            element.reportValidity();   
        }
    });
    if (formcheck===true) {
        const thebody={title:formtitle.value,due:formduedate.value,created:formcreated,importance:importancelist,description:formdescription,finished:formfinished,importanceInt:formimportance.value,user:"demouser"}

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const myInit = {
        method: 'POST',
        headers: myHeaders,
        cache: 'default',
        body: JSON.stringify(thebody)
        };
        const myRequest = new Request('/newnote', myInit);
        fetch(myRequest);
        noteService.newNote(formtitle.value,formduedate.value,formcreated,importancelist,formdescription,formfinished,formimportance.value)
    }


}

export function fillEditForm(){
    const theid = this.getAttribute("data-id")
    for (let i = 0; i < noteService.notes.length; i++) {
        if (noteService.notes[i].id===theid) {
            document.getElementById("id").value=theid
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
    const formid=document.getElementById("id").value
    const formtitle=document.getElementById("formtitle").value
    const formimportance=document.getElementById("formimportance").value
    const formduedate=document.getElementById("formduedate").value
    const formfinished=document.getElementById("formfinished").checked
    const formdescription=document.getElementById("formdescription").value

    const newimportance=[]
    for (let j = 0; j < Number(formimportance); j++) {
        newimportance.push(1)
    }

    for (let i = 0; i < noteService.notes.length; i++) {
        if (noteService.notes[i].id===formid) {
            noteService.notes[i].title=formtitle
            noteService.notes[i].due=formduedate
            noteService.notes[i].importance=newimportance
            noteService.notes[i].description=formdescription
            noteService.notes[i].finished=formfinished
            noteService.notes[i].importanceInt=formimportance
        }
        
    }

    const thebody={id:formid,title:formtitle,due:formduedate,importance:newimportance,description:formdescription,finished:formfinished,importanceInt:formimportance}

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const myInit = {
    method: 'POST',
    headers: myHeaders,
    cache: 'default',
    body: JSON.stringify(thebody)
    };
    const myRequest = new Request('/editnote', myInit);
    fetch(myRequest);

}

