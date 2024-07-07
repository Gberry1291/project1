import NoteService from '../services/note-service.js'

export function lightDarkMode(){
    document.body.classList.toggle("darkmode");
    const arrows=document.querySelectorAll(".arrow")
    arrows.forEach(arrow => {
        arrow.classList.toggle("darkmode")
    });
    const todoitems=document.querySelectorAll(".todoitem")
    todoitems.forEach(item => {
        item.classList.toggle("darkmode")
    });
}

export function toggleFormMode(){
    const container = document.querySelectorAll(".container")
    container.forEach(element => {
        element.classList.toggle("hide")
    });

    document.getElementById("todolist").classList.toggle("hide")
    document.getElementById("todoform").classList.toggle("hide")
}
export function toggleEditMode(){
    const editbutts=document.querySelectorAll(".leftbutton")
    editbutts.forEach(butt => {
        butt.classList.toggle("hide")
    });
}

export function toggleOpenClosed(){
    if (this.checked) {
        this.nextElementSibling.innerHTML = "Closed"
    }else{
        this.nextElementSibling.innerHTML = "Open"
    }
    const thebody={"id":this.getAttribute("data-id"),"finished":this.checked}
    NoteService.editChecked(thebody)
}

export function customAlert(status,text){
    const alertDiv=document.getElementById("customalert")
    document.getElementById("alerthouse").className =`customtext${status}`;
    document.getElementById("alertmark").className=`checkmark${status}`;
    document.getElementById("alerttext").innerHTML=text
    alertDiv.style.display="block"
    alertDiv.style.opacity="1"
    alertDiv.addEventListener("mousemove", ()=>{

        for (let i = 95; i >= 0; i-=5) {
            setTimeout(()=>{
                if(i===5){
                    alertDiv.style.opacity=".05"
                }else{
                    alertDiv.style.opacity=`.${i}`
                }
                if (i<=0) {
                    alertDiv.style.display="none"
                }
            },(1000-(i*10)))
        }
    
    }, {once : true});
}

export function filterCompleted(){
    const checkboxes=document.querySelectorAll(".checkbox")
    checkboxes.forEach(box => {
        if(!box.checked){
            box.closest(".todoitem").classList.toggle("hide")
        }
    });
}
export function highLightButton(id){
    const butts=document.querySelectorAll(".sorter")
    butts.forEach(element => {
        element.classList.remove("buttonselect");
    });
    document.getElementById("sortimportanceInt").classList.remove("buttonselect")
    document.getElementById(`sort${id}`).classList.toggle("buttonselect");
}
