import {noteService} from '../services/note-service.js';
import {sortItBy,FilterCompleted} from '../services/sort-service.js';
import {toggleFormMode,ToggleEditMode,ToggleOpenClosed,lightDarkMode,arrowDarkMode} from '../services/click-events.js'
import {CreateNewTodo,fillEditForm,saveEdit,deleteEdit} from '../services/form-service.js'

let darkmode=false
const HBscript='{{#each note}}<div class="todoitem"><div class="todocontainer" ><p class="duedate">{{due}}</p><div>{{#if finished}}<input class="checkbox" name="checkbox" type="checkbox" checked><span class="checkboxlabel">Closed</span>{{else}}<input class="checkbox" name="checkbox" type="checkbox"><span class="checkboxlabel">Open</span>{{/if}}</div></div><div class="todocontainer" ><p>{{title}}</p><p>{{description}}</p></div><div class="flexright" ><div class="flexright">{{#each importance}}<div class="arrow"></div>{{/each}}</div><div class="button edit" data-id="{{id}}">Edit</div></div></div>{{/each}}'
const todoTemplateCompiled=Handlebars.compile(HBscript);
export function showNotes() {
    document.getElementById("todolist").innerHTML = todoTemplateCompiled(
        {note: noteService.notes,darkmode},
        {allowProtoPropertiesByDefault: true}
    )
    if (darkmode) {
        arrowDarkMode()
    }
    notesEventHandlers()
    ChangeDate()
}
function ChangeDate(){

    const days=document.querySelectorAll(".duedate")
    const sevenDays=604800000
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today=new Date()
    
    days.forEach(element => {
        const newdate= new Date(element.innerHTML)
        const daysUntilDue=newdate.getTime()-today.getTime()
        if(daysUntilDue<=sevenDays){
            element.innerHTML=dayNames[newdate.getDay()]
        }
    });

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

export class NoteController {
    constructor() {
        this.sortingButtons=document.querySelectorAll(".sortinghat")
        this.tognew=document.querySelectorAll(".tognew")
        this.loggedin=document.getElementById("loggedin")
    }

    initEventHandlers() {
        this.sortingButtons.forEach(hat => {
            hat.addEventListener("click",function(){
                sortItBy(this.getAttribute("data-sortby"),this.getAttribute("data-sortway"))
                showNotes()
            })
        });
        this.tognew.forEach(element => {
            element.addEventListener("click",toggleFormMode)
        });
        document.getElementById("sortimportance").addEventListener("change",function(){
            sortItBy(this.getAttribute("data-sortby"),(this.value))
            showNotes()
        })
        document.getElementById("sortcompleted").addEventListener("click",FilterCompleted)
        
        
        document.getElementById("saveedit").addEventListener("click",()=>{
            saveEdit()
            ToggleEditMode()
        })
        document.getElementById("deleteedit").addEventListener("click",()=>{
            deleteEdit()
            ToggleEditMode()
            document.getElementById("todoform").reset();
        })
        document.getElementById("create").addEventListener("click",(event)=>{
            CreateNewTodo()
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

    initialize () {
        if (this.loggedin.innerHTML==="true") {
            noteService.loadData();
        }
    }
}

export const noteController = new NoteController();
noteController.initialize()