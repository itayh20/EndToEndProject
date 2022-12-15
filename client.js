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

function addSendEvent() {
    const send = document.getElementById('send');
    send.addEventListener('click', () => {
        const xml = new Fajax();
        xml.onload = function () {
            server.post();
        }
        xml.open('POST', 'users');
        xml.send(1);
    })
}

function addSubmitButton() {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', server.checkIfCanLogIn);
}

counter = 0;
class User {
    constructor(userName, passWord) {
        this.userName = userName;
        this.passWord = passWord;
        this.events = [];
        this.id = function(){
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

function showButton(event) {
    if (event.target.children[0]?.classList.length > 0) {
        event.target.children[0].removeAttribute('class');
    } else {
        event.target.children[0]?.classList.add('hidden');
    }

    event.target.children[0]?.addEventListener('click', function () {
        const ul = document.getElementById('events');
        const li = document.createElement('li');

        li.textContent = promt;
        ul.appendChild(li);
    })
}

l = new User('b', 'b');
console.log(l);

m = new User('m', 'm');
console.log(m);