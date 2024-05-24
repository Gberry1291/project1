let checkboxes=document.querySelectorAll(".checkbox")
let container=document.querySelectorAll(".container")
let sortingButtons=document.querySelectorAll(".sortinghat")
const tognew=document.querySelectorAll(".tognew")
var darkmode=0


//add checbox label change to all checkboxes
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener("click",ToggleOpenClosed)

}
function ToggleOpenClosed(){
    console.log("fired")
    this.checked ? this.nextElementSibling.innerHTML="Closed":this.nextElementSibling.innerHTML="Open"
}

//add Events for all buttons that toggle form Mode
tognew.forEach(element => {
    element.addEventListener("click",toggleFormMode)
});
function toggleFormMode(){
    container.forEach(element => {
        element.classList.toggle("hide")
    });

    document.getElementById("todolist").classList.toggle("hide")
    document.getElementById("todoform").classList.toggle("hide")
}
//toggle dark Mode
document.getElementById("togstyle").addEventListener("click",lightDarkMode)
function lightDarkMode(){
    let arrows=document.querySelectorAll(".arrow")
    let todoitems=document.querySelectorAll(".todoitem")

    document.body.classList.toggle("darkmode");

    arrows.forEach(arrow => {
        arrow.classList.toggle("lightmode")
    });
    todoitems.forEach(item => {
        item.classList.toggle("darkmodeborder")
    });
    darkmode=Math.abs(darkmode-1)
}
//adding sorting click events
sortingButtons.forEach(hat => {
    hat.addEventListener("click",function(){
        sortItBy(this.getAttribute("data-sortby"),this.getAttribute("data-sortway"))
    })
});
document.getElementById("sortimportance").addEventListener("change",function(){
    if (this.value=="low") {
        sortItBy("hiddenimportance","normal")
    }
    if (this.value=="high") {
        sortItBy("hiddenimportance","reverse")
    }
})
document.getElementById("sortcompleted").addEventListener("click",FilterCompleted)
//sort functions
function sortItBy(theClass,highlow) {
    let i, switching, b, shouldSwitch;
    let list = document.getElementsByClassName(theClass)
    let sorttodolist=document.getElementsByClassName("todoitem")

    switching = true;
    while (switching) {
      switching = false;
      b = list
      for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;
        if (highlow=="normal") {
            if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
              }
        }else if(highlow=="reverse"){
            if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
              }
        }
      }
      if (shouldSwitch) {
        document.getElementById("todolist").insertBefore(sorttodolist[i + 1],sorttodolist[i]);
        switching = true;
      }
    }
}
function FilterCompleted(){
    document.getElementById("sortcompleted").classList.toggle("filtering")
    checkboxes.forEach(box => {
        !box.checked ? box.closest(".todoitem").classList.toggle("hide"):"mach ni"
    });
}
//functions for creating new todo
function ElementFactory(eltype,elclass,elinnerHTML){
    let newelement=document.createElement(eltype)
    newelement.classList.add(elclass)
    newelement.innerHTML=elinnerHTML
    return newelement
}
function appendToParent(eltype,elclass,childlist){
    let parent=ElementFactory(eltype,elclass,"")
    childlist.forEach(element => {
        parent.appendChild(element)
    });
    return parent
}
document.getElementById("create").addEventListener("click",CreateNewTodo)
function CreateNewTodo(){

    let formtitle=document.getElementById("formtitle").value
    let formimportance=document.getElementById("formimportance").value
    let formduedate=document.getElementById("formduedate").value
    let formfinished=document.getElementById("formfinished").checked
    let formdescription=document.getElementById("formdescription").value
    
    let newHiddenTitle=ElementFactory("div","hiddentitle",formtitle)
    let newHiddenDue=ElementFactory("div","hiddendue",formduedate)
    let newHiddenCreated=ElementFactory("div","hiddencreated",new Date().toISOString().slice(0, 10))
    let newHiddenImportance=ElementFactory("div","hiddenimportance",formimportance)

    let newSortingInfo=appendToParent("div","sortinginfo",[newHiddenTitle,newHiddenDue,newHiddenCreated,newHiddenImportance])
    newSortingInfo.hidden=true

    let newdue=ElementFactory("p","blank",formduedate)
    let newcheckbox=ElementFactory("input","checkbox","")
    newcheckbox.id="checkbox"
    newcheckbox.type="checkbox"
    newcheckbox.checked=formfinished
    newcheckbox.addEventListener("click",ToggleOpenClosed)
    let newlabel=ElementFactory("label","checkboxlabel","")
    newlabel.for="checkbox"
    formfinished ? newlabel.innerHTML="Closed" : newlabel.innerHTML="Open"
    let checkboxhouse=appendToParent("div","blank",[newcheckbox,newlabel])

    let leftdiv=appendToParent("div","vertcontainer",[checkboxhouse,newdue])

    let newtitle=ElementFactory("p","blank",formtitle)
    let newdescription=ElementFactory("p","blank",formdescription)
    let newmiddlediv=appendToParent("div","vertcontainer",[newtitle,newdescription])

    let arrowhouse=ElementFactory("div","flexright","")
    for (let i = 0; i < Number(formimportance); i++) {
        let newarrow=ElementFactory("div","arrow","")
        if (darkmode) {
            newarrow.classList.add("lightmode")
        }
        arrowhouse.appendChild(newarrow)
    }
    let newedit=ElementFactory("div","button","Edit")
    newedit.classList.add("edit")
    let newrightdiv=appendToParent("div","flexright",[arrowhouse,newedit])

    let newtodo=appendToParent("div","todoitem",[newSortingInfo,leftdiv,newmiddlediv,newrightdiv])

    if (darkmode) {
        newtodo.classList.add("darkmodeborder")
    }
    document.getElementById("todolist").appendChild(newtodo)

}

