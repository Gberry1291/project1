import { noteController } from './note-controller.js';
import {customAlert} from '../services/click-events.js';

async function login(){

    const username=document.getElementById("usernameinput").value
    const password=document.getElementById("passwordinput").value
    const thebody={username,password}

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const myInit = {
    method: 'POST',
    headers: myHeaders,
    cache: 'default',
    body: JSON.stringify(thebody)
    };
    const myRequest = new Request('/login', myInit);
    const response = await fetch(myRequest);
    const movies = await response.json();
    if (movies.logged==="true") {
        document.getElementById("loggedin").innerHTML="true"
        noteController.initialize()
        document.getElementById("logcover").style.display="none"
    }else{
        customAlert("failed","That name is already in use and the wrong password was entered")
    }
}

document.getElementById("loginsub").addEventListener("click",(event)=>{
    login()
    event.preventDefault()
});

document.getElementById("logindemouser").addEventListener("click",(event)=>{
    document.getElementById("usernameinput").value="demouser"
    document.getElementById("passwordinput").value="demouser"
    login()
    event.preventDefault()
});