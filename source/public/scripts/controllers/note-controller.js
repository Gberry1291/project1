import {toggleFormMode,ToggleEditMode,ToggleOpenClosed,lightDarkMode,arrowDarkMode,customAlert,FilterCompleted} from './click-event-controller.js'
import NoteService from '../services/note-service.js'

let darkmode=false
function ChangeDate(){

    const days=document.querySelectorAll(".duedate")
    const sevenDays=604800000
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today=new Date()
    
    days.forEach(element => {
        const domElement=element
        const newdate= new Date(element.innerHTML)
        const daysUntilDue=newdate.getTime()-today.getTime()
        if(daysUntilDue<=sevenDays){
            domElement.innerHTML=dayNames[newdate.getDay()]
        }
    });

}
async function fillEditForm(){
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
function notesEventHandlers(){
    const edits=document.querySelectorAll(".edit")
    edits.forEach(editbut => {
        editbut.addEventListener("click",ToggleEditMode)
        editbut.addEventListener("click",toggleFormMode)
        editbut.addEventListener("click",fillEditForm)
    });
    const checkboxes=document.querySelectorAll(".checkbox")
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click",ToggleOpenClosed)
    
    }
}
const HBscript='{{#each note}}<div class="todoitem"><div class="todocontainer" ><p class="duedate">{{due}}</p><div>{{#if finished}}<input class="checkbox" name="checkbox" type="checkbox" checked><span class="checkboxlabel">Closed</span>{{else}}<input class="checkbox" name="checkbox" type="checkbox"><span class="checkboxlabel">Open</span>{{/if}}</div></div><div class="todocontainer" ><p>{{title}}</p><p>{{description}}</p></div><div class="flexright" ><div class="flexright">{{#each importance}}<div class="arrow"></div>{{/each}}</div><div class="button edit" data-id="{{_id}}">Edit</div></div></div>{{/each}}'
/* global Handlebars */
const todoTemplateCompiled=Handlebars.compile(HBscript);

export function showNotes(notelist) {
    document.getElementById("todolist").innerHTML = todoTemplateCompiled(
        {note: notelist,darkmode},
        {allowProtoPropertiesByDefault: true}
    )
    if (darkmode) {
        arrowDarkMode()
    }
    notesEventHandlers()
    ChangeDate()
}
async function sortitby(sortHowDic){
    showNotes(await NoteService.SortedNote(sortHowDic))
}
function grabFormData(){
    const formtitle=document.getElementById("formtitle")
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
    const thebody={title:formtitle.value,due:formduedate.value,created:formcreated,importance:importancelist,description:formdescription,finished:formfinished,importanceInt:formimportance.value,id:formid}
    return(thebody) 
}
async function CreateNewTodo(){
    const thebody=grabFormData()
    document.getElementById("todoform").reset();
    customAlert("passed","Todo added Succesfully")
    showNotes(await NoteService.createNewNote(thebody))
}
function ValidateForm(){
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
async function saveEdit(){
    const thebody=grabFormData()
    showNotes(await NoteService.editNote(thebody))
}
async function DeleteNote(){
    const formid=document.getElementById("id").value
    const thebody={id:formid}
    showNotes(await NoteService.deleteNote(thebody))
    ToggleEditMode()
    document.getElementById("todoform").reset();
}

export class NoteController {
    constructor() {
        this.tognew=document.querySelectorAll(".tognew")
        this.loggedin=document.getElementById("loggedin")
        this.sorttitle=document.getElementById("sorttitle")
        this.sortdue=document.getElementById("sortdue")
        this.sortcreated=document.getElementById("sortcreated")
        this.sortimportance=document.getElementById("sortimportance")
    }

    initEventHandlers() {
        this.sorttitle.addEventListener("click",()=>{
            sortitby({"title":1})
        })
        this.sortdue.addEventListener("click",()=>{
            sortitby({"due":1})
        })
        this.sortcreated.addEventListener("click",()=>{
            sortitby({"created":1})
        })
        this.sortimportance.addEventListener("change",()=>{
            const SortImportance=document.getElementById("sortimportance")
            const HighLow=Number(SortImportance.value)
            sortitby({"importanceInt":HighLow})
        })
        document.getElementById("sortcompleted").addEventListener("click",FilterCompleted)
        
        this.tognew.forEach(element => {
            element.addEventListener("click",toggleFormMode)
        });        
        
        document.getElementById("saveedit").addEventListener("click",(event)=>{
            if (ValidateForm()) {
                saveEdit()
                ToggleEditMode()
                toggleFormMode()
            }
            event.preventDefault()
        })
        document.getElementById("deleteedit").addEventListener("click",DeleteNote)
        document.getElementById("create").addEventListener("click",(event)=>{
            if (ValidateForm()) {
                CreateNewTodo()
            }
            event.preventDefault()
        });
        document.getElementById("createoverview").addEventListener("click",(event)=>{
            CreateNewTodo()
            event.preventDefault()
        })

        document.getElementById("togstyle").addEventListener("click",()=>{
            lightDarkMode()
            arrowDarkMode()
            darkmode=!darkmode;
        })
    }

    async initialize () {
        if (this.loggedin.innerHTML==="true") {
            // showNotes(await noteService.loadNoteList())
            showNotes(await NoteService.loadNoteList())
            
            this.initEventHandlers();
        }
    }
}

export const noteController = new NoteController();
noteController.initialize()