import {noteService} from '../services/note-service.js';
import {sortItBy,FilterCompleted} from '../services/sort-service.js';
import {ToggleEditMode,toggleFormMode,ToggleOpenClosed,lightDarkMode} from '../services/click-events.js'
import {CreateNewTodo,fillEditForm,saveEdit} from '../services/form-service.js'


export class NoteController {
    constructor() {
        this.todoTemplateCompiled = Handlebars.compile(document.getElementById('todo-template').innerHTML);
        this.todoContainer = document.getElementById("todolist")
        this.sortingButtons=document.querySelectorAll(".sortinghat")
        this.tognew=document.querySelectorAll(".tognew")
    }


    showNotes() {
        this.todoContainer.innerHTML = this.todoTemplateCompiled(
            {note: noteService.notes},
            {allowProtoPropertiesByDefault: true}
        )
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

        document.getElementById("togstyle").addEventListener("click",lightDarkMode)

        this.tognew.forEach(element => {
            element.addEventListener("click",toggleFormMode)
        });

        document.getElementById("sortcompleted").addEventListener("click",FilterCompleted)
        document.getElementById("saveedit").addEventListener("click",function(){
            saveEdit()
            ToggleEditMode()
            this.showNotes()
        })

        document.getElementById("create").addEventListener("click",()=>{
            CreateNewTodo()
            noteController.showNotes()
        })

            

        document.getElementById("sortimportance").addEventListener("change",function(){
            sortItBy(this.getAttribute("data-sortby"),(this.value))
            noteController.showNotes()
        })
    }

    initialize() {
        this.initEventHandlers();
        noteService.loadData();
        this.showNotes();
    }
}

// create one-and-only instance
export const noteController = new NoteController();
noteController.initialize()


