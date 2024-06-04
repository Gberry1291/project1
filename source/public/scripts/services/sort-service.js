import {noteService} from "./note-service.js"

export function sortItBy(index,highlow) {

    noteService.notes.sort((a, b)=>{
        
        if(highlow==="1"){
            if(a[index]>b[index]){
                return 1
            }
            return -1
        }
        if(a[index]<b[index]){
            return 1
        }
        return -1
    });

}

export function FilterCompleted(){
    const checkboxes=document.querySelectorAll(".checkbox")
    document.getElementById("sortcompleted").classList.toggle("filtering")
    checkboxes.forEach(box => {
        if(!box.checked){
            box.closest(".todoitem").classList.toggle("hide")
        }
    });
}