const logIn = document.getElementById("logIn");
const signUp = document.getElementById("signUp");
const game = document.getElementById("app");
const main = document.getElementById("main");

// var submit = document.getElementById("submit");
// submit.addEventListener('click', checkIfCanLogIn);

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
    var signHere = document.getElementById("signHere");
    signHere.addEventListener('click', () => {
        deletePage(window.location.hash.substring(1));
        movePage('signUp');
        addSendEvent();
    });
    // var submit = document.getElementById("submit");
    // submit.addEventListener('click', checkIfCanLogIn);
});

signUp.addEventListener("click", () => {
    deletePage(window.location.hash.substring(1));
    movePage('signUp');
    addSendEvent();
});

game.addEventListener("click", () => {
    deletePage(window.location.hash.substring(1));
    movePage('app');
});



function movePage(page) {
    if (page === 'app') {
        var temp = document.getElementsByTagName("template")[2];
        var clon = temp.content.cloneNode(true);
        main.appendChild(clon);
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
        addSubmitButton()
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

// var users = [];

// function addUserToStorage() {
//     let username = document.getElementById('username').value;
//     let password = document.getElementById('password').value;
//     users.push(new User(username, password));
//     localStorage.setItem("usersArr", JSON.stringify(users));
//     movePage('logIn');
//     deletePage(window.location.hash.substring(1));
// }

function addSendEvent() {
    const send = document.getElementById('send');
    // send.addEventListener('click', addUserToStorage);
    send.addEventListener('click', DB.addUserToStorage)
}

function addSubmitButton() {
    const submit = document.getElementById('submit');
    submit.addEventListener('click', checkIfCanLogIn);
    // submit.addEventListener('click', DB.addUserToStorage)
}


function checkIfCanLogIn() {
    const usernameCheck = document.getElementById('username').value;
    const passwordCheck = document.getElementById('password').value;
    users = JSON.parse(localStorage.getItem('usersArr'));
    for (let i = 0; i < users.length; i++) {
        console.log(users[i]);
        if (users[i].userName === usernameCheck && users[i].passWord === passwordCheck) {
            console.log('good');
            deletePage(window.location.hash.substring(1));
            movePage('app');
        }
        else {
            console.log('You are not allowed to enter');
        }
    }
}

class User {
    constructor(userName, passWord) {
        this.userName = userName
        this.passWord = passWord;
    }
}


