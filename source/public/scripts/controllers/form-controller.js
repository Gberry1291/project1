import {customAlert} from './click-event-controller.js'
import NoteService from '../services/note-service.js'

export function grabFormData(){
    const string=document.getElementById("formtitle").value
    const formtitle=string.charAt(0).toUpperCase() + string.slice(1);
    const formimportance=document.getElementById("formimportance")
    const formduedate=document.getElementById("formduedate")
    const formfinished=document.getElementById("formfinished").checked
    const formdescription=document.getElementById("formdescription").value
    const formid=document.getElementById("id").value
    const formcreated=new Date().toISOString().slice(0, 10)
    const importancelist=[]
    for (let i = 0; i < formimportance.value; i++) {
        importancelist.push(1)   
    }
    const thebody={title:formtitle,due:formduedate.value,created:formcreated,importance:importancelist,description:formdescription,finished:formfinished,importanceInt:formimportance.value,id:formid}
    return(thebody) 
}
export async function createNewTodo(){
    const thebody=grabFormData()
    document.getElementById("todoform").reset();
    customAlert("passed","Todo added Succesfully")
    return NoteService.createNewNote(thebody)
}
export function validateForm(){
    const formtitle=document.getElementById("formtitle")
    const formimportance=document.getElementById("formimportance")
    const formduedate=document.getElementById("formduedate")
    let formcheck=true
    const checklist=[formtitle,formimportance,formduedate]
    checklist.forEach(element => {
        if (!element.validity.valid) {
            formcheck=false
            element.reportValidity();   
        }
    });
    if (formcheck===true) {
        return true
    }
    return false
}
export async function saveEdit(){
    const thebody=grabFormData()
    return NoteService.editNote(thebody)
}
export async function deleteNote(){
    const formid=document.getElementById("id").value
    const thebody={id:formid}
    return NoteService.deleteNote(thebody)
}
export async function fillEditForm(){
    const theid = {"id":this.getAttribute("data-id")}
    const NoteFound=await NoteService.findNote(theid)

    // eslint-disable-next-line no-underscore-dangle
    document.getElementById("id").value=NoteFound[0]._id
    document.getElementById("formtitle").value=NoteFound[0].title
    document.getElementById("formimportance").value=NoteFound[0].importance.length
    document.getElementById("formduedate").value=NoteFound[0].due
    if(NoteFound[0].finished){
        document.getElementById("formfinished").checked=true
    }else{
        document.getElementById("formfinished").checked=false;
    }
    document.getElementById("formdescription").value=NoteFound[0].description

}