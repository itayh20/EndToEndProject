// function showContent() {
//     var temp = document.getElementsByTagName("template")[0];
//     var clon = temp.content.cloneNode(true);
//     document.body.appendChild(clon);
// }

const home = document.getElementById("logIn");
const signUp = document.getElementById("signUp");
const game = document.getElementById("app");
const main = document.getElementById("main");

// var submit = document.getElementById("submit");
// submit.addEventListener('click', checkIfCanLogIn);

document.addEventListener('DOMContentLoaded',movePage('logIn'));



const signHere = document.getElementById("signHere");
signHere.addEventListener('click', () => {
    deletePage(window.location.hash.substring(1));
    movePage('signUp');
    addSendEvent();
});


// let hash = window.location.hash.substring(1);
// window.addEventListener('popstate',poppin);


// function poppin(){
//     deletePage(location.hash.substring(1));
//     let newhash = location.hash.substring(1);
//     // hash = window.location.hash;
//     movePage(newhash);
// }

home.addEventListener("click", () => {
    deletePage(window.location.hash.substring(1));
    movePage('logIn');
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

const users = [];

function addUserToStorage() {
    console.log('hhhhi');
    let username = document.getElementById('username').value;
    console.log(username);
    let password = document.getElementById('password').value;
    console.log(password);
    users.push(new User(username, password));
    console.log(users);
    localStorage.setItem("usersArr", JSON.stringify(users));
    // movePage('logIn');
    // deletePage(window.location.hash.substring(1))
}

function addSendEvent() {
    console.log('hi');
    const send = document.getElementById('send');
    console.log(send);
    send.addEventListener('click',addUserToStorage);
}



function checkIfCanLogIn() {
    const usernameCheck = document.getElementById('username');
    const passwordCheck = document.getElementById('password');

    if (users.includes(usernameCheck.value)) {
    }
}

class User {
    constructor(userName, passWord) {
        this.userName = userName
        this.passWord = passWord;
    }
}


