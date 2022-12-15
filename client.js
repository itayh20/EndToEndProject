// choose templates from html, display them, get info from inputs and send with Fajax to server

const logIn = document.getElementById("logIn");
const signUp = document.getElementById("signUp");
const app = document.getElementById("app");
const main = document.getElementById("main");

document.addEventListener('DOMContentLoaded', movePage('logIn'));

var signHere = document.getElementById("signHere");
signHere.addEventListener('click', () => {
    deletePage(window.location.hash.substring(1));
    movePage('signUp');
    addSendEvent();
});

addSubmitButton();

// let hash = window.location.hash.substring(1);
// window.addEventListener('popstate',poppin);


// function poppin(){
//     deletePage(location.hash.substring(1));
//     let newhash = location.hash.substring(1);
//     // hash = window.location.hash;
//     movePage(newhash);
// }

logIn.addEventListener("click", () => {
    deletePage(window.location.hash.substring(1));
    movePage('logIn');
    addSubmitButton();

});

signUp.addEventListener("click", () => {
    deletePage(window.location.hash.substring(1));
    movePage('signUp');
    addSendEvent();
});

app.addEventListener("click", () => {
    deletePage(window.location.hash.substring(1));
    movePage('app');
});


function movePage(page, user = 0) {
    if (page === 'app') {
        var temp = document.getElementsByTagName("template")[2];
        var clon = temp.content.cloneNode(true);
        main.appendChild(clon);
        addEventButton();
        buttonsForAppPage();
    }
    else if (page === 'signUp') {
        var temp = document.getElementsByTagName("template")[1];
        var clon = temp.content.cloneNode(true);
        main.appendChild(clon);
    }
    else {
        var temp = document.getElementsByTagName("template")[0];
        var clon = temp.content.cloneNode(true);
        main.appendChild(clon);
        addSubmitButton();
    }
}

function deletePage(page) {
    if (page === 'app') {
        main.removeChild(main.getElementsByTagName('div')[0]);
    }
    else if (page === 'signUp') {
        main.removeChild(main.getElementsByTagName('div')[0]);
    }
    else {
        main.removeChild(main.getElementsByTagName('div')[0]);
    }
}

// function addSendEvent() {
//     const send = document.getElementById('send');
//     send.addEventListener('click', () => {
//         const xml = new Fajax();
//         xml.onload = function () {
//             server.post();
//         }
//         xml.open('POST', 'users');
//         xml.send();
//     })
// }

function addSendEvent() {
    const send = document.getElementById('send');
    send.addEventListener('click', addUser);
}


function addSubmitButton() {
    const submit = document.getElementById('submit');
    // submit.addEventListener('click', server.checkIfCanLogIn);
    submit.addEventListener('click', checkIfCanLogIn);

}

counter = 0;
class User {
    constructor(userName, passWord) {
        this.userName = userName;
        this.passWord = passWord;
        this.events = [];
        this.id = function () {
            counter++;
            return counter;
        }();
    }
}

function addEventButton() {
    const btnAddEvent = document.getElementById("btnAddEvent");
    btnAddEvent.addEventListener("click", () => {
        const xml = new Fajax();
        xml.onload = function () {
            server.post();
        }
        xml.open('POST', 'events');
        xml.send();
    });
}
let promt;
function addButtonsForAddingEvents() {
    promt = prompt('Enter the event: ')
    let listPart = document.createElement("li");
    listPart.textContent = promt;

    let eventList = document.getElementById("eventList");
    let buttonForReg = document.createElement("button");
    buttonForReg.setAttribute("class", "hidden");
    buttonForReg.textContent = 'register to event '
    listPart.appendChild(buttonForReg);
    eventList.appendChild(listPart);
    listPart.addEventListener("click", showButton);
}


function showButton(event) {
    if (event.target.children[0]?.classList.length > 0) {
        event.target.children[0].removeAttribute('class');
    } else {
        event.target.children[0]?.classList.add('hidden');
    }

    event.target.children[0]?.addEventListener('click',  () => {
        const xml = new Fajax();
        xml.onload = function () {
            server.post("events", "addEvent");
        }
        xml.open('POST');
        xml.send();
    })
}
function showEvenListOnScreen() {
    // const myDiv = document.getElementById('events');
    const paragraf = document.getElementById('myEvenP');
    paragraf.innerHTML = DB.events;
}


var username;
function addUser() {
    const xml = new Fajax();
    xml.onload = function () {
        username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        DB.users.push(new User(username, password));
        localStorage.setItem("usersArr", JSON.stringify(DB.users));
        movePage('logIn');
        deletePage(window.location.hash.substring(1));
    }
    xml.open('POST', 'users');
    xml.send();
}

function addEventToUser() {
    const xml = new Fajax();
    var specificID;
    xml.onload = function () {
        for (let i = 0; i < DB.users.length; i++) {
            if (DB.users[i].userName === username) {
                specificID = DB.users[i].id;
            }
        }
        console.log(DB.users[specificID - 1].events);
        DB.users[specificID - 1].events.push(promt);
    }
    xml.open('PUT', 'users');
    xml.send(specificID);
}


function buttonsForAppPage() {
    const changeUsersButton = document.getElementById('changeUserButton');
    changeUsersButton.addEventListener('click', changeUser);
    const deleteUserButton = document.getElementById('deleteUserButton');
    deleteUserButton.addEventListener('click', deleteUser);
    const deleteEventButton = document.getElementById('deleteEventButton');
    deleteEventButton.addEventListener('click',()=> deleteEvent);
}

function changeUser() {
    const xml = new Fajax();
    const change = prompt('What you want to change');
    const changeValue = prompt('change value');
    const idOfChange = prompt('id of change');
    xml.onload = function () {
        for (let i = 0; i < DB.users.length; i++) {
            if ((DB.users[i].id === this.id)) {
                if (change === "user name") {
                    DB.users[i].userName = changeValue;
                } else if (change === "password") {
                    DB.users[i].passWord = changeValue;
                }
            }
        }
    }
    xml.open('PUT', 'users');
    xml.send(Number(idOfChange));
}

function deleteUser() {
    const xml = new Fajax();
    const deleteUserId = prompt('ID of the delete user');
    xml.onload = function () {
        for (let i = 0; i < DB.users.length; i++) {
            if (DB.users[i].id === Number(deleteUserId)) {
                DB.users.splice(i, 1);
            }
        }
    }
    xml.open('DELETE', 'users');
    xml.send(Number(deleteUserId));
}

function deleteEvent() {
    const xml = new Fajax();
    const deleteEvent = prompt('ID of the delete event');
    xml.onload = function () {
        for (let i = 0; i < DB.events.length; i++) {
            if (DB.events[i] === deleteEvent) {
                DB.events.splice(i, 1);
            }
        }
    }
    xml.open('DELETE', 'events');
    xml.send();
}




function checkIfCanLogIn(){
    console.log('hi');
    const xml = new Fajax();
    xml.onload = function () {
        let bool = false;
        let num;
        const usernameCheck = document.getElementById('username').value;
        const passwordCheck = document.getElementById('password').value;
        for (let i = 0; i < DB.users.length; i++) {
            if (DB.users[i].userName === usernameCheck && DB.users[i].passWord === passwordCheck) {
                bool = true;
                num = i;
                break;
            }
        }
        if (bool) {
            deletePage(window.location.hash.substring(1));
            movePage('app', DB.users[num]);
        } else {
            alert('not')
        }
    }
    xml.open('POST', 'users');
    xml.send();
}

var m = new User('m', 'm');
var b = new User('b', 'b');
DB.users.push(m);
DB.users.push(b);