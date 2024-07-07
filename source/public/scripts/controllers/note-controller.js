import {
    toggleFormMode,
    toggleEditMode,
    toggleOpenClosed,
    lightDarkMode,
    filterCompleted,
    highLightButton,
    customAlert
} from './click-event-controller.js'
import {
    createNewTodo,
    validateForm,
    saveEdit,
    deleteNote,
    fillEditForm
} from './form-controller.js'
import NoteService from '../services/note-service.js'

let darkmode=false
let filter=false
function changeDate(){

    const days=document.querySelectorAll(".duedate")
    const sevenDays=604800000
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today=new Date()
    
    days.forEach(element => {
        const domElement=element
        const newdate= new Date(element.innerHTML)
        const daysUntilDue=newdate.getTime()-today.getTime()
        if((daysUntilDue<=sevenDays)&&(daysUntilDue>0)){
            domElement.innerHTML=dayNames[newdate.getDay()]
        }
        if ( (daysUntilDue<0) && (!domElement.nextSibling.firstChild.checked)  ) {
            domElement.classList.add("duedatelate")
            domElement.innerHTML+=" LATE"
            customAlert("failed","a Todo is past its due date AND not completed!")
        }
    });

}
function notesEventHandlers(){
    const edits=document.querySelectorAll(".edit")
    edits.forEach(editbut => {
        editbut.addEventListener("click",toggleEditMode)
        editbut.addEventListener("click",toggleFormMode)
        editbut.addEventListener("click",fillEditForm)
    });
    const checkboxes=document.querySelectorAll(".checkbox")
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener("click",toggleOpenClosed)
    }
}
const HBscript='{{#each note}}<div class="todoitem{{#if ../darkmode}} darkmode{{/if}}"><div class="todocontainer" ><p class="duedate">{{due}}</p><div>{{#if finished}}<input class="checkbox" name="checkbox" data-id="{{_id}}" type="checkbox" checked><span class="checkboxlabel">Closed</span>{{else}}<input class="checkbox" name="checkbox" data-id="{{_id}}" type="checkbox"><span class="checkboxlabel">Open</span>{{/if}}</div></div><div class="todocontainer" ><p>{{title}}</p><p>{{description}}</p></div><div class="flexright" ><div class="flexright">{{#each importance}}<div class="arrow{{#unless ../../darkmode}} darkmode{{/unless}}"></div>{{/each}}</div><div class="button edit" data-id="{{_id}}">Edit</div></div></div>{{/each}}'
/* global Handlebars */
const todoTemplateCompiled=Handlebars.compile(HBscript);
export async function showNotes(notelistfunc,param1) {
    const notelist=await notelistfunc(param1)
    document.getElementById("todolist").innerHTML = todoTemplateCompiled(
        {note: notelist,darkmode},
        {allowProtoPropertiesByDefault: true}
    )
    notesEventHandlers()
    changeDate()
    if (filter) {
        filterCompleted()
    }
}
function sortOnClick(){
    const body={"sortway":this.dataset.sortway,"sorthighlow":this.dataset.highlow}
    highLightButton(this.dataset.sortway)
    showNotes(NoteService.sortedNote,body)
}
function sortOnChange(){
    const body={"sortway":this.dataset.sortway,"sorthighlow":this.value}
    highLightButton(this.dataset.sortway)
    showNotes(NoteService.sortedNote,body)

}

async function setDarkMode(){
    darkmode=!darkmode;
    lightDarkMode()
    await NoteService.darkMode({"darkmode":darkmode})
}

class NoteController {
    constructor() {
        this.tognew=document.querySelectorAll(".tognew")
        this.loggedin=document.getElementById("loggedin")
        this.sortimportance=document.getElementById("sortimportanceInt")
        this.sortButtons=document.querySelectorAll(".sorter")
        this.importancedrop=document.getElementById("sortimportanceInt")
    }

    initEventHandlers() {
        this.sortButtons.forEach(element => {
            element.addEventListener("click",sortOnClick)
        });
        this.importancedrop.addEventListener("change",sortOnChange)
        document.getElementById("sortcompleted").addEventListener("click",()=>{
            filter=!filter
            NoteService.filterCom({"filter":filter})
            document.getElementById("sortcompleted").classList.toggle("filtering")
            filterCompleted()
        })

        this.tognew.forEach(element => {
            element.addEventListener("click",toggleFormMode)
        });        
        
        document.getElementById("saveedit").addEventListener("click",(event)=>{
            if (validateForm()) {
                showNotes(saveEdit)
                toggleEditMode()
                toggleFormMode()
            }
            event.preventDefault()
        })
        document.getElementById("deleteedit").addEventListener("click",(event)=>{
            showNotes(deleteNote)
            toggleEditMode()
            document.getElementById("todoform").reset();
            event.preventDefault()
        })
        document.getElementById("create").addEventListener("click",(event)=>{
            if (validateForm()) {
                showNotes(createNewTodo)
            }
            event.preventDefault()
        });
        document.getElementById("createoverview").addEventListener("click",(event)=>{
            showNotes(createNewTodo)
            event.preventDefault()
        })

        document.getElementById("togstyle").addEventListener("click",setDarkMode)
    }

}

const noteController = new NoteController();

export async function initialize () {
    if (document.getElementById("loggedin").innerHTML==="true") {
        const notesAndDark=await NoteService.loadNoteList()
        if (notesAndDark.darkmode!==darkmode) {
            darkmode=!darkmode
            lightDarkMode()
        }
        if (notesAndDark.filter!==filter) {
            filter=!filter
            document.getElementById("sortcompleted").classList.toggle("filtering")
        }
        highLightButton(notesAndDark.sortid)
        noteController.initEventHandlers();

        return notesAndDark.notes
        
    }
    return false
}
showNotes(initialize)
