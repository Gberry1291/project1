import {noteService} from '../services/note-service.js';
import {sortItBy,FilterCompleted} from '../services/sort-service.js';
import {ToggleEditMode,toggleFormMode,ToggleOpenClosed,lightDarkMode,arrowDarkMode} from '../services/click-events.js'
import {CreateNewTodo,fillEditForm,saveEdit} from '../services/form-service.js'

const elscripto='{{#each note}}<div class="todoitem"><div class="todocontainer" ><p class="duedate">{{due}}</p><div>{{#if finished}}<input class="checkbox" name="checkbox" type="checkbox" checked><span class="checkboxlabel">Closed</span>{{else}}<input class="checkbox" name="checkbox" type="checkbox"><span class="checkboxlabel">Open</span>{{/if}}</div></div><div class="todocontainer" ><p>{{title}}</p><p>{{description}}</p></div><div class="flexright" ><div class="flexright">{{#each importance}}<div class="arrow"></div>{{/each}}</div><div class="button edit" data-id="{{id}}">Edit</div></div></div>{{/each}}'
export class NoteController {
    constructor() {
        this.todoTemplateCompiled = Handlebars.compile(elscripto);
        this.todoContainer = document.getElementById("todolist")
        this.sortingButtons=document.querySelectorAll(".sortinghat")
        this.tognew=document.querySelectorAll(".tognew")
        this.darkmode=false
    }


    showNotes() {
        this.todoContainer.innerHTML = this.todoTemplateCompiled(
            {note: noteService.notes,darkmode: this.darkmode},
            {allowProtoPropertiesByDefault: true}
        )
        if (this.darkmode) {
            arrowDarkMode()
        }
        this.notesEventHandlers()
        this.ChangeDate()
    }

    notesEventHandlers(){
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

    sortIt(){
        sortItBy(this.getAttribute("data-sortby"),this.getAttribute("data-sortway"))
        noteController.showNotes()
    }

    ChangeDate(){

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

    initEventHandlers() {
        this.sortingButtons.forEach(hat => {
            hat.addEventListener("click",noteController.sortIt)
        });

        document.getElementById("togstyle").addEventListener("click",()=>{
            lightDarkMode()
            arrowDarkMode()
            this.darkmode=true;
        })

        this.tognew.forEach(element => {
            element.addEventListener("click",toggleFormMode)
        });

        document.getElementById("sortcompleted").addEventListener("click",FilterCompleted)
        document.getElementById("saveedit").addEventListener("click",()=>{
            saveEdit()
            ToggleEditMode()
            noteController.showNotes()
        })

        document.getElementById("create").addEventListener("click",(event)=>{
            CreateNewTodo()
            noteController.showNotes()
            event.preventDefault()
          });
        document.getElementById("createoverview").addEventListener("click",(event)=>{
            CreateNewTodo()
            noteController.showNotes()
            event.preventDefault()
          })

        document.getElementById("sortimportance").addEventListener("change",function(){
            sortItBy(this.getAttribute("data-sortby"),(this.value))
            noteController.showNotes()
        })
    }

    initialize () {
        this.initEventHandlers();
        noteService.loadData();
        // this.showNotes();
    }
}

// create one-and-only instance
export const noteController = new NoteController();
noteController.initialize()


