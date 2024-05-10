let checkboxes=document.getElementsByClassName("checkbox")
let checkBoxLabels=document.getElementsByClassName("checkboxlabel")
let container=document.getElementsByClassName("container")
for (let i = 0; i < checkboxes.length; i++) {
    let j=i
    checkboxes[i].addEventListener("click",function(){
        checkBoxFunc(j)
    })
}
function checkBoxFunc(index){
    if (checkboxes[index].checked) {
        checkBoxLabels[index].innerHTML="Closed"
    }else{
        checkBoxLabels[index].innerHTML="Open"
    }
}

const tognew=document.getElementsByClassName("tognew")
for (let i = 0; i < tognew.length; i++) {
    tognew[i].addEventListener("click",toggleNew)
}


let showTog=0
let valueMap={0:"none",1:"flex"}
function toggleNew(){
    for (let i = 0; i < container.length; i++) {
        container[i].style.display=valueMap[showTog]
    }
    document.getElementById("todolist").style.display=valueMap[showTog]
    document.getElementById("todoform").style.display=valueMap[Math.abs(showTog-1)]
    showTog=Math.abs(showTog-1)
}

let styleTog=0
let styleMap={0:"black",1:"white"}
document.getElementById("togstyle").addEventListener("click",function(){
    let arrows=document.getElementsByClassName("arrow")
    let todoitem=document.getElementsByClassName("todoitem")

    document.body.style.color=styleMap[Math.abs(styleTog-1)]
    document.body.style.backgroundColor=styleMap[styleTog]

    for (let i = 0; i < arrows.length; i++) {
        arrows[i].style.backgroundColor=styleMap[Math.abs(styleTog-1)]
    }
    for (let i = 0; i < todoitem.length; i++) {
        todoitem[i].style.borderBottom="1px solid "+styleMap[Math.abs(styleTog-1)]
    }

    styleTog=Math.abs(styleTog-1)
})

//adding sorting click events
document.getElementById("sortname").addEventListener("click",function(){
    sortItBy("hiddentitle","normal")
})
document.getElementById("sortduedate").addEventListener("click",function(){
    sortItBy("hiddendue","normal")
})
document.getElementById("sortcreationdate").addEventListener("click",function(){
    sortItBy("hiddencreated","normal")
})
document.getElementById("sortimportance").addEventListener("change",function(){
    if (this.value=="low") {
        sortItBy("hiddenimportance","normal")
    }
    if (this.value=="high") {
        sortItBy("hiddenimportance","reverse")
    }
})
document.getElementById("sortcompleted").addEventListener("click",FilterCompleted)
//end adding sorting click events


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

let completedTog=0
let completedMap={0:["black","none"],1:["#3571F2","flex"]}
function FilterCompleted(){
    let todoitems=document.getElementsByClassName("todoitem")
    for (let i = 0; i < todoitems.length; i++) {
        if (!todoitems[i].children[1].children[1].children[0].checked) {
            todoitems[i].style.display=completedMap[completedTog][1]
        } 
    }
    document.getElementById("sortcompleted").style.backgroundColor=completedMap[completedTog][0]
    completedTog=Math.abs(completedTog-1)
}



function logFormData(){
    let datevalue=document.getElementById("formduedate").value
    console.log(datevalue)
}
document.getElementById("create").addEventListener("click",logFormData)