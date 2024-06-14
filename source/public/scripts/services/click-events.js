export function toggleFormMode(){
    const container = document.querySelectorAll(".container")
    container.forEach(element => {
        element.classList.toggle("hide")
    });

    document.getElementById("todolist").classList.toggle("hide")
    document.getElementById("todoform").classList.toggle("hide")
}

export function lightDarkMode(){
    const todoitems=document.querySelectorAll(".todoitem")

    document.body.classList.toggle("darkmode");

    todoitems.forEach(item => {
        item.classList.toggle("darkmodeborder")
    });

}
export function arrowDarkMode(){
    const arrows=document.querySelectorAll(".arrow")
    arrows.forEach(arrow => {
        arrow.classList.toggle("lightmode")
    });
    const todoitems=document.querySelectorAll(".todoitem")
    todoitems.forEach(item => {
        item.classList.toggle("darkmodeborder")
    });
}

export function ToggleEditMode(){
    const editbutts=document.querySelectorAll(".leftbutton")
    editbutts.forEach(butt => {
        butt.classList.toggle("hide")
    });
}

export function ToggleOpenClosed(){
    if (this.checked) {
        this.nextElementSibling.innerHTML = "Closed"
    }else{
        this.nextElementSibling.innerHTML = "Open"
    }
}