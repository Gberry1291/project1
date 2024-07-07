import {showNotes,initialize} from './note-controller.js';
import {customAlert} from './click-event-controller.js';
import LoginService from '../services/login-service.js';

async function login(){

    const username=document.getElementById("usernameinput").value
    const password=document.getElementById("passwordinput").value
    const userinfo={username,password}

    const success = await LoginService.loginUser(userinfo)
    if (success.logged==="true") {
        document.getElementById("loggedin").innerHTML="true"
        showNotes(initialize)
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