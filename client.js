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
        xml.send('addButton');
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
    buttonForReg.textContent = 'register to event ';
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
    event.target.children[0]?.addEventListener('click', () => {
        addEventToUser();
        const xml = new Fajax();
        xml.onload = function () {
            server.post();
        }
        xml.open('POST', "events");
        xml.send("addEvent");
    });
}


function showEvenListOnScreen() {
    console.log('hi');
    var paragraf = document.getElementById('myEvenP');
    const xml = new Fajax();
    xml.onload = function () {
        var events = xml.response;
        paragraf.innerHTML = events;
    }
    xml.open('POST', "events");
    xml.send();
}


var username;
function addUser() {
    const xml = new Fajax();
    xml.onload = function () {
        var users = xml.response;
        username = document.getElementById('username').value;
        let password = document.getElementById('password').value;
        users.push(new User(username, password));
        localStorage.setItem("usersArr", JSON.stringify(users));
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
        var users = xml.response;
        console.log(users);
        for (let i = 0; i < users.length; i++) {
            if (users[i].userName === username) {
                specificID = users[i].id;
            }
        }
        console.log(users);
        users[specificID - 1].events.push(promt);
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
    deleteEventButton.addEventListener('click', deleteEventForUser);
}

function changeUser() {
    console.log('moooooooooooooooo');
    const xml = new Fajax();
    const change = prompt('What you want to change');
    const changeValue = prompt('change value');
    const idOfChange = prompt('id of change');
    xml.onload = function () {
        var users = xml.response;
        for (let i = 0; i < users.length; i++) {
            if ((users[i].id === this.id)) {
                if (change === "user name") {
                    users[i].userName = changeValue;
                } else if (change === "password") {
                    users[i].passWord = changeValue;
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

function deleteEventForUser() {
    const xml = new Fajax();
    const userID = prompt('ID of the user');
    const event = prompt('Event to delete');
    xml.onload = function () {
        for (let i = 0; i < DB.users.length; i++) {
            if (DB.users[i].id === Number(userID)) {
                var para = document.getElementById('myEvenP');
                var index = DB.users[i].events.indexOf(event);
                DB.users[i].events.splice(index, 1);
                console.log(para);
                para.textContent = '';
                para.textContent += DB.users[i].events + ','
            }
        }
    }
    xml.open('DELETE', 'events');
    xml.send(Number(userID));
}




function checkIfCanLogIn() {
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