//functions for editing a todo
document.getElementById("saveedit").addEventListener("click",saveEdit)
var CurrentEdit="Todo item to work with"
function fillEditForm(){
    CurrentEdit=this.closest(".todoitem")

    document.getElementById("formtitle").value=CurrentEdit.children[0].children[0].innerHTML
    document.getElementById("formimportance").value=Number(CurrentEdit.children[0].children[3].innerHTML)
    document.getElementById("formduedate").value=CurrentEdit.children[0].children[1].innerHTML
    document.getElementById("formfinished").checked=CurrentEdit.children[1].children[1].children[0].checked
    document.getElementById("formdescription").value=CurrentEdit.children[2].children[1].innerHTML




}
function ToggleEditMode(){
    let editbutts=document.querySelectorAll(".leftbutton")
    editbutts.forEach(butt => {
        butt.classList.toggle("hide")
    });
}
let edits=document.querySelectorAll(".edit")
edits.forEach(editbut => {
    editbut.addEventListener("click",ToggleEditMode)
    editbut.addEventListener("click",toggleFormMode)
    editbut.addEventListener("click",fillEditForm)
});
function saveEdit(){
    let formtitle=document.getElementById("formtitle").value
    let formimportance=document.getElementById("formimportance").value
    let formduedate=document.getElementById("formduedate").value
    let formfinished=document.getElementById("formfinished").checked
    let formdescription=document.getElementById("formdescription").value

    CurrentEdit.children[0].children[0].innerHTML=formtitle
    CurrentEdit.children[2].children[0].innerHTML=formtitle

    CurrentEdit.children[0].children[3].innerHTML=formimportance
    CurrentEdit.children[3].children[0].innerHTML=""
    for (let i = 0; i < Number(formimportance); i++) {
        let newarrow=ElementFactory("div","arrow","")
        if (darkmode) {
            newarrow.classList.add("lightmode")
        }
        CurrentEdit.children[3].children[0].appendChild(newarrow)
    }

    CurrentEdit.children[0].children[1].innerHTML=formduedate
    CurrentEdit.children[1].children[0].innerHTML=formduedate

    CurrentEdit.children[1].children[1].children[0].checked=formfinished
    formfinished ? CurrentEdit.children[1].children[1].children[1].innerHTML="Closed" : CurrentEdit.children[1].children[1].children[1].innerHTML="Open"

    CurrentEdit.children[2].children[1].innerHTML=formdescription

    ToggleEditMode()
}

//change due date to day-of-week
function ChangeDate(){

    let days=document.querySelectorAll(".hiddendue")
    const sevenDays=604800000
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    days.forEach(element => {
        let newdate= new Date(element.innerHTML)
        let today=new Date()
        let daysUntilDue=newdate.getTime()-today.getTime()
        if(daysUntilDue<=sevenDays){
            element.closest(".todoitem").children[1].children[0].innerHTML=dayNames[newdate.getDay()]
        }
    });

}
