import {toggleFormMode,ToggleEditMode,ToggleOpenClosed,lightDarkMode,arrowDarkMode,customAlert,FilterCompleted} from '../services/click-events.js'

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
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const myInit = {
    method: 'POST',
    headers: myHeaders,
    cache: 'default',
    body: JSON.stringify(theid)
    };
    const myRequest = new Request('/findone', myInit);
    const response = await fetch(myRequest);
    const movies = await response.json();

    // eslint-disable-next-line no-underscore-dangle
    document.getElementById("id").value=movies[0]._id
    document.getElementById("formtitle").value=movies[0].title
    document.getElementById("formimportance").value=movies[0].importance.length
    document.getElementById("formduedate").value=movies[0].due
    if(movies[0].finished){
        document.getElementById("formfinished").checked=true
    }else{
        document.getElementById("formfinished").checked=false;
    }
    document.getElementById("formdescription").value=movies[0].description

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
async function MakeRequest(path,body,callback){
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const myInit = {
    method: 'POST',
    headers: myHeaders,
    cache: 'default',
    body: JSON.stringify(body)
    };
    const myRequest = new Request(path, myInit);
    const response = await fetch(myRequest);
    const movies = await response.json();
    callback(movies)
}
const HBscript='{{#each note}}<div class="todoitem"><div class="todocontainer" ><p class="duedate">{{due}}</p><div>{{#if finished}}<input class="checkbox" name="checkbox" type="checkbox" checked><span class="checkboxlabel">Closed</span>{{else}}<input class="checkbox" name="checkbox" type="checkbox"><span class="checkboxlabel">Open</span>{{/if}}</div></div><div class="todocontainer" ><p>{{title}}</p><p>{{description}}</p></div><div class="flexright" ><div class="flexright">{{#each importance}}<div class="arrow"></div>{{/each}}</div><div class="button edit" data-id="{{_id}}">Edit</div></div></div>{{/each}}'
/* global Handlebars */
const todoTemplateCompiled=Handlebars.compile(HBscript);
export function showNotes(NoteList) {
    document.getElementById("todolist").innerHTML = todoTemplateCompiled(
        {note: NoteList,darkmode},
        {allowProtoPropertiesByDefault: true}
    )
    if (darkmode) {
        arrowDarkMode()
    }
    notesEventHandlers()
    ChangeDate()
}
function CreateNewTodo(){
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
        const thebody={title:formtitle.value,due:formduedate.value,created:formcreated,importance:importancelist,description:formdescription,finished:formfinished,importanceInt:formimportance.value}

        customAlert("passed","Todo added Succesfully")
        document.getElementById("todoform").reset();
        MakeRequest("/newnote",thebody,showNotes)
    }

}
function saveEdit(){
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
    const thebody={id:formid,title:formtitle,due:formduedate,importance:newimportance,description:formdescription,finished:formfinished,importanceInt:formimportance}
    return thebody
}
export class NoteController {
    constructor() {
        this.tognew=document.querySelectorAll(".tognew")
        this.loggedin=document.getElementById("loggedin")
        this.sorttitle=document.getElementById("sorttitle")
        this.sortdue=document.getElementById("sortdue")
        this.sortcreated=document.getElementById("sortcreated")
    }

    initEventHandlers() {
        this.sorttitle.addEventListener("click",()=>{
            MakeRequest('/sortnote',{"title":1},showNotes)
        })
        this.sortdue.addEventListener("click",()=>{
            MakeRequest('/sortnote',{"due":1},showNotes)
        })
        this.sortcreated.addEventListener("click",()=>{
            MakeRequest('/sortnote',{"created":1},showNotes)
        })
        document.getElementById("sortimportance").addEventListener("change",()=>{
            const SortImportance=document.getElementById("sortimportance")
            const HighLow=Number(SortImportance.value)
            MakeRequest('/sortnote',{"importanceInt":HighLow},showNotes)
        })
        document.getElementById("sortcompleted").addEventListener("click",FilterCompleted)
        
        this.tognew.forEach(element => {
            element.addEventListener("click",toggleFormMode)
        });        
        
        document.getElementById("saveedit").addEventListener("click",()=>{
            const thebody=saveEdit()
            MakeRequest('/editnote',thebody,showNotes)
            ToggleEditMode()
        })
        document.getElementById("deleteedit").addEventListener("click",()=>{
            const formid=document.getElementById("id").value
            const thebody={id:formid}
            MakeRequest('/deletenote',thebody,showNotes)
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
            MakeRequest("/loadnote",{"pass":"blank"},showNotes)
            this.initEventHandlers();
        }
    }
}

export const noteController = new NoteController();
noteController.initialize()