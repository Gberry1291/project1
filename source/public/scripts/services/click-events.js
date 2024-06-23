export function lightDarkMode(){
    document.body.classList.toggle("darkmode");
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
export function toggleFormMode(){
    const container = document.querySelectorAll(".container")
    container.forEach(element => {
        element.classList.toggle("hide")
    });

    document.getElementById("todolist").classList.toggle("hide")
    document.getElementById("todoform").classList.toggle("hide")
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